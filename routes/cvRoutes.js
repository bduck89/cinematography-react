const router = require("express").Router();
const connection = require("../config/models/schemas");
const Cv = connection.model("cvs");
const Category = connection.model("categories");
const Production = connection.model("productions");
const {isAuth} = require('../middleware/authMiddleware');

// Category
// Get All
router.get("/resume/category",isAuth, async (req, res) => {
  const response = await Category.find().sort("positionId");

  res.send(response);
});

router.get("/resume/category/:categoryId",isAuth, async(req, res) => {
    const response = await Category.findById(req.params.categoryId);

    res.send(response);
})

router.post("/resume/category", isAuth, async (req, res) => {
  const newCategory = new Category({
    positionId: req.body.positionId,
    name: req.body.name,
  });

  const response = await newCategory.save();
  console.log(response);
  res.send(response);
});

router.patch("/resume/category/:id", isAuth, async (req, res) => {
  const response = await Category.findByIdAndUpdate(req.params.id, {
    positionId: req.body.positionId,
    name: req.body.categoryName,
  });

  res.send(response);
});

router.delete("/resume/category/:id", isAuth, async (req, res) => {
  const response = await Category.findByIdAndDelete(req.params.id);

  res.send(response);
});

// Production
router.get("/resume/production",isAuth, async (req, res) => {
  const response = await Production.find().sort("positionId");

  res.send(response);
});

router.get("/resume/production/:productionId",isAuth, async(req, res)=>{
    const response = await Production.findById(req.params.productionId)

    res.send(response)
})

router.post("/resume/production", isAuth, async (req, res) => {
  const newProduction = new Production({
    categoryName: req.body.categoryName,
    name: req.body.name,
    company: req.body.company,
    details: req.body.details,
    positionId: req.body.positionId,
  });

  const response = await newProduction.save();

  res.send(response);
});

router.patch("/resume/production/:id", isAuth, async (req, res) => {
  const response = await Production.findByIdAndUpdate(req.params.id, {
    categoryName: req.body.categoryName,
    name: req.body.name,
    company: req.body.company,
    details: req.body.details,
    positionId: req.body.positionId,
  });

  res.send(response);
});

router.delete('/resume/production/:id', isAuth, async(req, res) => {
    const response = await Production.findByIdAndDelete(req.params.id);

    res.send(response);
});

// File upload needs to be completed
// CV
router.get("/cv",isAuth, async(req,res) => {
  const response = await Cv.find();

  res.send(response)
})

router.get("/download/:id",isAuth, async (req, res) => {
  const response = await Cv.findById(req.params.id);

  res.send(response);
});

router.post("/upload", isAuth, async (req, res) => {
  const newCV = new Cv({
    uniqueFileName: req.body.uniqueFileName,
    url: req.body.url
  });

  const response = await newCV.save();

  res.send(response);
});

router.patch("/replace/:id", isAuth, async (req, res) => {
  const response = await Cv.findByIdAndUpdate(req.params.id, {
    uniqueFileName: req.body.uniqueFileName,
    url: req.body.url
  });

  res.send(response);
});

router.delete("/remove/:id", isAuth, async (req, res) => {
  const response = await Cv.findByIdAndDelete(req.params.id);

  res.send(response);
});

module.exports = router;
