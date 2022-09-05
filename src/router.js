const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign({ username }, "secretmessage");
    return res.json(token);
  } else {
    return res.json({ error: "Invalid username or password." });
  }
});

router.get("/profile", (req, res) => {
  const token = req.get("Authorization");
  try {
    jwt.verify(token, "secretmessage");
    res.json(mockUser.profile);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
