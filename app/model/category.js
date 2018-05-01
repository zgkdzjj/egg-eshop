'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CategorySchema = new Schema({
    id: { type: String, default: Math.floor(Math.random() * 10000).toString() },
    name: { type: String },
    description: { type: String },
    status: { type: String },
    updatedAt: { type: Date, default: Date.now }
  });
  return mongoose.model('Category', CategorySchema);
};

