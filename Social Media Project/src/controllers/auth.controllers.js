const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  const { username, password } = req.body;

  const IsUserAlreadyExists = await userModel.findOne({ username });

  if (IsUserAlreadyExists) {
    return res.status(400).json({
      message: "Username already exists",
    });
  }

  const newUser = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie('token', token)

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: newUser.username,
      password: newUser.password,
    },
  });
}

async function loginController(req, res) {
    const {username, password} = req.body;

    const user = await userModel.findOne({username})

    if (!user) {
        return res.status(400).json({
            message: "Invalid username"
        });
    }

    const IsPasswordValid = await bcrypt.compare(password, user.password);

    if(!IsPasswordValid) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    )

    res.cookie('token', token)

    res.status(200).json({
        message: "User Logged in successfully",
        user: {
            username: user.username,
            password: user.password,
        },
    })
}

module.exports = {
  registerController,
  loginController,
}