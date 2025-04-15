const mongoose = require("mongoose");

const connect = async (url) => {
    try {
        await mongoose.connect(url).then(() => {
            console.log("DB Connect Successfully...");
        })
    } catch (error) {
        console.log("Error Occured while connecting DB....", error);
    }
}

module.exports = connect;