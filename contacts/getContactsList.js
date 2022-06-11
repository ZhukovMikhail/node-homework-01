const fs = require('fs/promises');

const getContactsList = async () => {
  const allContacts = await fs.readFile('/db.json');
  return allContacts;
};

module.exports = getContactsList;
