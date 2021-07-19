module.exports =  [
  {
    "name": process.env.DB_NAME,
    "type": process.env.DB_TYPE,
    "host": process.env.DB_HOST,
    "port": 5432,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "entities": [
      "src/app/models/*.ts"
    ],
    "migrations": [
      "src/database/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "src/database/migrations"
    }
  },

  // {
  //   "name": process.env.DB_NAME_MYSQL,
  //   "type": process.env.DB_TYPE_MYSQL,
  //   "host": process.env.DB_HOST_MYSQL,
  //   "port": 5432,
  //   "username": process.env.DB_USER_MYSQL,
  //   "password": process.env.DB_PASSWORD_MYSQL,
  //   "database": process.env.DB_DATABASE_MYSQL,
  //   "entities": [
  //     "src/app/models/*.ts"
  //   ],
  //   "migrations": [
  //     "src/database/migrations/*.ts"
  //   ],
  //   "cli": {
  //     "migrationsDir": "src/database/migrations"
  //   }
  // }
]
