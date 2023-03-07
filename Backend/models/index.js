const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acaquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected...");
  })
  .catch((err) => {
    console.log("error: " + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.products = require("./productModel")(sequelize, DataTypes);

db.sequelize.sync({ force: true }).then(() => {
  console.log("re-sync done");
});

db.users.hasMany(db.products, {
  foreignKey: "user_id",
  as: "product",
});

// db.products.belongsTo(db.users, {
//   foreign_key: "user_id",
//   as: "user",
// });

module.exports = db;
