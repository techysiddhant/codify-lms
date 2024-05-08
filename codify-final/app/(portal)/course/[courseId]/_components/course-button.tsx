"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link"
import toast from "react-hot-toast";

export const CourseButton = ({id}:{id:string})=>{
    const {data:session} = useSession();
    console.log(session);
    const onCheck = ()=>{
        if(session){
          // router.push(`/courses/${id}`)
        }else{
          toast.error("Sign In First!");
        }
      }
    return(
        <>
        {
            session ? <Button asChild variant={'secondary'}>
                <Link href={`/courses/${id}`}>Check out course chapters</Link>
            </Button> : <Button onClick={onCheck} variant={'secondary'}>Check out chapters</Button>
        }
        </>
        
    )
}