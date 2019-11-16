// 云函数入口文件
const cloud = require('wx-server-sdk')
const {
  WXMINIUser,
  WXMINIQR
} = require('wx-js-utils');

cloud.init()

const appId = 'wx35397e405485366a'; // 小程序 appId
const secret = '0423fe6695ff846524ff5c6f4ce0b8e7'; // 小程序 secret

exports.main = async (event, context) => {

  // 获取小程序码，A接口
  let wXMINIUser = new WXMINIUser({
    appId,
    secret
  });

  // 一般需要先获取 access_token
  let access_token = await wXMINIUser.getAccessToken();
  let wXMINIQR = new WXMINIQR();
  let qrResult = await wXMINIQR.getQR({
    access_token,
    path:'pages/index/index'
  });

  return await cloud.uploadFile({
    cloudPath:'normalQr.png',
    fileContent:qrResult
  })
}