require('dotenv').config();

const config = {
  server: {
    hostname: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  pagination: {
    limit: 10,
    skip: 0,
    page: 1,
  },
  sort: {
    sortBy: {
      default: 'createdAt',
      fields: ['createdAt', 'updatedAt'],
    },
    direction: {
      default: 'desc',
      options: ['asc', 'desc'],
    },
  },
};

module.exports = config;
