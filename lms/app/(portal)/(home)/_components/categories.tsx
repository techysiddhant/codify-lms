"use client";
import {
	FcEngineering,
	FcFilmReel,
	FcMultipleDevices,
	FcMusic,
	FcOldTimeCamera,
	FcSalesPerformance,
	FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { Category } from "@prisma/client";
import { CategoryItem } from "./category-item";
import getCategories from "@/actions/getCategories";

interface CategoriesProps {
	items: Category[];
}
interface CategoryItem {
	id: String;
	name: String;
}
const iconMap: Record<Category["name"], IconType> = {
	Music: FcMusic,
	Photography: FcOldTimeCamera,
	Fitness: FcSportsMode,
	Accounting: FcSalesPerformance,
	"Computer Science": FcMultipleDevices,
	Filming: FcFilmReel,
	Engineering: FcEngineering,
};
export const Categories = ({ items = [] }: CategoriesProps) => {
	// const response = await axios.get("/api/categories");
	// 	console.log(response);
	// const categories = await getCategories();
	console.log(items);
	return (
		<div className="flex items-center gap-x-2 overflow-x-auto pb-2">
			{items?.map((item) => (
				<CategoryItem
					key={item.id}
					label={item.name}
					icon={iconMap[item.name]}
					value={item.id}
				/>
			))}
		</div>
	);
};
