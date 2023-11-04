import React from "react";
import client from "../../config/axios";

async function SetPushState(isAccepted) {
  try {
    const ret = await client.patch(`/api/fcm/alarm`, {'isAlarmOn':isAccepted});
  } catch (err) {
    console.log("set alarm state error: ", err);
  }
  return null;
}
export default SetPushState;
