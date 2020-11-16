const { saveContact, readContact, findContactById,removeContact,updateContactById } = require("./contact.model");

exports.createContact = async (req, res, next) => {
    try {
         const contact= await saveContact(req.body);
        return res.status(201), send(contact);
    } catch (err) {
        next(err); 
    }
};

exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await readContact();
    return res.status(200).send(contacts);
    } catch (error) {
        next(error);
    }
}
exports.getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await findContactById(contactId);
        if (!contact) {
        return res.status(404).send("Contact not found");
        }
        return res.status(200).send(contact);
    } catch (error) {
        next(error);
    }
};
exports.updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { name, email, phone } = reg.body;
        if (!(name || email || phone)) {
            return res.status(400).send('missing fields')
        }
        const contact = await findContactById(contactId);
        if (!contact) {
             return res.status(404).send("Contact not found");
        }
        const updatedContact = await updateContactById(contactId, req.body);
        return res.status(200).send(updatedContact);
    } catch (error) {
        next(error);
    }
}
exports.deteteContact = async (req, res, next)=>{
    try {
        const { contactId } = req.params;
        const contact = await findContactById(contactId);
        if (!contact) {
            return res.status(404).send("Contact not found");
        }
        removeContact(contactId);
        return res.status(200).send('Contact deleted');
    } catch (error) {
        next(error);
    }
}