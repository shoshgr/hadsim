const express = require('express');
const router = express.Router();
const detailes = require('../service/memberService');
router.get('/', async function (req, res) {
    try {
        const members = await detailes.getMembers();
        res.send(members);

    } catch (err) {
        res.status(400).send('This is a get members error: ' + err.message);
    }
});

router.get('/:id', async function (req, res) {
    try {
        const memberDe = await detailes.getMemberDetails(req.params.id);
        console.log(memberDe);
        res.send(memberDe);
    }
    catch (err) {
        res.status(400).send('This is a get member error: ' + err.message);
    }

});

router.post('/', async function (req, res, next) {
    try {
        const result = await detailes.postMemberDetails(req);
        res.send(result);
    }
    catch (err) {
        res.status(400).send('This is a post member error: ' + err.message);
    }
});
router.post('/corona/vaccines/:id', async function (req, res, next) {
    try {
        const result = await detailes.postVaccinesDetails(req);
        res.send(result);
    }
    catch (err) {
        res.status(400).send('This is a post member vaccine error: ' + err.message);
     
    }
});
router.post('/corona/illness/:id', async function (req, res, next) {
    try {
        const result = await detailes.postIllnessDetails(req);
        res.send(result);

    }
    catch (err) {
        res.status(400).send('This is a post member illness error: ' + err.message);
    }
});
router.delete('/:id', async function (req, res, next) {

    try {
        const result = await detailes.deleteMember(req.params.id); // Corrected typo 'detailes' to 'details'
        res.json(result);
        res.send();
    }
    catch (err) {
        res.status(400).send('This is a delete member error: ' + err.message);
    }
 
});


router.put('/:id', async function (req, res, next) {

    try {
        const result = await detailes.updateMember(req.params.id, req);
        res.send(result);
    }
    catch (err) {
        res.status(400).send('This is a put member error: ' + err.message);

    }

});
router.put('/corona/illness/:id', async function (req, res) {

    try {
        const result = await detailes.updateMemberIllness(req);
        res.send(result);
    }
    catch (err) {
        res.status(400).send('This is a put member illness error: ' + err.message);
    }

});

module.exports = router;