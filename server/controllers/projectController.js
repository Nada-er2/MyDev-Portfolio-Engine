const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");
exports.getProjects = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const where = {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };

    const total = await prisma.project.count({
      where,
    });

    const projects =
      await prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json({
      data: projects,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching projects",
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const technologies = JSON.parse(
      req.body.technologies
    );

    const project = await prisma.project.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        githubUrl: req.body.githubUrl,
        imagePath,
        technologies,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating project",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {
      title: req.body.title,
      description: req.body.description,
      githubUrl: req.body.githubUrl,
      technologies: JSON.parse(
        req.body.technologies
      ),
    };

    if (req.file) {
      data.imagePath = `/uploads/${req.file.filename}`;
    }

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating project",
    });
  }
};



exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.imagePath) {
      const imagePath = path.join(
        __dirname,
        "..",
        project.imagePath
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.project.delete({
      where: { id },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting project",
    });
  }
};