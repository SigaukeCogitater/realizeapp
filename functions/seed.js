const { db } = require('./util/admin');

const faker = require('faker');

const fakeIt = () => {
    return db.collection('ideas').add({

        unserName: faker.internet.userName(),
        body: faker.hacker.phrase(),
        likesCount: faker.random.number(),
        createdAt: new Date().toDateString(),
        commentsCount: faker.random.number(),
    });
}

Array(20).fill(0).forEach(fakeIt);
