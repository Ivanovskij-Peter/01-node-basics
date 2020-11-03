const fs = require('fs');
const { lowerFirst } = require('lodash');
const fsp = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, "../../db/contacts.json");

exports.readContact = async ()=> {
    const contacts = await fsp.readFile(contactsPath, "utf8");
    return contacts;
}

exports.saveContact = async (contactParams) => {
    const newContact = await {
        ...contactParams,
        id: uuid.v4(),
    };
    contacts.push(newContact);
    return newContact;
};

exports.findContactById = (id) => {
    const contacts = await fsp.readFile(contactsPath, "utf8");
    console.log(contacts);
    return contacts.find(contact => contact.id === id);
};