const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    const users = [];

    for (let i = 0; i < 20; i++) {
        const fullName = getRandomName();
        const first = fullName.split(' ')[0];
        const last = fullName.split(' ')[1];
        const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
    
    users.push({
        first, last, github
    });
    }
// add users to collection
    await User.collection.insertMany(users);
// add thoughts
    await Thought.collection.insertOne({
        // thoughtText: 'I love coding',
        // createdAt: Date.now(),
        // username: "tori1"
    });

    // to log out seed data
    console.table(users);
    console.info('Seeding complete');
    process.exit(0);
});