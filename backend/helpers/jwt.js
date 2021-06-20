import expressJwt from "express-jwt";

function authJWT() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

// prevent non admin users to add data(post product, category)
async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true); // reject the token if not authoriezed non admin
  }
  done(); // authorized only for admin
}

export default authJWT;
