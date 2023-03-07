const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.users;

const addUser = async (req, res) => {
  let data = req.body;
  User.create(data)
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
};

const getAllUsers = async (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: db.products,
        as: "product",
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  User.update(req.body, { where: { user_id: id } })
    .then(() => {
      User.findOne({ where: { id: id } }).then((data) => {
        res.status(200).send(data);
      });
    })
    .catch((err) => {
      res.send({ message: err });
    });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { user_id: id } })
    .then(() => {
      res.send("User deleted successfully");
    })
    .catch((err) => {
      res.send("Deletion failed due to..." + err);
    });
};

const checkUserCredentials = async (req, res) => {
  console.log("Body :", req.body);
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    console.log("User found: ", user);
    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        const jwtToken = jwt.sign(
          { id: user.user_id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.send({ message: "Login successfully", token: jwtToken });
      } else {
        res.send("Passwords don't match");
      }
    } else {
      res.send("User with this email not found");
    }
  } catch (error) {
    res.send(error);
  }
};

const findUserById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    if (user) {
      res.send(user);
    } else res.send({ error: "Something went wrong" });
  } catch (error) {
    res.send({ error });
  }

  res.send(user);
};

module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  checkUserCredentials,
  findUserById,
};
