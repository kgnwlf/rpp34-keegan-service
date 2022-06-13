const routes = require('../routes');
const request = require('supertest');

describe('GET Routes', () => {
  test('Get all questions for a product id', async () => {
    const res = await request(routes).get('/qa/questions?product_id=13')

    expect(res.status).toEqual(200);
    expect(res._body.results[0].answers['124'].photos.url).not.toBeNull();

  });

  test('Get all answers for a question id', async () => {
    const res = await request(routes).get('/qa/questions/79/answers');


    expect(res.status).toEqual(200);
    expect(res._body['157'].photos.url).not.toBeNull();

  });

});

describe('POST Routes', () => {
  test('Posts a question', async () => {
    const res = await request(routes).post('/qa/questions').send({
      "body": "I wanna be a cowboy baby",
      "name": "Yeehaw Cowboy",
      "email": "aintnocityslicker@thegreatoutdoors.com",
      "product_id": 64620
    });

    expect(res.status).toEqual(201);

  });

  test('Posts an answer', async () => {
    const res = await request(routes).post('/qa/questions/3/answers').send({
      "body": "I want to be a cowboy too!",
      "name": "City Slicker",
      "email": "justacityslickeer@wantthegreatoutdoors.com",
      "product_id": 64620
    });

    expect(res.status).toEqual(201);

  });

});

describe('PUT Routes', () => {
  test('Marks a question helpful', async () => {
    const res = await request(routes).put('/qa/questions/3/helpful');

    expect(res.status).toEqual(204);

  });

  test('Marks an answer helpful', async () => {
    const res = await request(routes).put('/qa/answers/3/helpful');

    expect(res.status).toEqual(204);
  });

  test('Reports a question', async () => {
    const res = await request(routes).put('/qa/questions/4/report');

    expect(res.status).toEqual(204);

  });

  test('Reports an answer', async () => {
    const res = await request(routes).put('/qa/answers/4/report');

    expect(res.status).toEqual(204);

  });

});
