'use strict';
const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/categories.test.js', () => {

  // Test Get ALL categories
  it('should GET /api/categories 200', async function() {
    app.mockService('categories', 'index', () => {
      return [
        {
          name: 'name123',
          status: 'available',
        },
      ];
    });
    await app.httpRequest()
      .get('/api/categories')
      .expect(200)
      .expect({
        code: 0,
        data: [{ name: 'name123', status: 'available' }],
        msg: 'Your request was successful',
      });
  });

  // Test get single category (not found)
  it('should GET /api/categories/:id 404', async function() {
    const err = new Error('category not found');
    err.status = 404;
    app.mockService('categories', 'show', err);
    console.log('err 404 => ' + JSON.stringify(err, null, 4));
    await app.httpRequest()
      .get('/api/categories/123')
      .expect(404)
      .expect('{"error":"category not found"}');
  });

  // Test get single category (good)
  it('should GET /api/categories/:id 200', async function() {
    app.mockService('categories', 'show', () => {
      return {
        _id: '5a9de3fc61f4c695d78f4c9b',
        name: 'admin12',
        status: 'available',
        __v: 0,
      };
    });
    await app.httpRequest()
      .get('/api/categories/123')
      .expect(200)
      .expect({
        code: 0,
        data: {
          _id: '5a9de3fc61f4c695d78f4c9b',
          name: 'admin12', status: 'available',
          __v: 0,
        },
        msg: 'Your request was successful',
      });
    // console.log('test res => ' + JSON.stringify(res, null, 4));

  });


  // test invalid request
  it('should POST /api/categories 422', async function() {
    app.mockCsrf();
    await app.httpRequest()
      .post('/api/categories')
      .send({
        accesstoken: '123',
        name: 'food',
      })
      .expect(422)
      .expect({
        error: 'Validation Failed',
        detail: [
          { message: 'required', field: 'status', code: 'missing_field' },
        ],
      });
    // console.log('test res 422=> ' + JSON.stringify(res, null, 4));
  });

  // Test a good POST request
  it('should POST /api/categories 201', async function() {
    app.mockCsrf();
    app.mockService('categories', 'create', () => {
      return {
        __v: 0,
        name: 'sports',
        status: 'unavailabl',
        _id: '5aa61f0df4ca610261ad877d',
      };
    });
    const res = await app.httpRequest()
      .post('/api/categories')
      .send({
        accesstoken: '123',
        name: 'food',
        status: 'available',
      })
      .expect(201)
      .expect({
        code: 0,
        data:
         { __v: 0,
           name: 'sports',
           status: 'unavailabl',
           _id: '5aa61f0df4ca610261ad877d',
         },
        msg: 'Your request was successful',
      });
    console.log('res 201 => ' + JSON.stringify(res.body.data, null, 4));
    assert.deepEqual(res.body.data, { __v: 0,
      name: 'sports',
      status: 'unavailabl',
      _id: '5aa61f0df4ca610261ad877d',
    });
  });

  // Test a delete request
  it('should DELETE /api/categories/:id 204', async function() {
    app.mockCsrf();
    app.mockService('categories', 'destroy');
    await app.httpRequest()
      .delete('/api/categories/123')
      .expect(204);
    // console.log('res 204 => ' + JSON.stringify(res, null, 4));
  });

  it('should DELETE /api/categories/:id 404', async function() {
    const err = new Error('category not found');
    err.status = 404;
    app.mockCsrf();
    app.mockServiceError('categories', 'destroy', err);
    await app.httpRequest()
      .delete('/api/categories/123')
      .expect(404)
      .expect({ error: 'category not found' });
  });

  // Test update a request
  it('should PUT /api/categories/:id 201', async function() {
    app.mockCsrf();
    app.mockService('categories', 'update', () => {
      return {
        _id: '5aa656914f5a4b09352e882a',
        name: 'foodfood',
        status: 'available',
        __v: 0,
      };
    });
    await app.httpRequest()
      .put('/api/categories/123')
      .send({
        accesstoken: '123',
        name: 'foodfood',
        status: 'available',
      })
      .expect(201);
  });

  it('should PUT /api/categories/:id 404', async function() {
    app.mockCsrf();
    const err = new Error('categort not found');
    err.status = 404;
    app.mockServiceError('categories', 'update', err);
    await app.httpRequest()
      .put('/api/categories/123')
      .send({
        accesstoken: '123',
        name: 'foodfood',
        status: 'available',
      })
      .expect(404);
  });

});
