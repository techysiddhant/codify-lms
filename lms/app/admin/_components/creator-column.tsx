"use client";

import { Creator } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCheck, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
const onApprove = async (id: string) => {
	try {
		await axios.patch("/api/onboarding", { id: id });
		toast.success("Creator Approved Successfully!");
	} catch (error) {
		toast.error("Something went wrong");
	}
};
export const creatorColumns: ColumnDef<Creator>[] = [
	{
		accessorKey: "displayName",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Display Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			// const price = parseFloat(row.getValue("price") || "0");
			// const formatted = new Intl.NumberFormat("en-IN", {
			// 	style: "currency",
			// 	currency: "INR",
			// }).format(price);

			return <div>{row.getValue("email")}</div>;
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const status = row.getValue("status");

			return <Badge variant={"destructive"}>{row.getValue("status")}</Badge>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const { id } = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="h-4 w-8 p-0"
						>
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<Link href={`/onboarding/?id=${id}`}>
							<DropdownMenuItem>
								<Pencil className="h-4 w-4 mr-2" />
								View Profile
							</DropdownMenuItem>
						</Link>
						<DropdownMenuItem>
							<Button
								size="sm"
								onClick={() => onApprove(id)}
								// disabled={isLoading}
							>
								<CheckCheck className="h-4 w-4 mr-2" />
								Approve Creator
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
