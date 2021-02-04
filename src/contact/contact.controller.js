const {
  Types: { ObjectId },
} = require("mongoose");
const Contact = require("./Contact");

async function getContacts(req, res) {
  const contacts = await Contact.find();
  res.json(contacts);
}

async function createContact(req, res) {
  try {
    const { body } = req;
    const contact = await Contact.create(body);
    res.json(contact);
  } catch (error) {
    res.status(400).send(error);
  }
}
async function updateContact(req, res) {
  const {
    params: { id },
  } = req;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    return res.status(400).send("Contact isn't found");
  }
  res.json(updatedContact);
}

async function deleteContact(req, res) {
  const {
    params: { id },
  } = req;
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    return res.status(400).send("Contact isn't found");
  }
  res.json(deletedContact);
}

function validateId(req, res, next) {
  const {
    params: { id },
  } = req;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Your id is not found");
  }
  next();
}

async function getContact(req, res) {
  const {
    params: { id },
  } = req;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(400).send("Contact is not found");
  }
  res.json(contact);
}

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  validateId,
  getContact,
};
