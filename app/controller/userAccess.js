'use strict'
// app/controller/userAccess.js
const Controller = require('egg').Controller;

class UserAccessController extends Controller {

    constructor(ctx){
        super(ctx);
        this.UserLoginTransfer = {
            username: { type: 'string', required: true, allowEmpty: false },
            password: { type: 'string', required: true, allowEmpty: false }
        }
        this.UserResetPswTransfer = {
            oldPassword: { type: 'string', required: true, allowEmpty: false },
            password: { type: 'string', required: true, allowEmpty: false }
        }
        // this.UserInfoUpdateTransfter = {
        //     email: { type: 'string', required: true, allowEmpty: false },
        //     phone: 
        // }
    }

    // User Login
    async login() {
        console.log('login controller reached');
        const { ctx, service } = this;
        const payload = ctx.request.body || {};
        const res = await service.userAccess.login(payload);
        ctx.helper.success({ctx, res});
    }

    // User Logout
    async logout(){
        console.log('logout pressed');
    }

    // Reset password when logged in
    async resetPsw() {
        console.log('reset psw controller reached');
        const { ctx, service } = this;
        ctx.validate(this.UserResetPswTransfer);
        const payload = ctx.request.body || {};
        const res = await service.userAccess.resetPsw(payload);
        ctx.helper.success({ ctx, res });
    }

    // Get current user info
    async getCurrentUser() {
        const { ctx, service } = this;
        const res =  await service.userAccess.getCurrentUser();
        ctx.helper.success({ctx, res});
    }

    // Edit Self
    async edit() {
        const { ctx, service } = this;
        const payload = ctx.request.body || {};
        const res =  await service.userAccess.edit(payload);
        ctx.helper.success({ ctx, res });
    }

    // Edit Avatar
    

}

module.exports = UserAccessController;