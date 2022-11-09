const router = require('express').Router();
const connection = require('../config/models/schemas');
const Showreel = connection.model('showreels');
const Video = connection.model('videos');
const Cv = connection.model('cvs');
const Category = connection.model("categories");
const Production = connection.model("productions");
const Icon = connection.model("icons");
const ContactDetails = connection.model("contactDetails");
const SocialMedia = connection.model("socialMedia");

// Home
router.get('/home', async(req, res) => {
    const showreel = await Showreel.find()
    res.send(showreel);
});

// Work
// Get All
router.get('/work', async(req, res) => {
    const response = await Video.find().sort('positionId');
    res.send(response);
});

// Get Single Video
router.get('/work/:id', async(req, res) => {
    const response = await Video.findById(req.params.id);
    res.send(response);
});

// Resume
router.get("/resume/category", async (req, res) => {
    const response = await Category.find().sort("positionId");
  
    res.send(response);
  });
  
  router.get("/resume/category/:categoryId", async(req, res) => {
      const response = await Category.findById(req.params.categoryId);
  
      res.send(response);
  })

  router.get("/resume/production", async (req, res) => {
    const response = await Production.find().sort("positionId");
  
    res.send(response);
  });
  
  router.get("/resume/production/:productionId", async(req, res)=>{
      const response = await Production.findById(req.params.productionId)
  
      res.send(response)
  })

  router.get("/cv", async(req,res) => {
    const response = await Cv.find();
  
    res.send(response)
  })
  
  router.get("/download/:id", async (req, res) => {
    const response = await Cv.findById(req.params.id);
  
    res.send(response);
  });
// Contact
router.get("/icons", async (req, res) => {
    const response = await Icon.find();
  
    res.send(response);
  });
  
  router.get("/icons/:id", async (req, res) => {
    const response = await Icon.findById(req.params.id);
  
    res.send(response);
  });

  // Contact
router.get("/contacts", async (req, res) => {
    const response = await ContactDetails.find().sort("positionId");
  
    res.send(response);
  });
  
  router.get("/contacts/:id", async (req, res) => {
    const response = await ContactDetails.findById(req.params.id);
  
    res.send(response);
  });

  // Social Media
router.get("/social", async (req, res) => {
    const response = await SocialMedia.find().sort("positionId");
  
    res.send(response);
  });
  
  router.get("/social/:id", async (req, res) => {
    const response = await SocialMedia.findById(req.params.id);
  
    res.send(response);
  });

module.exports = router;