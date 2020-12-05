const bodyParser = require('body-parser');
const PUBLIC_PATH = ['/api/login', '/api/goods'];
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
            if (req.headers.token || PUBLIC_PATH.indexOf(req.path) != -1) {
              next();
            } else {
              res.sendStatus(401);
            }
          } else {
            next();
          }
        });
        app.get("/api/goods", function (req, res) {
          res.json({
            code: 0,
            slider: [
              {
                id: 21,
                img: '/img/01.jpg'
              },
              {
                id: 22,
                img: '/img/02.jpg'
              },
              {
                id: 23,
                img: '/img/03.jpg'
              },
              {
                id: 24,
                img: '/img/04.jpg'
              },
            ],
            data: {
              fe: [
                {
                  id: 1,
                  title: 'Vue2.x实战',
                  price: '100',
                  img: '/img/01.jpg',
                  count: 100
                },
              ],
              python: [
                {
                  id: 4,
                  title: 'python实战',
                  price: '100',
                  img: '/img/04.jpg',
                  count: 100
                },
                {
                  id: 5,
                  title: 'python基础',
                  price: '200',
                  img: '/img/05.jpg',
                  count: 100
                },
                {
                  id: 6,
                  title: 'python架构设计',
                  price: '300',
                  img: '/img/06.jpg',
                  count: 100
                },
              ],
              java: [
                {
                  id: 7,
                  title: 'java基础',
                  price: '100',
                  img: '/img/07.jpg',
                  count: 100
                },
                {
                  id: 8,
                  title: 'springmvc',
                  price: '200',
                  img: '/img/08.jpg',
                  count: 100
                },
                {
                  id: 9,
                  title: 'springboot',
                  price: '300',
                  img: '/img/09.jpg',
                  count: 100
                },
              ],
              bigdata: [
                {
                  id: 10,
                  title: '数据分析',
                  price: '100',
                  img: '/img/10.jpg',
                  count: 100
                },
                {
                  id: 11,
                  title: '图表构建',
                  price: '200',
                  img: '/img/11.jpg',
                  count: 100
                },
                {
                  id: 12,
                  title: '数据可视化',
                  price: '300',
                  img: '/img/12.jpg',
                  count: 100
                },
              ],
              ai: [
                {
                  id: 13,
                  title: '自动化编程',
                  price: '100',
                  img: '/img/13.jpg',
                  count: 100
                },
                {
                  id: 14,
                  title: '智能化家居',
                  price: '200',
                  img: '/img/14.jpg',
                  count: 100
                },
                {
                  id: 15,
                  title: '人工智能基础',
                  price: '300',
                  img: '/img/15.jpg',
                  count: 100
                },
              ],
            },
            keys: ['fe', 'python', 'java', 'bigdata', 'ai']
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
