'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Posts';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        image: "https://pbs.twimg.com/media/FjFuTG5XgAATm9K?format=jpg&name=medium",
        caption: "👑 Your MCC 28 winners are Teal Turkeys! 👑",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        image: "https://pbs.twimg.com/media/FjIdHqyXgAEgiA6?format=jpg&name=small",
        caption: "Metro Boomin dropped a better album than Drake and 21",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        image: "https://pbs.twimg.com/media/FjG9U0UWYAAyPRo?format=jpg&name=medium",
        caption: "Jay Z turns 53 years old today, Happy Birthday 🐐",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        image: "https://pbs.twimg.com/media/FjICF1eX0AA0pIK?format=jpg&name=medium",
        caption: "Jadon Sancho not in Man Utd's squad for warm-weather training camp because he's still training individually \"so he can return to highest level\".",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        image: "https://pbs.twimg.com/media/FjFkiDeWAAE__Dd?format=jpg&name=small",
        caption: "What is the best ‘Black Mirror’ episode?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        image: "https://pbs.twimg.com/media/FjKNUc7X0AAfDgu?format=jpg&name=small",
        caption: "\“Heather\” by @ConanGray returns to the top 20 on global Spotify, up 79 spots to #18 with over 3.328 million streams.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        image: "https://pbs.twimg.com/media/FjKL1DZXoAMLAN5?format=jpg&name=medium",
        caption: "‘Midnights’ by #TaylorSwift spends a fifth week at #1 on the Billboard 200, with a further 151,000 units earned.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        image: "https://pbs.twimg.com/media/FjKEz_MX0AEsErt?format=jpg&name=medium",
        caption: "@Variety will be announcing the lineup for ‘Actors on Actors’ Season 17 tomorrow.\n\nWhat pairs would you like to see?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Posts';
    return queryInterface.bulkDelete(options, null, {});
  }
};
