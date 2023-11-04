import React from "react";
import client from "../../config/axios";

async function FetchNotifications() {
  let payload = null;

  try {
    const ret = await client.get(`/api/fcm/push/list`);
    if (ret.status == 200) {
      payload = ret.data;
    }
  } catch (err) {
    console.log("get notifications error: ", err);
    const status = err?.response?.status;
  }
  return payload.pushList;
}
export default FetchNotifications;
