'use strict'
// app/controller/user.js
const Controller = require('egg').Controller;

class UserController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.UserCreateTransfer = {
            // username, password, email, mobile
            username: { type: 'string', required: true, allowEmpty: false },
            password: { type: 'string', required: true, allowEmpty: false, min: 6},
            email: { type: 'string', required: true, allowEmpty: false },
            mobile: { type: 'string', required: true, allowEmpty: false },
            role: { type: 'string', required: true, allowEmpty: false }
        }
        this.UserUpdateTransfer  = {
            password: { type: 'string', required: true, allowEmpty: false, min: 6},
            email: { type: 'string', required: true, allowEmpty: false },
            mobile: { type: 'string', required: true, allowEmpty: false }
        }
      
    }

    // Create New User 
    async create() {
        console.log('Create called');
        const { ctx, service } = this;
        // Validate User Parameter
        ctx.validate(this.UserCreateTransfer);
        const payload = ctx.request.body || {};
        const res = await service.user.create(payload);
        ctx.helper.success({ctx, res});
    }

    // Delete A User
    async destroy() {
        console.log('Destroy called');
        const { ctx, service } = this;
        const { id } = ctx.params;
        await service.user.destroy(id);
        ctx.helper.success({ctx});
    }

    // Update A User 
    async update() {
        console.log('Update called');
        const { ctx, service } = this;
        ctx.validate(this.UserUpdateTransfer);
        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        const res = await service.user.update(id, payload);
        ctx.helper.success({ctx, res});
    }

    // Get A User
    async show(){
        console.log('Show called');
        const { ctx, service } = this;
        const { id } = ctx.params;
        const res = await service.user.show(id);
        ctx.helper.success({ctx, res});
    }
    // Query Users
    async index(){
        console.log('Index called');
        const { ctx, service } = this;
        const payload = ctx.query;
        const res = await service.user.index(payload);
        ctx.helper.success({ctx, res});
    }

    // Delete Users By id[]
    async removes() {
        console.log('Removes called');
        const { ctx, service } = this;
        const { id } = ctx.request.body;
        const payload = id.split(',') || [];
        console.log('payload => ' + payload);
        const res = await service.user.removes(payload);
        ctx.helper.success({ctx});
    }
}

module.exports = UserController;