const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  GET api/profile/me
// @desc   Get current users profile
// @access private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'there is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/profile
// @desc   create or update user profile
// @access private
router.post('/', [auth,
    [
        check('status', 'status is require').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // build profile object 
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.webiste = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;


    try {

        // upsert option creates new profile if one isnt found
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true }
        );
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever error');
    }
});

// @route  GET api/profile
// @desc   get all user profiles 
// @access public 

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/profile/user/:user_id
// @desc   get profile by user id 
// @access public 

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'The profile you are looking for doesnt exists' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'The profile you are looking for doesnt exists' });
        }
        res.status(500).send('Server Error');
    }
});


// @route  DELETE api/profile
// @desc   deletes profile user and posts
// @access private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo remove users posts 

        // removes the users profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // removes the user 
        await User.findByIdAndRemove({ _id: req.user.id });

        res.json({ msg: 'User Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router; 