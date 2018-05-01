// app/service/categoires.js
'use strict';
const Service = require('egg').Service;

class CategoryService extends Service {
  // Create a category
  async create(payload) {
    const { ctx } = this;
    return ctx.model.Category.create(payload);
  }

  // Destory a category
  async destroy(_id) {
    const { ctx } = this;
    const category = await ctx.service.categories.find(_id);
    // Test here
    if (!category) {
      ctx.throw(404, 'category not found');
    }
    return ctx.model.Category.findByIdAndRemove(_id);
  }

  // Update a category
  async update(_id, payload) {
    const { ctx } = this;
    const category = await ctx.service.categories.find(_id);
    if (!category) {
      ctx.throw(404, 'category not found');
    }
    return ctx.model.Category.findByIdAndUpdate(_id, payload, { new: true });
  }

  // Show a category
  async show(_id) {
    const { ctx } = this;
    const category = await ctx.service.categories.find(_id);
    if (!category) {
      ctx.throw(404, 'category not found');
    }
    return ctx.model.Category.findById(_id);
  }

  // Index categories
  async index(query) {
    const { ctx } = this;
    Object.keys(query).map( key => {
      query[key] = { $regex: new RegExp(query[key], 'i')};
    });
    return ctx.model.Category.find(query);
  } 
  
  // Common
  async find(id) {
    const { ctx } = this;
    return ctx.model.Category.findById(id);
  }
}

module.exports = CategoryService;
