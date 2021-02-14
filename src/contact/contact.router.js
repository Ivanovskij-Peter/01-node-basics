const { Router } = require("express");
const ContactController = require("./contact.controller");
const router = Router();

router.get("/", ContactController.getContacts);
router.get("/:id", ContactController.validateId, ContactController.getContact);
router.post("/", ContactController.createContact);
router.put(
  "/:id",
  ContactController.validateId,
  ContactController.updateContact
);
router.delete(
  "/:id",
  ContactController.validateId,
  ContactController.deleteContact
);

module.exports = router;
