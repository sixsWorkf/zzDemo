// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();
const flavour = db.collection('flavour');
const dishes = db.collection('dishOrder');
const _ = db.command;

exports.main = async (event, context) => {
  // console.log(event);
  if(event.type=='spicy'){
    await flavour.doc(event._id).update({
      data: {
        noSpicy: _.inc(event.inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  } else if (event.type == 'onion') {
    await flavour.doc(event._id).update({
      data: {
        noOnion: _.inc(event.inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  }else if(event.type == "addroom"){
    var  nok = 1;
    var roomid_;
    while (nok) {
      roomid_ = Math.floor(Math.random() * 10000).toString();
      console.roomid_;
      await flavour.where({roomid:roomid_}).count().then(res=>{
        console.log(res.total);
        if (res.total == 0) {
          nok = 0;
        }
      }).catch(res=>{
        console.log("count", res);
      });
    }
    await flavour.add({ data: { roomid: roomid_, noSpicy: 0, noOnion: 0 } }).then(res => {
      console.log('add successfully', res);
    }).catch(res => {
      console.log("add fail", res);
    });
    return roomid_;
  }
}