import { getDraftCourseByCourseId } from "@/actions/creator.actions"
import { CourseEnrollButton } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-enroll-button"
import { CourseButton } from "@/app/(portal)/course/[courseId]/_components/course-button"
import { Banner } from "@/components/banner"
import { Preview } from "@/components/preview"
import { formatDate } from "@/lib/format"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const DraftCoursePage = async ({ params,
}: {
    params: { courseId: string };
}) => {
    const course = await getDraftCourseByCourseId({ courseId: params?.courseId });
    return (
        <>
            <Banner label="This is a Draft view of the Course Details Page For Creator Only." />
            <div className="p-2">
            <Link
                href={`/creator/courses/${params?.courseId}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
            </Link>
            </div>
            <div className="h-full w-full flex flex-col  px-6 gap-4">
                <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                    <div className="p-4 space-y-2 w-full md:w-[50%]">
                        <h1 className="text-4xl font-bold tracking-wider capitalize">{course?.title}</h1>
                        <h2 className="text-2xl font-medium">{course?.shortDescription}</h2>
                        <h3 className="text-lg font-medium">Category : <span className="bg-primary text-secondary p-1 text-sm rounded">{course?.category?.name}</span></h3>
                        <p>createdBy :</p>
                        <p>Last updated {formatDate(course?.updatedAt!)}</p>
                        <div className="flex flex-col gap-4">
                            <CourseButton id={course?.id!} />
                            <CourseEnrollButton courseId={course?.id!} price={course?.price!} />
                        </div>
                    </div>
                    <div className="relative aspect-video mt-2 w-full md:w-[50%]">
                        <Image
                            alt="image"
                            fill
                            className="object-cover rounded-md"
                            src={course?.imageUrl!}
                        />
                    </div>
                </div>
                <div className="w-full h-full  bg-secondary rounded p-2">
                    <h1 className="text-2xl font-bold tracking-wider capitalize text-left">Course Details</h1>
                    <div className="">
                        <Preview value={course?.description!} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DraftCoursePage