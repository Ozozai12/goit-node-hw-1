const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs
    .readFile(contactsPath)
    .then((data) => console.log(data.toString()))
    .catch((err) => console.log(err.message));
}

async function getContactById(contactId) {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const getContact = db.filter((contact) => contact.id === contactId);
  console.log(getContact);
}

async function removeContact(contactId) {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const updatedContacts = db.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
}

async function addContact(name, email, phone) {
  const id = Date.now().toString();
  const contact = { id, name, email, phone };

  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  db.push(contact);

  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
