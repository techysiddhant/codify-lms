import CoursesList from "@/components/courses-list";
import SearchInput from "../_components/search-input";
import Categories from "./_components/categories";

const HomePage = ({ searchParams }) => {
	return (
		<>
			<div className="px-6 pt-6 md:hidden md:mb-0 block">
				<SearchInput />
			</div>
			<div className="p-6 space-y-4">
				<Categories />
				<CoursesList searchParams={searchParams} />
			</div>
		</>
	);
};

export default HomePage;
