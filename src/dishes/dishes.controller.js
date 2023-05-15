const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));
//const dishes = require("../data/dishes-data")

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

function list(req, res) {
    res.json({ data: dishes })
}

function dishExists(req, res, next) {
    const { dishId } = req.params;
    const { data: { id } = {} } = req.body;
    const foundDish = dishes.find((dish) => dish.id === dishId);
  
    if (!foundDish) {
      return next({
        status: 404,
        message: `Dish does not exist: ${dishId}`,
      });
    }
  
    if (id && id !== dishId) {
      return next({
        status: 400,
        message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`,
      });
    }
  
    res.locals.dishId = dishId;
    res.locals.foundDish = foundDish;
    next();
  }

  
function update(req, res) {
  const { data: { name, description, price, image_url } = {} } = req.body;
  const foundDish = res.locals.foundDish;

  foundDish.name = name;
  foundDish.description = description;
  foundDish.price = price;
  foundDish.image_url = image_url;

  res.json({ data: foundDish });
}



function read(req, res, next){
    const {foundDish} = res.locals;

    res.json({ data: foundDish });
}


function create(req, res) {
    const { data: { name, description, price, image_url } = {} } = req.body;
    const newDish = {
      id: nextId(),
      name,
      description, price,
      image_url
    };
    dishes.push(newDish);
    res.status(201).json({ data: newDish });
  }

  function hasName(req, res, next) {
    const { data: { name } = {} } = req.body;
  
    if (name && name.length > 0) {
      return next();
    }
    next({ status: 400, message: "Dish must include a name." });
  }

  function hasDesc(req, res, next) {
    const { data: { description } = {} } = req.body;
  
    if (description && description.length > 0) {
      return next();
    }
    next({ status: 400, message: "Dish must include a description." });
  }

  function hasPrice(req, res, next) {
    const { data: { price } = {} } = req.body;
  
    if (price && Number.isInteger(price) && price > 0) {
      return next();
    }
    next({ status: 400, message: "Dish must include a price." });
  }

  function hasImg(req, res, next) {
    const { data: { image_url } = {} } = req.body;
  
    if (image_url && image_url.length > 0) {
      return next();
    }
    next({ status: 400, message: "Dish must include a image_url." });
  }


module.exports = {
    list, 
    create: [hasName, hasDesc, hasPrice, hasImg, create],
    read: [dishExists, read],
    update: [dishExists, hasName, hasDesc, hasPrice, hasImg, update],
}