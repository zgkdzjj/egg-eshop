// app/service/brand.js
'use strict'
const Service = require('egg').Service;

class BrandService extends Service {
    // Create a brand
    async create(payload) {
        const { ctx } = this;
        return ctx.model.Brand.create(payload);
    }

    // Destroy a brand
    async destroy(_id) {
        const { ctx } = this;
        const brand = await ctx.service.brand.find(_id);
        if (!brand) {
            ctx.throw(404, 'brand not found');
        }
        // delete file 
        console.log('logoObjKey => ' + brand['logoObjKey']);
        if (brand['logoObjKey']) {
            let result;
            try {
                result = await ctx.oss.delete(brand['logoObjKey']);
            } catch (err) {
                throw err;
            }
        }

        return ctx.model.Brand.findByIdAndRemove(_id);
    }

    // update a brand 
    async update(_id, payload) {
        const { ctx } = this;
        const brand = await ctx.service.brand.find(_id);
        if (!brand) {
            ctx.throw(404, 'brand not found');
        }
        // Delete old file
        let result;
        if (brand['logoObjKey'] !== payload['logoObjKey']) {
            try {
                result = await ctx.oss.delete(brand['logoObjKey']);
            } catch (err) {
                throw err;
            }
        }
        console.log('payload update => ' + JSON.stringify(payload, null, 4));
        return ctx.model.Brand.findByIdAndUpdate(_id, payload, { new: true });
    }

    // show a brand
    async show(_id) {
        const { ctx } = this;
        const brand = await ctx.service.brand.find(_id);
        if (!brand) {
            ctx.throw(404, 'brand not found');
        }
        return ctx.model.Brand.findById(_id);
    }

    // Index brand
    async index(query) {
        const { ctx } = this;
        Object.keys(query).map((key, index) => {
            query[key] = { $regex: new RegExp(query[key], 'i') };
        });
        const brand = await ctx.model.Brand.find(query);

        if (!brand) {
            ctx.throw(404, 'brand not found');
        }
        return brand;
    }

    // common
    async find(id) {
        const { ctx } = this;
        return ctx.model.Brand.findById(id);
    }

    async search() {

    }
}

module.exports = BrandService;