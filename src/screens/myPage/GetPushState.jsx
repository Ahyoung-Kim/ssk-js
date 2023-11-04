import React from "react";
import client from "../../config/axios";

async function GetPushState() {
  let isAlarmOn = false;
  try {
    const ret = await client.get(`/api/fcm/alarm`);
    if (ret.status == 200) {
      isAlarmOn = ret.data.isAlarmOn;
    }
  } catch (err) {
    console.log("get alarm state error: ", err);
  }
  return isAlarmOn;
}
export default GetPushState;
