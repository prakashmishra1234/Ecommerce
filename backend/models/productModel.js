const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name:{
        type: String,
        required:[true, 'Please provide product name'],
        trim:true
    },
    description:{
        type:String,
        required:[true, 'Please provide product descriptions']
    },
    price:{
        type:Number,
        required:[true, 'Please provide product price'],
        maxlength:[8, 'Price cannot exceed 8 character']
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id: {
                type:String,
                required:true
            },
            url: {
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, 'Please provide product category']
    },
    stock:{
        type:Number,
        required:[true, 'Please mention your stock'],
        maxlength:[4, 'Stock cannot exceed 4 characters'],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                typeL:String
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Product', productSchema);