const jwt = require("jsonwebtoken");

function authenticate({ request }) {
  const Authorization = request.get("Authorization");
  if (Authorization) {
    // Get token
    const token = Authorization.replace("Bearer ", "");
    const { userId, name, email } = jwt.verify(token, process.env.JWT_SECRET);
    return {
      userId,
      name,
      email
    };
  }
  throw new Error("Not authenticated!");
}

module.exports = {
  authenticate
};
