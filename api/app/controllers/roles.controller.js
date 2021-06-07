const db = require("../models");
const Role = db.roles;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log("entro a create?");
  // Validate request
  if (!req.body.name) {
    console.log("entro aca???");
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const role = {
    name: req.body.name,
  };

  // Save Tutorial in the database
  Role.create(role)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Role.",
      });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Roles } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, Roles, totalPages, currentPage };
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  if (Object.keys(req.query).length === 0) {
    Role.findAndCountAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Roles.",
        });
      });
  } else {
    const { limit, offset } = getPagination(page, size);
    Role.findAndCountAll({ where: condition, limit, offset })
      .then((data) => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Roles.",
        });
      });
  }
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  console.log("entro a findOne");
  const id = req.params.id;

  Role.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Role with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Role.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      console.log(num, "num de update");
      if (num[0] === 1) {
        res.send({
          message: "Role was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Role with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id, "id del controller");
  Role.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Role was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Role.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Roles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Roles.",
      });
    });
};

// Find all published Tutorials
exports.findAllFirstLevel = (req, res) => {
  Role.findAll({ where: { Role_id: null } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Roles.",
      });
    });
};
