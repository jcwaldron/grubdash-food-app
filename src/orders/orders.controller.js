const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));
const dishesData = require(path.resolve("src/data/dishes-data"))

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass
function list(req, res) {
    res.json({ data: orders })
}

// CREATE & VALIDATORS

function create(req, res, next) {
  const { data: { deliverTo, mobileNumber, status, dishes=[] } = {} } = req.body;
  if (!Array.isArray(dishes) || dishes.length === 0) {
    return next({
      status: 400,
      message: "Order must include a dish.",
    });
  }

  for (let index = 0; index < dishes.length; index++) {
    const { quantity } = dishes[index];
    if (quantity == undefined|| isNaN(quantity) || !Number.isInteger(quantity) || quantity <= 0) {
      return next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0.`,
      });
    }
  }
  
  // Create the new order object
  const newOrder = {
    id: nextId(),
    deliverTo,
    mobileNumber,
    status,
    dishes,
  };
  
  // Add the new order to the orders array
  orders.push(newOrder);
  
  res.status(201).json({ data: newOrder });
}


  function hasDeliverTo(req, res, next) {
    const { data: { deliverTo } = {} } = req.body;
  
    if (deliverTo && deliverTo.length > 0) {
      return next();
    }
    next({ status: 400, message: "Order must include a deliverTo." });
  }

  function hasMobileNumber(req, res, next) {
    const { data: { mobileNumber } = {} } = req.body;
  
    if (mobileNumber && mobileNumber.length > 0) {
      return next();
    }
    next({ status: 400, message: "Order must include a mobileNumber." });
  }

  function hasStatus(req, res, next) {
    const { data: { status } = {} } = req.body;
    const { foundOrder } = res.locals;
  
    if (status) {
      if (status !== "delivered" && foundOrder.status === "delivered") {
        return next({
          status: 400,
          message: "A delivered order cannot be changed.",
        });
      }
  
      if (["pending", "preparing", "out-for-delivery", "delivered"].includes(status)) {
        return next();
      }
    }
  
    next({
      status: 400,
      message: "Order must have a status of pending, preparing, out-for-delivery, or delivered.",
    });
  }
  
  

  function hasDishes(req, res, next) {
    const { data: { dishes } = {} } = req.body;
  
    if (!dishes) {
      return next({ status: 400, message: "Order must include a dish." });
    }
  
    if (!Array.isArray(dishes) || dishes.length === 0) {
      return next({
        status: 400,
        message: "Order must include at least one dish in the 'dishes' property.",
      });
    }

    for (let index = 0; index < dishes.length; index++) {
      const { quantity } = dishes[index];
      if (quantity == undefined|| isNaN(quantity) || !Number.isInteger(quantity) || quantity <= 0) {
        return next({
          status: 400,
          message: `Dish ${index} must have a quantity that is an integer greater than 0.`,
        });
      }
    }
  
    next();
  }

// ORDER EXISTS?

function orderExists(req, res, next) {
    const { orderId } = req.params;
    const { data: { id } = {} } = req.body;
    const foundOrder = orders.find((order) => order.id === orderId);
  
    if (!foundOrder) {
      return next({
        status: 404,
        message: `Order does not exist: ${orderId}`,
      });
    }
  
    if (id && id !== orderId) {
      return next({
        status: 400,
        message: `Order id does not match route id. Order: ${id}, Route: ${orderId}`,
      });
    }
  
    res.locals.orderId = orderId;
    res.locals.foundOrder = foundOrder;
    next();
  }

function update(req, res) {
const { data: { deliverTo, mobileNumber, status, dishes=[] } = {} } = req.body;
const foundOrder = res.locals.foundOrder;

foundOrder.deliverTo = deliverTo;
foundOrder.mobileNumber = mobileNumber;
foundOrder.status = status;
foundOrder.dishes = dishes;

res.json({ data: foundOrder });
}
  

function destroy(req, res) {
    const { orderId } = req.params;
    const index = orders.findIndex((order) => order.id === orderId);
    if (index > -1) {
      orders.splice(index, 1);
    }
    res.sendStatus(204);
  }
  
function isPending(req, res, next) {
    const { data: { status } = {} } = req.body;
    const { foundOrder } = res.locals;

    if (foundOrder.status !== "pending") {
        return next({
            status: 400,
            message: "An order cannot be deleted unless it is pending."
        });
    } 
    next();
}

  
function read(req, res, next){
    const {foundOrder} = res.locals;

    res.json({ data: foundOrder });
}

module.exports = {
    list,
    create: [hasDeliverTo, hasMobileNumber, create],
    read: [orderExists, read],
    update: [orderExists, hasDeliverTo, hasMobileNumber, hasStatus, hasDishes, update],
    destroy: [orderExists, isPending, destroy]
}