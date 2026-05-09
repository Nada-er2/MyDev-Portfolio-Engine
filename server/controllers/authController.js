const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) return res.status(401).json("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json("Wrong password");

  const token = jwt.sign({ id: user.id }, "SECRET");

  res.json({ token, user });
};