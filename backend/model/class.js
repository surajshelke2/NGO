const mongoose = require('mongoose')

const classSchema = mongoose.Schema({

    class:{
        type:String,
        required:[true,'Please provide a Class Name'],
        trim:true,
        unique:true,
    },

    subject:{
        type:mongoose.Types.ObjectId,
        ref:'subject'
    }
},{
    timestamps: true  //Saves created at and updated at as dates (ISO
})

const classData = mongoose.model('classes',classSchema);



//

const subjectSchema = mongoose.model({
    
})







module.exports ={classData}