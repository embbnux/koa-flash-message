import { expect } from 'chai';

import Koa from 'koa';
import convert from 'koa-convert';
import session from 'koa-generic-session';
import supertest from 'supertest';

import flashMessage from '../'

describe('FlashMessage Integration Test', () => {
  it('read empty flash messages', function (done) {
    const app = new Koa();
    app.keys = [ 'a', 'b' ];
    app.use(convert(session()));
    app.use(flashMessage);
    app.use((ctx, next) => {
      if (!([ 'GET', 'POST' ].includes(ctx.method)))
        return next();
      if (ctx.method === 'GET') {
        ctx.body = ctx.flashMessage.messages;
        return;
      }
      ctx.flashMessage.warning = 'warning test';
      ctx.body = 'OK';
    });
    const request = supertest.agent(app.listen());
    request.get('/')
           .expect({})
           .end(done);
  });

  it('read warning flash message', function (done) {
    const app = new Koa();
    app.keys = [ 'a', 'b' ];
    app.use(convert(session()));
    app.use(flashMessage);
    app.use((ctx, next) => {
      if (!([ 'GET', 'POST' ].includes(ctx.method)))
        return next();
      if (ctx.method === 'GET') {
        ctx.body = ctx.flashMessage.messages;
        return;
      }
      ctx.flashMessage.warning = 'warning test';
      ctx.body = 'OK';
    });
    const request = supertest.agent(app.listen());
    request.post('/')
           .expect(200)
           .end(() => {
             request.get('/')
               .expect({ warning: 'warning test' })
               .end(done);
           });
  });

  it('read empty flash messages after read once', function (done) {
    const app = new Koa();
    app.keys = [ 'a', 'b' ];
    app.use(convert(session()));
    app.use(flashMessage);
    app.use((ctx, next) => {
      if (!([ 'GET', 'POST' ].includes(ctx.method)))
        return next();
      if (ctx.method === 'GET') {
        ctx.body = ctx.flashMessage.messages;
        return;
      }
      ctx.flashMessage.warning = 'warning test';
      ctx.body = 'OK';
    });
    const request = supertest.agent(app.listen());
    request.post('/')
           .expect(200)
           .end(() => {
             request.get('/')
               .expect({ warning: 'warning test' })
               .end(() => {
                 request.get('/')
                   .expect({})
                   .end(done);
               });
           });
  });

  it('return empty flash messages when session is null', function (done) {
    const app = new Koa();
    app.keys = [ 'a', 'b' ];
    app.use(flashMessage);
    app.use((ctx, next) => {
      if (!([ 'GET', 'POST' ].includes(ctx.method)))
        return next();
      if (ctx.method === 'GET') {
        ctx.body = ctx.flashMessage.messages;
        return;
      }
      ctx.flashMessage.warning = 'warning test';
      ctx.body = 'OK';
    });
    const request = supertest.agent(app.listen());
    request.post('/')
           .expect(200)
           .end(() => {
             request.get('/')
               .expect({})
               .end(done);
           });
  });
});