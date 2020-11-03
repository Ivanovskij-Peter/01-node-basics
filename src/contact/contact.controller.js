const { saveContact, readContact, findContactById } = require("./contact.model");

exports.createContact = async (req, res, next) => {
    try {
         const contact= await saveContact(req.body);
        return res.status(201), send(contact);
    } catch (err) {
        next(err);
    }
};

exports.getContact = async (req, res, next) => {
    try {
        const contacts = await readContact();
    return res.status(200).send(contacts);
    } catch (error) {
        next(error);
    }
}
exports.getContactById = (req, res, next) => {
    try {
        const contact = findContactById(req.params.id);
        if (!contact) {
        return res.status(404).send("User not found");
        }
        return res.status(200).send(contact);
    } catch (error) {
        next(error);
    }
};