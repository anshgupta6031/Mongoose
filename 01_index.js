



const mongoose = require("mongoose")        //  imported the mongoose module.......
const user_model = require("./models/user.model")               //  imported the created model in "./models/user.model".......
const birthday_model = require("./models/birthday.model")

//  Event driven connection.......

mongoose.connect("mongodb://localhost/new_db")                  //  connecting with mongodb database having name 'new_db' in this computer(localhost)....
const db = mongoose.connection                      //  now, object db will wait for the connection event....


db.once("open", ()=>{                                   //  executes the callback if the connection event gives "open".
    console.log("YaY!!!, Successfully connected to mongoDB.")


 //   init()                              //  Function to insert a doc......

 //   ReadQuery()                     //  Function to read from the collection....

 //   UpdateQuery()                     //  Function to update docs in the collection....

 //   UpdateQuery2()                     //   Another function to update docs in the collection....

 //   DeleteQuery()                     //  Function to delete docs from the collection....
})


db.on("error", ()=>{                                   //  executes the callback if the connection event gives "error".
    console.log("Error while connecting to mongoDB.")
})





async function init(){                      //  Logic to insert the doc inside the database....

    const bd_obj = {
        date : 23,
        month : 4,
        year : 2003,
    }

    const bd = await birthday_model.create(bd_obj)

    const user_obj = {
        name : "Ansh gupta",
        age : 21,
        email : "guptaansh6031@gmail.com",
        subjects : ["maths", "english", "science"],

        address : {
            lane1 : "lane1",
            lane2 : "lane2",
            street : "Post Office Street",
            city : "Goshainganj",
            country : "India",
            pinCode : 224141,
        },

        birthday : bd._id,                  //   defining relation between 2 objects using refrencing............
    }

    try{
        const user = await user_model.create(user_obj)                     //  Inserted inside the 'user' collection......
                                                    //  This insertion takes place asynchronously as it takes time......
                                                    //  Hence, we use async and await so it works synchronously.....

        console.log("User created", user)
    }

    catch(error){
        console.log("Error while inserting....", error)
    }
}





async function ReadQuery(){                 //  reading / fetching the data from mongodb database.......

    try{
        //  const user = await user_model.findById("661bcacfbc5e56dc81525964")

        //  const user = await user_model.find({name : "Ansh gupta"})             //  similar to the find query in mongoDB.......  // returns an array of objects...

        //  const user = await user_model.findOne({name : "Ansh gupta"})             //  similar to the findOne query in mongoDB.......  // returns a single object...

        //  const user = await user_model.where("age").gt("19").where("name").equals("Ansh gupta").limit(2)              //  finding the first 2 docs with age greater than 19 and having name : "Ansh gupta".........
        const user = await user_model.find({age : {$gt : 19}, name : "Ansh gupta"}).limit(2)         //  same thing as above line, done using mongoDB queries......

        console.log(user)
    }

    catch(error){
        console.log("Error while reading....", error)
    }
}





async function UpdateQuery(){                           //  updating the docs in the collection....

    try{
        const user = await user_model.findOne({name : "Ansh gupta"})         //  fetching the docs to be updated.......

        user.age = 100                                 //  updating fields.......
        user.email = "ahshjas@gmail.com"

        const user_updated = await user.save()                        //  saving the changes in the database.......

        console.log(user_updated)
    }

    catch(error){
        console.log("Error while updating the data....", error)
    }
}






async function UpdateQuery2(){                           //  another way to update the docs in the collection....

    try{
     //   const user = await user_model.updateOne({name : "Ansh gupta"}, {$set : {name : "GURU"}})              //  similar to the updateOne query in mongoDB.......

        const user = await user_model.updateMany({name : "Ansh gupta"}, {$set : {name : "GURU"}})              //  similar to the update query in mongoDB.......

        console.log(user)
    }

    catch(error){
        console.log("Error while updating the data....", error)
    }
}





async function DeleteQuery(){                          //  deleting the docs from the collection....

    try{
     //   const user = await user_model.deleteOne({age : 100})              //  similar to the deleteOne query in mongoDB.......
        const user = await user_model.deleteMany({age : 21})              //  similar to the deleteOne query in mongoDB.......

        console.log(user)
    }

    catch(error){
        console.log("Error while deleting the data....", error)
    }
}








