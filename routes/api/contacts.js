const { Router } = require("express");
const router = Router();
// const express = require("express");
// const router = express.Router();

const Joi = require("joi");

// const createError = require("http-errors");
const { NotFound, BadRequest } = require("http-errors");

const contactsOperations = require("../../model");

// const { joiSchema } = require("../../src/middlewares/validationMiddleware");
const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string(),
});

// получить все
// app.use("/api/contacts/...
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    console.log(contacts);

    res.json(contacts);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error" });
  }
});

// получить по id
// app.use("/api/contacts/id...
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsOperations.getContactById(contactId);

    if (!contact) {
      throw new NotFound();
      // throw new createError(404, "Not found");

      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// добавить
router.post("/", async (req, res, next) => {
  const { body } = req;
  // const body = req.body;

  try {
    const { error } = joiSchema.validate(body);

    if (error) {
      throw new BadRequest("missing required name field");
      // throw new BadRequest(error.message);
      // throw new CreateError(400, "missing required name field");
    }

    const newContact = await contactsOperations.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// обновить
router.put("/:contactId", async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;

  try {
    const { error } = joiSchema.validate(body);

    if (error) {
      throw new BadRequest("missing fields");
      // throw new BadRequest(error.message);
      // throw new CreateError(400, "missing fields");
    }

    const updateContact = await contactsOperations.updateContactById(
      contactId,
      body
    );
    // const updateContact = await contactsOperations.updateContactById({
    //   contactId,
    //   ...body,
    // });

    if (!updateContact) {
      throw new NotFound();
    }

    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

// удалить
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deleteContact = await contactsOperations.removeContactById(contactId);

    if (!deleteContact) {
      throw new NotFound();
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = { contactsRouter: router };
