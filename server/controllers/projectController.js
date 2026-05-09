const prisma = require("../config/prisma");

exports.getProjects = async (req, res) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const project = await prisma.project.create({
    data: req.body
  });
  res.status(201).json(project);
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;

  const project = await prisma.project.update({
    where: { id },
    data: req.body
  });

  res.json(project);
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  await prisma.project.delete({
    where: { id }
  });

  res.sendStatus(204);
};