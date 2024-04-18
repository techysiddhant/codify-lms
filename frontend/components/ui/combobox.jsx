"use client";

// import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
// 	Command,
// 	CommandEmpty,
// 	CommandGroup,
// 	CommandInput,
// 	CommandItem,
// } from "@/components/ui/command";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "./command";

// interface ComboboxProps {
// 	options: { label: string, value: string }[];
// 	value?: string;
// 	onChange: (value: string) => void;
// }
const categories = [
	{
		label: "Web",
		value: "gfhsdghfdkf",
	},
	{
		label: "Web",
		value: "gfhsdghfdkf",
	},
];
export const Combobox = ({ options, value, onChange }) => {
	const [open, setOpen] = useState(false);
	// const optionsArray = Object.entries(options).map(([key, value]) => ({
	// 	value: key,
	// 	label: value.label,
	// }));
	// console.log(options);
	// console.log(typeof optionsArray);
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? options?.find((option) => option.value === value)?.label
						: "Select option..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Search option..." />
					<CommandEmpty>No option found.</CommandEmpty>
					<CommandGroup>
						{options &&
							options.map((option) => (
								<CommandItem
									className="my-1"
									key={option?.value}
									onSelect={() => {
										onChange(option?.value === value ? "" : option?.value);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value !== option?.value ? "opacity-0" : "opacity-100"
										)}
									/>
									{option?.label}
								</CommandItem>
							))}
					</CommandGroup>
					{/* <CommandGroup>
						{options &&
							Object.entries(options).map(([key, valueV]) => (
								<CommandItem
									key={key}
									onSelect={() => {
										onChange(valueV === value ? "" : value);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											valueV === value ? "opacity-100" : "opacity-0"
										)}
									/>
									{valueV?.label}
								</CommandItem>
							))}
					</CommandGroup> */}
				</Command>
			</PopoverContent>
		</Popover>
	);
};
