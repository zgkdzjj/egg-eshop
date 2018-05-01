'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;


  // Load passport
  // app.passport.mount('github');
  router.get('/', controller.home.index);
  router.resources('categories', '/api/categories', controller.categories);
  router.delete('/api/categories', controller.categories.destroy);
  // // router.get()
  router.delete('/api/user',controller.user.removes);
  router.resources('user','/api/user', controller.user);
  router.get('/api/user',controller.user.index);
  // userAccess
  router.post('/api/user/access/login', controller.userAccess.login);
  router.get('/api/user/access/current', app.jwt,controller.userAccess.getCurrentUser);
  router.get('/api/user/access/logout', controller.userAccess.logout);
  router.put('/api/user/access/resetPsw', app.jwt,controller.userAccess.resetPsw);
  router.put('/api/user/access/edit', app.jwt, controller.userAccess.edit);

  

  // Brands
  router.resources('brand', '/api/brand', controller.brand);
  // router.get('/api/brand/search', controller.brand.search);

  // // products
  // router.resources('products','/api/products', controller.products);

  // // contacts
  // router.resources('contacts', '/api/contacts', controller.contacts);

  // // orders
  // router.resources('orders', '/api/orders', controller.orders);

  // // carts
  // router.resources('carts', '/api/carts', contoller.carts);

  // // shipment address
  // router.resources('shipment', '/api/shipment', contoller.shipment);

  // admin orders
  

  //
};
 