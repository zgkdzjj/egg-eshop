// app/service/userAccess.js
'use strict'

const Service = require('egg').Service;

class UserAccessService extends Service {
    async login(payload) {
        console.log('login service called, payload => ' + payload.username);
        const { ctx, service } = this;
        const user  = await service.user.findByUsername(payload.username);
        if(!user){
            ctx.throw(404,'user not found');
        }
        let verifyPsw = await ctx.compare(payload.password, user.password);
        if(!verifyPsw) {
            ctx.throw(404,'wrong password');
        }
        return {token: await service.token.apply(user._id)};
    }
  
    async logout(){

    }

  /**
   * @feature Reset Password, only available when logged in
   * @param payload {Object} { oldPassword, password }
   * @return {Promise.<void>}
   */
    async resetPsw(payload) {
        const { ctx, service } = this;
        const _id = ctx.state.user.data._id;
        const user = await service.user.find(_id);
        if(!user) {
            ctx.throw(404,'user not found');
        }
        let verifyPsw = await ctx.compare(payload.oldPassword, user.password);
        if(!verifyPsw) {
            ctx.throw(404, 'wrong password');
        } else {
            payload.password = await ctx.genHash(payload.password);
            console.log('updated payload => ' + JSON.stringify(payload,null,4));
            return service.user.update(_id, payload);
        }
    }

    // Get current user info
    async getCurrentUser(){
        const { ctx, service } = this;
        const _id = ctx.state.user.data._id;
        const user = await service.user.find(_id);
        if(!user) {
            ctx.throw(404, 'user not found');
        } else {
            return user;
        }
    }

    // Edit current user info
    async edit(payload){
        const { ctx, service } = this;
        const _id = ctx.state.user.data._id;
        return service.user.update(_id, payload);
    }
    
}

module.exports = UserAccessService;