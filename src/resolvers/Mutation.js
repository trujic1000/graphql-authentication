const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(root, { name, email, password }, { prisma }) {
  // Hash password
  const hash = await bcrypt.hash(password, 10);
  // Create user
  const user = await prisma.createUser({ name, email, password: hash });
  // Create token
  const token = jwt.sign(
    { userId: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET
  );
  return {
    token,
    user
  };
}

async function login(root, { email, password }, { prisma }) {
  // Check if user exists
  let user = await prisma.users({ where: { email } });
  user = user[0];
  if (!user) {
    throw new Error("Authentication failed.");
  }
  // Check if password is correct
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Authentication failed.");
  }
  // Create token
  const token = jwt.sign(
    { userId: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET
  );
  return {
    token,
    user
  };
}

async function deleteUser(root, { id }, { prisma }) {
  return await prisma.deleteUser({ id });
}

module.exports = {
  signup,
  login,
  deleteUser
};
