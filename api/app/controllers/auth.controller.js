require("dotenv").config();
const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage;
const moment = require("moment");
const bcrypt = require("bcrypt");

moment.locale("es");

const codeStorage = new LocalStorage("./localstorage/codeStorage");

const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (email && password) {
    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      if (await user.matchPassword(password)) {
        try {
          let codeLocal = await codeStorage.getItem(user.id + "");
          if (codeLocal) codeLocal = JSON.parse(codeLocal);
          if (codeLocal && codeLocal.password_reset) {
            codeLocal.password_reset.expired = true;
            await codeStorage.setItem(user.id + "", JSON.stringify(codeLocal));
          }
          const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 60 * 60 * 24,
          });
          return res.send({
            user,
            token,
          });
        } catch (error) {
          return res.send(error).status(500);
        }
      }
      return res
        .send({
          error: {
            status: 401,
            message: "Las credenciales no corresponden a nuestros registros.",
          },
        })
        .status(401);
    }

    return res.sendStatus(404);
  }
  return res.sendStatus(422);
};

const logout = async (req, res) => {
  try {
    await req.session.destroy();
    return res.sendStatus(204);
  } catch (error) {
    return res.send(error).status(500);
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const user = {
      email,
      password: bcryptPassword,
    };
    console.log(user, "user");
    User.create(user).then((data) => {
      res.send(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  login,
  logout,
  register,
};
