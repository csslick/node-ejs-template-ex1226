const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

let products = []; // db 저장할 변수

// DB 파일 불러오기
const readfile = fs.readFileSync('db.json', 'utf-8');
const jsonData = JSON.parse(readfile);
products = [...jsonData]
console.log(products);
const admin = {
  id: 'admin',
  pwd: '1234'
}

// ejs를 view 엔진으로 설정
app.set('view engine', 'ejs');

// 정적파일 경로 지정
app.use(express.static("public"));

// home
app.get('/', function(요청, 응답){
  응답.render('pages/index.ejs', { id : admin.id})
})

// about
app.get('/about', function(req, res) {
  res.render('pages/about.ejs', {admin})
})

// product
app.get('/product', function(req, res) {
  res.render('pages/product.ejs', {products, admin})
})

// admin
app.get('/admin', function(req, res) {
  res.render('pages/admin.ejs' , {
    title: "관리자 페이지",
    id: admin.id
  })
})

// download
app.get('/download', function(req, res) {
  // res.send('download')
  const file = 'db.json'
  res.download(file)
})

// login page
app.get('/login', function(req, res) {
  res.render('pages/login.ejs', { id: admin.id})
})


// login check
app.post('/login-check', function(req, res) {
  const id = req.body.id;
  const pwd = req.body.pwd;
  console.log(`id: ${id}, pwd: ${pwd}`)
  // 로그인 성공시 홈으로
  if(id == admin.id && pwd == admin.pwd) {
    res.render('pages/index.ejs', { 
      id: admin.id, 
      login: true
    });
  } else {
    res.render('pages/login.ejs', { 
      id: admin.id, 
      login: 'fail'
    });
  }

})

const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`)
})