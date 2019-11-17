async function user(root, { id }, { prisma }) {
  return await prisma.user({ id });
}

async function users(root, args, { prisma }) {
  return await prisma.users();
}

module.exports = {
  users,
  user
};
