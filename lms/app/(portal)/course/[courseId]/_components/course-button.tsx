import Link from "next/link"

export const CourseButton = ({id}:{id:string})=>{
    return(
        <Link href={`/courses/${id}`}>Check out course chapters</Link>
    )
}