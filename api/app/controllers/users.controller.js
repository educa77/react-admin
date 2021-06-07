/* eslint-disable no-throw-literal */
const db = require("../models");
const User = db.users;
const Role = db.roles;
const Role_user = db.role_user;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email && !req.body.password) {
    console.log("entro aca???");
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  // Save Tutorial in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, Users, totalPages, currentPage };
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  if (Object.keys(req.query).length === 0) {
    User.findAndCountAll({
      include: [{ model: Role, as: "roles" }],
      where: condition,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Users.",
        });
      });
  } else {
    const { limit, offset } = getPagination(page, size);
    User.findAndCountAll({
      include: [{ model: Role, as: "roles" }],
      where: condition,
      limit,
      offset,
    })
      .then((data) => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Users.",
        });
      });
  }
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

const getUserById = async (id) => {
  const user = await User.findOne({
    include: [{ model: Role, as: "roles" }],
    where: { id },
  });

  if (!user) {
    throw {
      name: "ApiFindError",
      type: "Users Error",
      error: {
        message: `the user with the id ${id} does not exist in the database`,
        type: "data not found",
        code: 404,
      },
    };
  }
  console.log(user, "user de getuserbyid");
  return user;
};

exports.update = async (req, res) => {
  console.log("entro a update?????");
  const id = req.params.id;
  const { email, password, role_id } = req.body.body;
  const userdb = await User.findOne({
    where: { id },
  });
  const sendUser = await userdb.update({
    email,
    password,
  });
  const dbRole = await Role.findOne({ where: { id: role_id } });
  await sendUser.addRole(dbRole);
  const devuelto = await getUserById(sendUser.id);
  return res.status(201).json(devuelto);
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id, "id del controller");
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    });
};

// Find all published Tutorials
exports.findAllFirstLevel = (req, res) => {
  User.findAll({ where: { User_id: null } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};
