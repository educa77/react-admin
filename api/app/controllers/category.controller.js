const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title && !req.body.id) {
    console.log("entro aca???");
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const category = {
    id: req.body.id,
    title: req.body.title,
    order: req.body.order,
    expanded: req.body.expanded,
    category_id: req.body.category_id,
  };

  // Save Tutorial in the database
  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: categories } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, categories, totalPages, currentPage };
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  console.log(req.headers, "req.headers de findAll de categories");
  const tree = req.headers["data-tree"];
  console.log(tree, "tree");

  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  if (Object.keys(req.query).length === 0) {
    Category.findAndCountAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Categories.",
        });
      });
  } else {
    const { limit, offset } = getPagination(page, size);
    Category.findAndCountAll(
      tree
        ? { where: { parent_id: null }, limit, offset }
        : { where: condition, limit, offset }
    )
      .then((data) => {
        const response = getPagingData(data, page, limit);

        res.send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Categories.",
        });
      });
  }
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  console.log("entro a findOne");
  const id = req.params.id;

  Category.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
const upDateCategory = async ({ id, category_id, title, order, expanded }) => {
  const result = await getEspecificRecord({
    id,
    category_id,
    title,
    order,
    expanded,
  });
  try {
    return await result.update({
      id,
      category_id,
      title,
      order,
      expanded,
    });
  } catch (error) {
    console.error(error);
  }
};

const getEspecificRecord = async ({
  id,
  category_id,
  title,
  order,
  expanded,
}) => {
  const record = await Category.findOne({
    where: { id: id },
  });

  if (!record) {
    const record = await Category.create({
      id,
      category_id,
      title,
      order,
      expanded,
    });

    return record;
  }

  return record;
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(id, "id de update");
  if (id === "tree") {
    const { id, category_id, title, order, expanded } = req.body;
    upDateCategory({ id, category_id, title, order, expanded })
      .then((category) => {
        res.status(201).json(category);
      })
      .catch((err) => res.status(404).json(err));
  } else {
    Category.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        console.log(num, "num de update");
        if (num[0] === 1) {
          res.send({
            message: "Category was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Category with id=" + id,
        });
      });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id, "id del controller");
  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Categories were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Categories.",
      });
    });
};

// Find all published Tutorials
exports.findAllFirstLevel = (req, res) => {
  Category.findAll({ where: { category_id: null } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};

const tree = (req, res) => {
  console.log("entro a treee??????");
  const { id, category_id, title, order, expanded } = req.body;
  upDateCategory({ id, category_id, title, order, expanded })
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((err) => res.status(404).json(err));
};
