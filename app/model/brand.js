'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    
    const BrandSchema = new Schema({
        id: { type: String },
        name: { type: String },
        logoUrl: { type: String },
        logoObjKey: { type: String },
        status: { type: String, default: 'Default' },
        timestamp: { type: Date, default: Date.now }
    });
    return mongoose.model('Brand', BrandSchema);
}