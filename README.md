# koa-flash-message

[![Build Status](https://travis-ci.org/embbnux/koa-flash-message.svg?branch=master)](https://travis-ci.org/embbnux/koa-flash-message)
[![codecov](https://codecov.io/gh/embbnux/koa-flash-message/branch/master/graph/badge.svg)](https://codecov.io/gh/embbnux/koa-flash-message)

Flash messages middleware for [koa](https://github.com/koajs/koa) v2 application.

## Installation

```
$ npm install koa-flash-message
```

koa-flash-message middleware depends on koa-generic-session. You must add koa-generic-session as a middleware prior to adding koa-flash-message

## Example

```
import Koa from 'koa';
import session from 'koa-generic-session';
import koaRedis from 'koa-redis';
import flashMessage from 'koa-flash-message';

const redisStore = koaRedis({
  url: config.redisUrl
});

const app = new Koa();

app.keys = [config.secretKeyBase];
app.use(convert(session({
  store: redisStore,
  prefix: '__sess:',
  key: '__sid'
})));

app.use(flashMessage);
```

### add message to flash messages

```
ctx.flashMessage.warning = 'Log Out Successfully!';
```

### read all flash messages

```
ctx.state.flashMessage.messages
// or ctx.flashMessage.messages
```

### read warning message

```
ctx.state.flashMessage.warning
// or ctx.flashMessage.warning
```

[Full Example Code](https://github.com/embbnux/kails/blob/master/app/index.js)

## Author

* [Embbnux Ji](https://www.embbnux.com)

## License

MIT
