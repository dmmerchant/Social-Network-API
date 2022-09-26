const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomApplications } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = username + '@gmail.com'

    users.push({
      username,
      email
    });
  }

  await User.collection.insertMany(users);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
