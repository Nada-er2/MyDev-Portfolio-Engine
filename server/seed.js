const prisma = require("./config/prisma");
const bcrypt = require("bcrypt");

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      email: "admin@test.com",
      password: hashedPassword
    }
  });

  console.log("Admin created");
}

main();