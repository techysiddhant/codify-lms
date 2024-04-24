"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignInPage = () => {
    const onSubmit = async()=>{
        const result = await signIn('google', { callbackUrl : "http://localhost:3000/"})
    }
  return (
    <div>
        <Button onClick={onSubmit}>Try Now</Button>
    </div>
  )
}

export default SignInPage