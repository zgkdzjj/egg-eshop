'use strict'
// app/controller.brand.js
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

const logoPath = 'egg-eshop/brand/logo/';

class BrandController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.BrandCreateTransfer = {
            // name, status
            name: { type: 'string', required: true, allowEmpty: false },
            status: { type: 'string', required: true, allowEmpty: false }
        }
        this.BrandUpdateTransfer = this.BrandCreateTransfer;
    }

    // Create New Brand
    async create() {
        console.log('create brand called');
        const { ctx, service } = this;
        const parts = ctx.multipart();
        let part;
        let payload = {};
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
                console.log('field1: ' + part.fieldname);
                console.log('filename1: ' + part.filename);
                console.log('encoding1: ' + part.encoding);
                console.log('mime1: ' + part.mime);
                let result;
                let name = logoPath + encodeURIComponent(payload['name']) +
                    path.extname(part.filename).toLowerCase();
                try {
                    result = await ctx.oss.put(name, part);
                } catch (err) {
                    await sendToWormhole(part);
                    throw err;
                }
                // Add logoUrl/logoObjKey to payload
                payload['logoUrl'] = result['url'];
                payload['logoObjKey'] = result['name'];
                console.log(result);
            }
        }
        const res = await service.brand.create(payload);
        console.log('and we are done parsing the form!');
        // Set Response
        ctx.status = 201;
        ctx.helper.success({ ctx, res });
    }





    // Delete a brand 
    async destroy() {
        console.log('destroy brand called');
        const { ctx, service } = this;
        const { id } = ctx.params;
        console.log('delete id => ' + id);
        await service.brand.destroy(id);

        // DELETE Successfully
        ctx.status = 204;
        ctx.helper.success({ ctx });
    }

    // Update a brand 
    async update() {
        console.log('update brand called');
        const { ctx, service } = this;

        const { id } = ctx.params;
        const parts = ctx.multipart();

        let part;
        let payload = {};
        while((part = await parts()) != null) {
            console.log('part => ' + part);
            if (part.length) {
                payload[part[0]] = part[1];
            } else {
                if(!part.filename) return;
                const name = logoPath + encodeURIComponent(payload['name']) +
                path.extname(part.filename).toLowerCase();
                let result;
                try {
                    result = await ctx.oss.put(name, part);
                    payload['logoUrl'] = result['url'];
                    payload['logoObjKey'] = result['name'];

                } catch(error) {
                    await sendToWormhole(part);
                    throw error;
                }
            }
        }           
        const res = await service.brand.update(id, payload);
        ctx.status = 201;
        ctx.helper.success({ ctx, res });
    }

    // Get A Brand 
    async show() {
        console.log('show a brand called');
        const { ctx, service } = this;
        const { id } = ctx.params;
        const res = await service.brand.show(id);
        ctx.helper.success({ ctx, res });
    }

    // Query Brand
    async index() {
        console.log('index brand called');
        const { ctx, service } = this;
        const query = ctx.request.query;
        console.log('query => ' + JSON.stringify(query, null, 4));
        const res = await service.brand.index(query);
        ctx.helper.success({ ctx, res });
    }

    // Delete Brand By id[]
    async remove() {
        console.log('remove brand called');
        const { ctx, service } = this;
        const { id } = ctx.request.body || {};
        const payload = id.split(',') || [];
        const res = await service.brand.remove(payload);
        ctx.helper.success({ ctx });
    }


}

module.exports = BrandController;


// {"name": "size","value": ['s1','s2','s3']}         
