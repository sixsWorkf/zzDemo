// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const todos = db.collection('todos');

exports.main = async (event, context) => {
  // 1.筛选所有未完成的数据
  let date = new Date();
  let day = date.getDay();
  let mouth = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getUTCHours();    // 小时有问题，可能是时区的原因
  let minute = date.getMinutes();
  let time = `${year}-${mouth}-${day} 8:${minute}`; //2019-10-14 00:00
  console.log(time)
  // return time;
  let tasks = await todos.where({
    status: 'in-progress',
    time:time
  }).get();
  // 2.执行数据的提醒
  console.log(tasks);
  for(i=0;i<tasks.data.length;i++){
    await cloud.callFunction({
      name: 'msgMe',
      data: {
        taskId: tasks.data[i]._id,
        formId: tasks.data[i].formId
      }
    }).then(res=>{
      console.log('solved');
    }).catch(err=>{
      console.log(err);
    });
  }
}