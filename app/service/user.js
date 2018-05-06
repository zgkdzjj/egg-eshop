'use strict'
// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
    // Create a user
    async create(payload){
        const { ctx } = this;
        payload.password = await this.ctx.genHash(payload.password);
        return ctx.model.User.create(payload);
    }
    
    // Destroy a user
    async destroy(_id) {
        const { ctx, service} = this;
        const user = await service.user.find(_id);
        if(!user) {
            ctx.throw(404, 'user not found');
        }
        return ctx.model.User.findByIdAndRemove(_id);
    }

    // Update a user
    async update(_id, payload) {
        const { ctx, service } = this;
        const user = await service.user.find(_id);
        if(!user) {
            ctx.throw(404, 'user not found');
        }
        return ctx.model.User.findByIdAndUpdate(_id, payload, {new: true});
    }
    
    // Get a user
    async show(_id) {
        const { ctx, service } = this;
        const user = await service.user.find(_id);
        if(!user) {
            ctx.throw(404,'user not found');
        }
        return ctx.model.User.findById(_id);
    }

    // Index
    async index(payload){
        const { ctx, service } = this;
        return await ctx.model.User.find(payload);
    }

    // Remove a user (optional)
    async removes(payload){
        const { ctx } = this;
        console.log('payload2 => ' + payload);
        return ctx.model.User.remove({_id: { $in: payload}});
    }


    // Common 
    async find(id) {
        return this.ctx.model.User.findById(id);
    }

    async findByUsername(username) {
        return this.ctx.model.User.findOne({username: username});
    }

   

}

module.exports = UserService;