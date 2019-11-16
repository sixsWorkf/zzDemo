// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// cloud.init({
//   env: 'colud-env-6c8ic',
//   traceUser: true,
// })

const db = cloud.database();
const log = cloud.logger();


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  await db.collection('books').add({
    data:{
      name: '飞鸟集',
      author:'泰戈尔',
      price:'30.0'
    }
  });
  // log.info({
  //   name: callDB,
  //   db:db
  // });
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  return db.collection('books').where({
    // price: $.lt(30)
    author: 'zz'
  }).get();
  // try {
  //   return db.collection('books').where({
  //     // price: $.lt(30)
  //     author: 'zz'
  //   }).get()
  // } catch (e) {
  //   console.error(e)
  // }

}