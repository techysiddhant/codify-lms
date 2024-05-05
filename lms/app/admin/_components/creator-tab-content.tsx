import { getUnApproveCreators } from "@/actions/admin.actions";
import { CreatorDataTable } from "./creator-data-table";
import { creatorColumns } from "./creator-column";

export default async function CreatorTabContent() {
	const creators = await getUnApproveCreators();
	// console.log(creators);
	return (
		<div>
			<CreatorDataTable
				data={creators!}
				columns={creatorColumns}
			/>
		</div>
	);
}
