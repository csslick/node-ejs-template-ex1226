const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');

let products = []; // db 저장할 변수

// DB 파일 불러오기
const readfile = fs.readFileSync('db.json', 'utf-8');
const jsonData = JSON.parse(readfile);
products = [...jsonData]
console.log(products);

// ejs를 view 엔진으로 설정
app.set('view engine', 'ejs');

// 정적파일 경로 지정
app.use(express.static("public"));

// home
app.get('/', function(요청, 응답){
  응답.render('pages/index.ejs')
})

// about
app.get('/about', function(req, res) {
  res.render('pages/about.ejs')
})

// product
app.get('/product', function(req, res) {
  res.render('pages/product.ejs', {products})
})

// admin
app.get('/admin', function(req, res) {
  res.render('pages/admin.ejs' , {
    title: "관리자 페이지"
  })
})


const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`)
})