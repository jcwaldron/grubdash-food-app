const router = require("express").Router({mergeParams: true});

// TODO: Implement the /orders routes needed to make the tests pass
const controller = require("../orders/orders.controller");
const orders = require("../data/orders-data");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Implement the /dishes routes needed to make the tests pass

 router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)
    ;

router
    .route("/:orderId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed)
    ;

module.exports = router;
