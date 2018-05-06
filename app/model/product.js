/* Product Details Model */
'use strict'
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const attribute =  new Schema({
        name: String,
        value: [String]
    });

    const ProductSchema = new Schema({
        id: { type: String, default: Math.floor(Math.random() * 10000).toString() },
        name: { type: String },
        title: { type: String },
        sub_title: { type: String },
        pcate: { type: String },
        price: { type: Number },
        was_price: { type: Number },
        quantity: { type: Number },
        attributes: [attribute],
        picUrl: [String],
        picObjKey: [String],
        content: { type: String},
        status: { type: String }
    });
    return mongoose.model('Product', ProductSchema);
}