const router = require('express').Router();
const controller = require("../controller/file.controller");
const {isAuth} = require('../middleware/authMiddleware');

router.post("/file", isAuth, controller.upload);
router.get("/files", controller.getListFiles);
router.get("/files/:name", controller.download);

module.exports = router;

// 