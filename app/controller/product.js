
// app/controller.product.js
'use strict'
const path = require('path');
const Controller = require('egg').Controller;

class ProductContoller extends Controller {
    constructor(ctx) {
        super(ctx);
        this.ProductCreateTransfer = {
            name: { type: 'string', required: true, allowEmpty: false },
            title: { type: 'string', required: true, allowEmpty: false },
            sub_title: { type: 'string', required: true, allowEmpty: false },
            pcate: { type: 'string', required: true, allowEmpty: false },
            price: { type: 'string', required: true, allowEmpty: false },
            was_price: { type: 'string', required: true, allowEmpty: false },
            attributes: { type: 'string', required: true, allowEmpty: false },
            picUrl: { type: 'string', required: true, allowEmpty: false },
            picObjKey: { type: 'string', required: true, allowEmpty: false },
            status: { type: 'string', required: true, allowEmpty: false },
        }
    }

    // Create New Product, content-type must be 'multipart'
    async create() {
        console.log('create product called');
        const { ctx, service } = this;
        const res = await service.product.create();
        // Set Response 
        ctx.status = 201;
        ctx.helper.success({ ctx, res });
    }

    // Delete a product
    async destroy() {
        console.log('destroy product called');
        const { ctx, service } = this;
        const { id } = ctx.params;
        const res = await service.product.destroy(id);
        ctx.status = 204;
        ctx.helper.success({ ctx });
    }

    // Update a product
    async update() {
        console.log('update product called')
        const { ctx, service } = this;
        const { id } = ctx.params;
        const res = await service.product.update(id);
        // Set Response 
        ctx.status = 201;
        ctx.helper.success({ ctx, res });
    }

    //  Get a product by id 
    async show() {
        console.log('show product called');
        const { ctx, service } = this;
        const { id } = ctx.params;
        const res = await service.product.show(id);
        ctx.status = 200;
        ctx.helper.success({ ctx, res });
    }

    // Get all products
    async index() {
        console.log('index products called');
        const { ctx, service } = this;
        const payload = ctx.query;
        const res = await service.product.index(payload);
        // Set response
        ctx.helper.success({ ctx, res });
    }


    // Delete a single pic 
    async deletePic() {
        console.log('delete pic called');
        const { ctx, service } = this;
        const objKey = ctx.query.objKey;
        const url = ctx.query.url;
        console.log('objKey => ' + objKey + ' || ' + 'url => ' + url);
        const res = await service.product.deletePic(objKey, url);
        // Set Response 
        ctx.helper.success({ctx, res});
    }


}

module.exports = ProductContoller;