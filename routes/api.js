const express = require("express");
var inventoryRouter = require("./api/inventory");
var itemRouter = require("./api/item");
var tagRouter = require("./api/tag");
var suggestRouter = require("./api/suggest");

var router = express.Router();

router.use("/inventory", inventoryRouter);
router.use("/item", itemRouter);
router.use("/tag", tagRouter);
router.use("/suggest", suggestRouter);

module.exports = router;