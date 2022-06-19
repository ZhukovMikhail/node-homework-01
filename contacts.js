const fs = require('fs/promises');
const path = require('path');
const { v4: id } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');
const updateContancts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  if (!result) {
    console.log('no contact found');
    return null;
  }
  return result;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    console.log('no contact found');
    return null;
  }
  const [result] = contacts.splice(index, 1);
  updateContancts(contacts);
  return result;
};

const addContact = async (name, email, phone) => {
  const newContact = { id: id(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  updateContancts(contacts);
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    console.log('no contact found');
    return null;
  }
  (contacts[index] = { id: contactId, name, email, phone }),
    updateContancts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
