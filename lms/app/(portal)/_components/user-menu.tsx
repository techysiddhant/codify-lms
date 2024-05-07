"use client";
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const UserMenu = ({ data }: any) => {
	const handleLogout = async () => {
		await signOut();
	};
	const router = useRouter();
	const handleProfile = () => {
		router.push(`/onboarding?email=${data?.email}`);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="mr-2">
					<Avatar>
						<AvatarImage src={data?.image} />
						<AvatarFallback>PIC</AvatarFallback>
					</Avatar>
					{/* <div className="">
						<Image
							src={data?.image}
							alt="profile"
							width={40}
							height={40}
							className="rounded-full cursor-pointer"
						/>
					</div> */}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={handleProfile}>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
						{/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className="cursor-pointer"
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
					{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
