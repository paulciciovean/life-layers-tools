const userController = require("../controllers/userController.js");

const router = require("express").Router();

router.post("/register", userController.addUser);

router.get("/all", userController.getAllUsers);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.post("/login", userController.checkUserCredentials);

router.get("/:id", userController.findUserById);

module.exports = router;
