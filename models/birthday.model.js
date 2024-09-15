



const mongoose = require("mongoose")


const birthdaySchema = new mongoose.Schema({         //  another schema defined.......
    date : Number,
    month : Number,
    year : Number,
})



module.exports = mongoose.model("birthday", birthdaySchema)







