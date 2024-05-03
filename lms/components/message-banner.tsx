"use client";

import toast from "react-hot-toast";

export const MessageBanner = ({message}:{message:string}) => {
    // if(message){
    // }
    toast(message);
  return (
    <div>MessageBanner</div>
  )
}
