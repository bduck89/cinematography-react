const router = require("express").Router();
const connection = require("../config/models/schemas");
const Icon = connection.model("icons");
const ContactDetails = connection.model("contactDetails");
const SocialMedia = connection.model("socialMedia");
const { isAuth } = require("../middleware/authMiddleware");

// Icon Uploads
router.get("/icons",isAuth, async (req, res) => {
  const response = await Icon.find();

  res.send(response);
});

router.get("/icons/:id",isAuth, async (req, res) => {
  const response = await Icon.findById(req.params.id);

  res.send(response);
});

router.post("/icons", isAuth, async (req, res) => {
  const newIcon = new Icon({
    name: req.body.name,
    url: req.body.url,
  });

  const response = await newIcon.save();

  res.send(response);
});

router.patch("/icons/:id", isAuth, async (req, res) => {
  const response = await Icon.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    url: req.body.url,
  });

  res.send(response);
});

router.delete("/icons/:id", isAuth, async (req, res) => {
  const response = await Icon.findByIdAndDelete(req.params.id);

  res.send(response);
});

// Contact
router.get("/contacts",isAuth, async (req, res) => {
  const response = await ContactDetails.find().sort("positionId");

  res.send(response);
});

router.get("/contacts/:id",isAuth, async (req, res) => {
  const response = await ContactDetails.findById(req.params.id);

  res.send(response);
});

router.post("/contacts", isAuth, async (req, res) => {
  const newContactDetail = new ContactDetails({
    type: req.body.type,
    name: req.body.name,
    description: req.body.description,
    positionId: req.body.positionId,
    icon: req.body.icon,
  });

  const response = newContactDetail.save();

  res.send(response);
});

router.patch("/contacts/:id", isAuth, async (req, res) => {
  const response = await ContactDetails.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
    name: req.body.name,
    description: req.body.description,
    positionId: req.body.positionId,
    icon: req.body.icon,
  });

  res.send(response);
});

router.delete("/contacts/:id", isAuth, async (req, res) => {
  const response = await ContactDetails.findByIdAndDelete(req.params.id);

  res.send(response);
});

// Social Media
router.get("/social",isAuth, async (req, res) => {
  const response = await SocialMedia.find().sort("positionId");

  res.send(response);
});

router.get("/social/:id",isAuth, async (req, res) => {
  const response = await SocialMedia.findById(req.params.id);

  res.send(response);
});

router.post("/social", isAuth, async (req, res) => {
  const newSocialMedia = new SocialMedia({
    name: req.body.name,
    link: req.body.link,
    positionId: req.body.positionId,
    icon: req.body.icon,
  });

  const response = await newSocialMedia.save();

  res.send(response);
});

router.patch("/social/:id", isAuth, async (req, res) => {
  const response = await SocialMedia.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    link: req.body.link,
    positionId: req.body.positionId,
    icon: req.body.icon,
  });

  res.send(response);
});

router.delete("/social/:id", isAuth, async (req, res) => {
  const response = await SocialMedia.findByIdAndDelete(req.params.id);

  res.send(response);
});
module.exports = router;
