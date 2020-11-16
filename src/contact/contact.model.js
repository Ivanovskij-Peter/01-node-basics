const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, "../../db/contacts.json");

exports.readContact = async ()=> {
    const contacts =  await fsp.readFile(contactsPath, "utf8");
    return contacts;
}

exports.saveContact = async ({name,email,phone}) => {
     const contactsData = await fsp.readFile(contactsPath, "utf8");
    const contacts = await JSON.parse(contactsData);
    const id = contacts[contacts.length - 1]['id'] + 1;
    const newContact = { id, name, email, phone };
    const newContacts = [...contacts, newContact];
    await fsp.writeFile(contactsPath, JSON.stringify(newContacts), error => {
        if (error) {
            throw error;
        }
    });
    return newContact;
};

exports.findContactById = async (contactId) => {
    const contactsData = await fsp.readFile(contactsPath, "utf8");
    const contacts = await JSON.parse(contactsData);
    const findContact = await (contacts.find(contact => contact.id === Number(contactId)));
    return findContact;
};

exports.removeContact = async (id) => {
    const contactsData = await fsp.readFile(contactsPath, "utf8");
    const contacts = await JSON.parse(contactsData);
    const indexOfContact = await contacts.findIndex((contact) => contact.id === Number(id));
    if (indexOfContact === -1) {
        return;
    } else {
        await contacts.splice(indexOfContact, 1);
        await fsp.writeFile(contactsPath, JSON.stringify(contacts), error => {
            if (error) {
                throw error;
            }
        });
    }

};

exports.updateContactById = async (id, contactParams) => {
    const contactsData = await fsp.readFile(contactsPath, "utf8");
    const contacts = await JSON.parse(contactsData);
    const indexOfContact = await contacts.findIndex((contact) => contact.id === Number(id));
    if (indexOfContact === -1) {
        return;
    } else {
        contacts[indexOfContact] = await {
            ...contacts[indexOfContact],
            ...contactParams,
        };
        await fsp.writeFile(contactsPath, JSON.stringify(contacts), error => {
            if (error) {
                throw error;
            }
        })
        return contacts[indexOfContact];
    }
};