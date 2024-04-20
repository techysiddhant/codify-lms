import ChapterId from "./_components/ChapterId";

const ChapterIdPage = ({ params }) => {
	return (
		<>
			<ChapterId
				chapterId={params.chapterId}
				courseId={params.courseId}
			/>
		</>
	);
};

export default ChapterIdPage;
