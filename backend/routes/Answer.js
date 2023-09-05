const express = require("express");
const router = express.Router();

const answerDB = require('../models/Answer');

router.post('/', async(req, res) => {
    try {
        await answerDB.create({
            answers : req.body.answers,
            questionId: req.body.questionId,
            user : req.body.user
        }).then(() => {
            res.status(201).send({
                status : true,
                message : "answer added sucessfully"
            })
        }).catch((e) => {
            res.status(400).send({
                status : false,
                message : "Bad Request",
            });
        });
    } catch(e) {
        res.status(500).send({
            status : false,
            message : "Error while finding Answers",
        });
    }
});


module.exports = router