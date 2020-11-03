const { Router } = require('express');
const { validate } = require('../helpers/validate.middleware');
const { createContact, getContact, getContactById } = require('./contact.controller');
const { createContactSchema } = require('./contact.schemes');
const router = Router();

router.post('/', validate(createContactSchema), createContact);
router.get('/', getContact);
router.get('/:id', getContactById);

exports.contactRouter = router; 