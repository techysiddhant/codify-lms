import ChapterIdPageComp from "./_components/ChapterIdPageComp";
const ChapterIdPage = ({ params }) => {
	console.log(params);
	return (
		<ChapterIdPageComp
			courseId={params?.courseId}
			chapterId={params?.chapterId}
		/>
	);
};

export default ChapterIdPage;
