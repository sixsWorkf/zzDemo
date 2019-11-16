// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const {
  WXMINIUser,
  WXMINIMessage
} = require('wx-js-utils');

const appId = 'wx35397e405485366a'; // 小程序 appId
const secret = '0423fe6695ff846524ff5c6f4ce0b8e7'; // 小程序 secret
const template_id = '2ZGMqXHvjXG4nPUgCt3iNzQQPStCEpIZU1s706m5AdU'; // 小程序模板消息模板 id

const db = cloud.database();
const todos = db.collection('todos');

var mtask;

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  // 获取 access_token
  let wXMINIUser = new WXMINIUser({
    appId,
    secret
  });

  let access_token = await wXMINIUser.getAccessToken();

  const touser = wxContext.OPENID; // 小程序用户 openId，从用户端传过来，指明发送消息的用户
  const form_id = event.formId; // 小程序表单的 form_id，或者是小程序微信支付的 prepay_id

  mtask = await todos.doc(event.taskId).get();
  // 发送模板消息
  let wXMINIMessage = new WXMINIMessage();
  let result = await wXMINIMessage.sendMessage({
    access_token,
    touser,
    form_id,
    template_id,
    data: {
      keyword1: {
        value: mtask.data._id // keyword1 的值
      },
      keyword2: {
        value: mtask.data.title // keyword2 的值
      },
      keyword3:{
        value: 'time'
      },
      keyword4:{
        value: "mtask.data.location.name"
      }
    },
    page: "pages/todoinfo/todoinfo?id={{mtask.data._id}}" // 点击模板消息后，跳转的页面
  });
  return result;
}