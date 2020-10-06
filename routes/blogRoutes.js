const blogController = require("../controllers/blogController");
const { Router } = require("express");
const router = Router();

router.get("/create", blogController.create);
router.post("/store", blogController.store);
router.get("/show/:id", blogController.show);
router.put("/update/:id", blogController.update);
router.delete("/destroy/:id", blogController.destroy);
router.get("/:author", blogController.index);

module.exports = router;
