// 云函数入口文件
const cloud = require('wx-server-sdk');
const mysql = require('mysql2/promise');
cloud.init();


// 云函数入口函数
exports.main = async (event, context) => {
  const connection = await mysql.createConnection({
    host: 'db4free.net',
    user:'tencentcloud',
    database:'tencentcloud',
    password:'tencentcloud'
  });
  const [rows, fields] = await connection.execute('SELECT version();');
}