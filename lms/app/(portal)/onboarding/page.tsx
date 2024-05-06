import { getCreatorProfileByEmail, getCreatorProfileById } from "@/actions/creator.actions";
import { CreatorOnBoardingForm } from "@/components/creator-form";
import { Creator } from "@prisma/client";
interface SearchProps {
	searchParams: {
		id?: string;
		email?:string;
	};
}
const CreatorOnBoardingPage = async ({ searchParams }: SearchProps) => {
	let profileData: Creator | null = null;
	if (searchParams && searchParams.id) {
		profileData = await getCreatorProfileById(searchParams.id!);
	}else if(searchParams && searchParams.email){
		profileData = await getCreatorProfileByEmail(searchParams.email!)
	}
	return (
		<div>
			<CreatorOnBoardingForm profileData={profileData!} />
		</div>
	);
};

export default CreatorOnBoardingPage;
