import { SearchInput } from "@/components/search-input";
import React from "react";
import { Categories } from "./_components/categories";
import { db } from "@/lib/db";
interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const HomePage = async ({ searchParams }: SearchProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        {/* <CoursesList searchParams={searchParams} /> */}
      </div>
    </>
  );
};

export default HomePage;
