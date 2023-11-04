import React from "react";
import client from "../../config/axios";

async function ReadNotifications() {
  try {
    const ret = await client.get(`/api/fcm/read`);
  } catch (err) {
    console.log("read notifications error: ", err);
  }
  return null;
}
export default ReadNotifications;
