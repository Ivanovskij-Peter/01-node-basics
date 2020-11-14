const { Router } = require('express');
const { validate } = require('../helpers/validate.middleware');
const { createContact, getContacts, getContactById, updateContact,deteteContact } = require('./contact.controller');
const { createContactSchema, updateContactShema } = require('./contact.schemes');
const router = Router();

router.post('/', validate(createContactSchema), createContact);
router.get('/', getContacts);
router.get('/:contactId', getContactById);
router.patch('/:contactId', validate(updateContactShema), updateContact);
router.delete('/:contactId', deteteContact);

exports.contactRouter = router; 