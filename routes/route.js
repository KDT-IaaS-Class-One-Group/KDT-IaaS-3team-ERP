// routes/route.js

const express = require('express');
const path = require('path');
const router = express.Router();

// 관리자 페이지
router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// 사용자 페이지
router.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user.html'));
});

// 로그인 페이지
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// 상품 페이지
router.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/product.html'));
});

module.exports = router;
