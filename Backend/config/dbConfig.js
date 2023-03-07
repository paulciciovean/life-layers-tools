module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "life-layer-tools",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acaquire: 30000,
    idle: 10000,
  },
};
