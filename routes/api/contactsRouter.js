const { Router } = require("express");
const router = Router();

const { authenticate } = require("../../srs/middlewares");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  patchContactController,
  deleteContactController,
} = require("../../srs/controllers/contactsController");

router.get("/", authenticate, getContactsController);

router.get("/:contactId", authenticate, getContactByIdController);

router.post("/", authenticate, addContactController);

router.put("/:contactId", authenticate, changeContactController);

router.patch("/:contactId/favorite", authenticate, patchContactController);

router.delete("/:contactId", authenticate, deleteContactController);

module.exports = { contactsRouter: router };
