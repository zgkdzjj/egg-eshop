// app/controller/categories.js
'use strict';
const Controller = require('egg').Controller;


class CategoryController extends Controller {
  

  constructor(ctx) {
    super(ctx);
    //this.root = 'http://localhost:7001';

    this.CategoryCreateRule = {
      // id: { type: 'string', required: true, allowEmpty: false },
      name: { type: 'string', required: true, allowEmpty: false },
      description: { type: 'string', required: true, allowEmpty: false },
      status: { type: 'string', required: true, allowEmpty: false },
    };
  }

  // Creart a category
  async create() {
    console.log('create was called');

    // Destructuring
    // Same As const ctx = this.ctx; const service = this.service;
    const { ctx, service } = this;
    // Validate a request
    ctx.validate(this.CategoryCreateRule);
    // Compose payload
    const payload = ctx.request.body || {};
    // Call Service
    const res = await service.categories.create(payload);
    // Set Response
    ctx.status = 201;
    ctx.helper.success({ ctx, res });
     console.log('res => ' + JSON.stringify(res, null, 4));
  }

  // Delete a category
  async destroy() {
    console.log('destory was called');
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.categories.destroy(id);
    // console.log('res destroy => ' + JSON.stringify(res, null, 4));
    ctx.status = 204;
    ctx.helper.success({ ctx, res });
  }

  // Update a category
  async update() {
    const { ctx, service } = this;
    console.log('update was called');
    ctx.validate(this.CategoryCreateRule);
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.categories.update(id, payload);
    console.log('update finished res => ' + JSON.stringify(res, null, 4));
    ctx.status = 201;
    ctx.helper.success({ ctx, res });
  }

  // Get single category by id
  async show() {
    const { ctx, service } = this;
    const  { id } = ctx.params;
    const res = await service.categories.show(id);
    console.log('res => ' + JSON.stringify(res, null, 4));
    ctx.helper.success({ ctx, res });
  }

  async new() {
    console.log('new was called');
  }

  async edit() {
    console.log('edit was called');
  }

  // Get all categories
  async index() {
    console.log('index was called');
    const { ctx, service } = this;
    const payload = ctx.query;
    this.log('index payload',payload);
    const res = await service.categories.index(payload);
    // Set response
    ctx.helper.success({ ctx, res });
  }

  // Search categories
  async search() {
  }

  log (operation, arg) {
    console.log(operation + ' => ' + JSON.stringify(arg, null, 4));
  }
}
module.exports = CategoryController;

