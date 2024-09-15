
//  Logic to create and define the schema(blueprint) of the 'user' collection......



const mongoose = require("mongoose")


const addressSchema = new mongoose.Schema({
    lane1 : String,
    lane2 : String,
    street : String,
    city : String,
    country : String,
    pinCode : Number,
})



const userSchema = new mongoose.Schema({            //  defining a schema for the 'user' collection.....
    name : {
        type : String,
        required : true,                    //  by this we ensure that this field always has some data i.e. name can never be null/empty string.....
    },


    age : {
        type : Number,
        min : 19,                       //  min value of age is 19....
    },


    email : {
        type : String,
        required : true,
        lowercase : true,               //  the string has to be lowercase....
        minLength : 11,                 //  min length of email should be 11....
    },


    subjects : [String],                              //  field name : datatype/description supported by js

    address : addressSchema,                //  nested schema........

    birthday : {                                    //  refrencing............
        type : [mongoose.SchemaTypes.ObjectId],
    },

}, {                                         //  built-in data fields.....
    versionKey : false,                      //  to remove __v data field.........
    timestamps : true,                       //  to add "updated at" and "created at" time stamp fields........
})



module.exports = mongoose.model("User", userSchema)              //   makes the collection....  ("collection name", collection schema)

//  NOTE :- The collection name should be plural, hence mongoose will automatically add a 's' at the back of 'User' to make it plural.....







