// 云函数入口文件
const cloud = require('wx-server-sdk');
const tenpay = require('tenpay');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const config = {
    appid: '',
    mchid: '',
    partnerKey: '',
    pfx: require('fs').readFileSync('证书文件路径'),
    notify_url: '支付回调网址',
    spbill_create_ip: 'IP地址'
  };
  const api = new tenpay(config);

}