
const fs = require('fs');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');
const contactList = fs.readFile(contactsPath, 'utf-8');
const contacts = JSON.parse(contactList);

function listContacts() { 
    console.log('Contacts list');
    console.table(contacts);
    
    return contacts;
}

function getContactById(contactId) {
        const foundContact = contacts.find(contact => {
            if (contact.id === contactId) {
                console.log(`Get contact by Id ${contactId}`);
                console.table(contacts);
                return contacts;
            }
        })
    
        if (!foundContact) {
            console.log(`Contact with ID"${contactId}" is not found`);
        }
}

function removeContact(contactId) {
        const newContact = contacts.find(contact => contact.id !== contactId);
        if (newContact.length === contacts.length) {
            console.log(`Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`);
        }
        console.log('Contact deleted successfully! New list of contacts: ');
        console.table(newContact);
        fs.writeFile(contactsPath, JSON.stringify(newContact), err => {
            if (err) {
                throw err;
            }
        })
    return newContact;
 
}

function addContact(name, email, phone) {
      contacts.push({
          id: contacts.length + 1,
          name: name,
          email: email,
          phone: phone,
      })
      console.log('Contacts added successfully! New lists of contacts: ');
      console.table(contacts);
      fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
          if (err) {
              throw err;
          }
      })
    return contacts;
}

function updateContact(contactId, name, email, phone) {
    const contact = contacts.find(contact => {
        if (contact.id === contactId) {
            contact.name === name;
            contact.email === email;
            contact.phone === phone;
            console.log(`Contact with ID ${contactId} updated`);
            console.table(contacts);
            return contacts;
        }
        if (contact === null) {
            console.log(`Contact with ${contactId} is not found`);
            return;
           }
    })

}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
}