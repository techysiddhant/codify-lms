import { SearchInput } from "@/components/search-input";
import { Categories } from "./_components/categories";
import {
	fetchCategories,
	fetchCourses,
	fetchCoursesWithUserId,
} from "@/actions/user.actions";
import { getServerSession } from "next-auth/next";
import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CoursesList } from "@/components/courses-list";
import { MessageBanner } from "@/components/message-banner";
import { Category, Course, Creator } from "@prisma/client";
interface SearchProps {
	searchParams: {
		title: string;
		categoryId: string;
		message: string;
	};
}

const HomePage = async ({ searchParams }: SearchProps) => {
	const session: CustomSession | null = await getServerSession(authOptions);
	const user = session?.user;
	let courses = [];
	const categories = await fetchCategories();
	if (user) {
		courses = await fetchCoursesWithUserId({
			userId: user?.id!,
			...searchParams,
		});
	} else {
		courses = await fetchCourses({ ...searchParams });
	}
	return (
		<>
			{searchParams.message && <MessageBanner message={searchParams?.message!} />}
			<div className="px-6 pt-6 md:hidden md:mb-0 block">
				<SearchInput />
			</div>
			<div className="p-6 space-y-4 bg-primary-foreground ">
				<Categories items={categories ? categories : []} />
				<CoursesList items={courses} />
			</div>
		</>
	);
};

export default HomePage;
