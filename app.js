/**
 * Created by huangjin on 16/7/23.
 */
const app = require('koa')();
const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const staticCache = require('koa-static-cache');

router.get('/', function *(){
    const file = fs.readFileSync('./dist/index.html', 'utf8');
    this.body = file;
});

app
    .use(router.routes())
    .use(router.allowedMethods());
app.use(staticCache('./dist', {
    maxAge: 60 * 60 * 24 * 365,
    gzip: true
}));
app.listen(3000);