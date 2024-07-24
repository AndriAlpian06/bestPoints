const { func } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const placesSchema = new Schema ({
    title: String,
    price: Number,
    description: String,
    location: String,
    images:[
        {
            url: String,
            filename: String
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

// placesSchema.post('findOneAndDelete', async function(doc){
//     if(doc){
//         await Review.deleteMany({ _id: { $in: doc.Reviews }})
//     }
// })

module.exports = mongoose.model('Place', placesSchema)