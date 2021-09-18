const contacts = require("../controllers/contact.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", contacts.create);

    router.get("/", contacts.findAll);

    router.get("/", contacts.findAllFavorite);

    router.get("/", contacts.findOne);

    router.put("/:id", contacts.update);

    router.delete("/:id", contacts.delete);

    router.delete("/", contacts.deleteAll);

    app.use("/api/contacts", router);
};