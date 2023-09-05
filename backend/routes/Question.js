const express = require("express");
const router = express.Router();

const questionDB = require("../models/Question.js");

router.post("/", async(req, res) => {
    console.log(req.body);
    try {
        await questionDB
        .create({
            questionName : req.body.questionName,
            questionURL : req.body.questionURL,
            user : req.body.user,
        })
        .then(() => {
            res.status(201).send({
                status : true,
                message : "Question Added Sucessfully",
            });
        }).catch((err) => {
            res.send(400).send({
                status : false,
                message : "bad request",
            });
        });
    } catch(e) {
        res.status(500).send({
            status : false,
            message : "error while adding question"
        });
    }
    
});



router.get('/', async (req, res) => {
    try {
        await questionDB.aggregate([
            {
                $lookup: {
                    from : "answers",//collection to join
                    localField : "_id", //field from input document
                    foreignField: "questionId",
                    as: "allAnswers" //output array field
                }
            }
        ])
        .exec()
        .then((doc) => {
            res.status(200).send(doc);
        })
        .catch((error) => {
            res.status(500).send({
                status: false,
                message : "unable to get the question details"
            });
        });
    } catch(e) {
        res.status(500).send({
            status : false,
            message : "unexprected error",
        });
    }
});

module.exports = router;

