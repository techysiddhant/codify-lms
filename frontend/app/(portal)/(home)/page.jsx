import SearchInput from "../_components/search-input";

const HomePage = ({ title }) => {
	return (
		<>
			<div className="px-6 pt-6 md:hidden md:mb-0 block">
				<SearchInput />
			</div>
		</>
	);
};

export default HomePage;
