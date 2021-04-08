module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/fav_table.pg',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: '../data/seeds',
    },
    useNullAsDefault: true,
  },
};
