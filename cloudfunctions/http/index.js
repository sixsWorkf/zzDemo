// 云函数入口文件
const cloud = require('wx-server-sdk');
const got = require('got');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try{
    const response = await got('https://wechat.com');
    console.log(response.body);
  }catch(err){
    console.log(err.response.body);
  }
}