import { getCreatorProfileById } from "@/actions/creator.actions";
import { CreatorOnBoardingForm } from "@/components/creator-form";
import { Creator } from "@prisma/client";
interface SearchProps {
	searchParams: {
		id: string;
	};
}
const CreatorOnBoardingPage = async ({ searchParams }: SearchProps) => {
	console.log(searchParams);
	let profileData: Creator | null = null;
	if (searchParams && searchParams.id) {
		profileData = await getCreatorProfileById(searchParams.id!);
	}
	return (
		<div>
			<CreatorOnBoardingForm profileData={profileData!} />
		</div>
	);
};

export default CreatorOnBoardingPage;
