const bodyParser = require('body-parser');
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        app.use(bodyParser.json());
        // 中间件
        app.use(function (req, res, next) {
          if (/^\/api/.test(req.path)) {
            if (req.headers.token || req.path == '/api/login') {
              next();
            } else {
              res.sendStatus(401);
            }
          } else {
            next();
          }
        });
        app.get("/api/goods", function (req, res) {
          function* IdGenerator() {
            let id = 0;
            while (true) {
              yield id++;
            }
          }
          const idGenerator = IdGenerator();
          res.json({
            code: 0,
            list: [
              { id: idGenerator.next().value, text: "Java架构师", price: 200 },
              { id: idGenerator.next().value, text: "前端架构师", price: 20000 },
              { id: idGenerator.next().value, text: "PHP架构师", price: 100 }
            ]
          });
        });
        app.post("/api/login", function (req, res) {
          const { username, password } = req.body;
          if (username == 'bob' && password == '123') {
            res.json({
              code: 0,
              token: 'jilei'
            });
          } else {
            res.json({
              code: 1,
              message: '用户名或密码错误'
            });
          }
        });
        app.get("/api/logout", function (req, res) {
          res.json({
            code: -1,
          });
        });
      }
    }
  }
}
