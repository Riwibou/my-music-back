const { User } = require("../databases/user.database");
const { jwtSign } = require("../middlewares/jwt.mdlwr");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
// installer joi, securiser les entree des user dans les form, appeler joi, verifier copilot avis

exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = signUpSchema.validate({ name, email, password });
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  if (!email || !isEmail(email)) {
    return res.status(400).send({ error: "Email is required or invalid" });
  }

  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({
        error: "Password is required and should be at least 6 characters long",
      });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .send({ error: "An account with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  try {
    const savedUser = await user.save();
    const token = jwtSign(savedUser._id);

    return res.status(201).json({
      message: `Inscription réussie`,
      user: { userId: savedUser._id, name, email, token, role: savedUser.role },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
