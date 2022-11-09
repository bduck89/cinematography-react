const router = require('express').Router();
const connection = require('../config/models/schemas');
const Showreel = connection.model('showreels');
const Video = connection.model('videos');
const {isAuth} = require('../middleware/authMiddleware');

// Home Page Routes
router.get('/home', isAuth, async(req, res) => {
    const showreel = await Showreel.find()
    res.send(showreel);
});

router.post('/home', isAuth, async (req, res) => {
    const newShowreel = new Showreel({
        vimeoLink: req.body.vimeoLink
    });

    const showreel = await newShowreel.save();

    res.send(showreel);
});

router.patch('/home/:id', isAuth, async(req, res) => {
    const response = await Showreel.findByIdAndUpdate(req.params.id, {vimeoLink: req.body.vimeoLink})

    res.send(response);
});


// Work Page Routes

// Get All
router.get('/work',isAuth, async(req, res) => {
    const response = await Video.find().sort('positionId');
    res.send(response);
});

// Get Single Video
router.get('/work/:id',isAuth, async(req, res) => {
    const response = await Video.findById(req.params.id);
    res.send(response);
});


router.post('/work', isAuth, async(req, res) => {
    const newVideo = new Video({
        thumbnail: req.body.thumbnail,
        videoTitle: req.body.videoTitle,
        videoDescription: req.body.videoDescription,
        videoLink: req.body.videoLink,
        positionId: req.body.positionId
    });

    const response = await newVideo.save();

    res.send(response);
});

router.patch('/work/:id', isAuth, async(req, res) => {
    const response = await Video.findByIdAndUpdate(req.params.id, {
        thumbnail: req.body.thumbnail,
        videoTitle: req.body.videoTitle,
        videoDescription: req.body.videoDescription,
        videoLink: req.body.videoLink,
        positionId: req.body.positionId
    })

    res.send(response);
});

router.delete('/work/:id', isAuth, async(req, res) => {
    const response = await Video.findByIdAndDelete(req.params.id)

    res.send(response);
});


module.exports = router;

