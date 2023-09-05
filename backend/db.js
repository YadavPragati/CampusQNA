const mongoose = require('mongoose');
//const URL = "mongodb+srv://pragatiyadav:123456789123456789@cluster0.b4scizz.mongodb.net/quora-clone-mern?retryWrites=true&w=majority";
const URL = "mongodb://127.0.0.1:27017/";
module.exports.connect = () => {
    mongoose
      .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => console.log("Error: ", error));
  };