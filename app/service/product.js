// app/service/product.js
'use strict'
const path = require('path');
const Service = require('egg').Service;


const prodImgPath = 'egg-eshop/prodct/detail/';

class ProductService extends Service {
    // Create product 
    async create() {
        const { ctx, service } = this;
        const payload = await ctx.service.product.multiHandle();
        return ctx.model.Product.create(payload);
    }

    // Destroy a product
    async destroy(_id) {
        const { ctx } = this;
        const product = await ctx.service.product.find(_id);
        if (!product) {
            ctx.throw(404, 'product not found');
        }
        // Delete images associated
        if (product['picObjKey'].length > 0) {
            await ctx.service.product.deleteMultiPic(product['picObjKey']);
        }
        return ctx.model.Product.findByIdAndRemove(_id);
    }

    // Update a product 
    async update(_id) {
        const { ctx, service } = this;
        const product = await ctx.service.product.find(_id)
        if (!product) {
            ctx.throw(404, 'product not found')
        }
        const payload = await ctx.service.product.multiHandle();
        console.log('payload update => ' + JSON.stringify(payload, null, 4));
        return ctx.model.Product.findByIdAndUpdate(_id, 
            {
                $set: {
                    name: payload['name'],
                    title: payload['title'],
                    sub_title: payload['sub_title'],
                    pcate: payload['pcate'],
                    price: payload['price'],
                    was_price: payload['was_price'],
                    quantity: payload['quantity'],
                    attributes: payload['attributes'],
                    content: payload['content'],
                    status: payload['status']
                },
                $push: 
                {
                    picObjKey: { $each: payload['picObjKey']},
                    picUrl: { $each: payload['picUrl']}    
                }


             }, { new: true });

    }

    // show a product
    async show(_id) {
        const { ctx, service } =  this;
        const product = await service.product.find(_id);
        if(!product) {
            ctx.throw(404, 'product not found');
        }
        return ctx.model.Product.findById(_id);
    }

    // Delete multiple images from oss
    async deleteMultiPic(objKeyList) {
        const { ctx } = this;
        let result;
        try {
            result = ctx.oss.deleteMulti(objKeyList)
        } catch (err) {
            throw { 'error': 'Error happend when deleting files from OSS ' + err };
        }
        return result;
    }

    // Delete single image and its reference from OSS
    async deletePic(objKey, url) {
        const { ctx } = this;
        let result;
        try{
            await ctx.oss.delete(objKey);
            result = await ctx.model.Product.update({},
                { $pull: { picObjKey: objKey, picUrl: url } },
                { multi: true, new: true });
        } catch(err) {
            throw { 'error': 'Error happend when deleting single file ' + err };
        }
        return result;
    }

    // Delete single image's reference on MongoDB
    // async deleteRef(objKey, url) {
    //     const { ctx } = this;
    //     let result;
    //     try {
    //         ctx.model.Product.update({},
    //             { $pull: { picObjKey: objKey, picUrl: url } },
    //             { multi: true, new: true });
    //     } catch (err) {
    //         throw { 'error': 'Error happend when deleting reference from MongoDB ' + err };
    //     }
    // }


    // Index product
    async index(query) {
        const { ctx } = this;
        // Compose mongodb query
        Object.keys(query).map((key, index) => {
            query[key] = { $regex: new RegExp(query[key], 'i') };
        });
        const product = await ctx.model.Product.find(query);

        if (!product) {
            ctx.throw(404, 'brand not found');
        }
        return product;
    }


    // Handle/Save multipart stream
    async multiHandle() {
        const { ctx } = this;
        const parts = ctx.multipart();
        let part;
        let payload = {
            'picUrl': [],
            'picObjKey': []

        };
        let urlList = [];
        let objKeyList = [];
        let i = 0;
        while ((part = await parts()) != null) {

            //console.log('part length => ' + JSON.stringify(part, null, 4));
            if (part.length) {
                // arrays are busboy fields
                console.log('field: ' + part[0]);
                console.log('value: ' + part[1]);
                console.log('valueTruncated: ' + part[2]);
                console.log('fieldnameTruncated: ' + part[3]);
                payload[part[0]] = part[1];
            } else {
                // Otherwise, it's a stream
                if (!part.filename) {
                    // user click `upload` before choose a file,
                    // `part` will be file stream, but `part.filename` is empty
                    // must handler this, such as log error.
                    return;
                }
                // otherwise, it's a stream
                console.log('field: ' + part.fieldname);
                console.log('filename: ' + part.filename);
                console.log('encoding: ' + part.encoding);
                console.log('mime: ' + part.mime);
                let result;
                let name = prodImgPath + encodeURIComponent(part.filename);
                console.log('name => ' + name);
                try {
                    result = await ctx.oss.put(name, part);
                } catch (err) {
                    await sendToWormhole(part);
                    throw err;
                }
                // Add Url/ObjKey to payload
                payload['picUrl'].push(result['url']);
                payload['picObjKey'].push(result['name']);
                //     let attr1 = {
                //         'name': 'size',
                //         'value': ['s1','s2','s3']
                // }
                //     payload['attributes'].push(attr1); 
                console.log(result);
            }


        }

        return payload;
    }

    // Common use
    async find(id) {
        const { ctx } = this;
        return ctx.model.Product.findById(id);
    }
}

module.exports = ProductService;