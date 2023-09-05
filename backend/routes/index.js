const express = require('express');
const router = express.Router();

const questionRouter = require("./Question.js");
const answerRouter = require("./Answer.js");

router.get('/', (req, res) => {
    res.send("This API is reserved for quora-clone");
});

router.use("/questions", questionRouter);
router.use('/answers', answerRouter);

module.exports = router;