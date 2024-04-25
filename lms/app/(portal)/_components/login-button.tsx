"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
export const LoginButton = () => {
    const onSubmit = async()=>{
        const result = await signIn('google', { callbackUrl : "http://localhost:3000"})
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Sign In</DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you&apos;re done. */}
          </DialogDescription>
        </DialogHeader>
        <div>
            <Button onClick={onSubmit} variant="outline" className="w-full border border-gray-600 text-xl flex justify-center items-center gap-4">
             <span>Continue with</span> <FcGoogle className="block text-2xl" />
            </Button>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
