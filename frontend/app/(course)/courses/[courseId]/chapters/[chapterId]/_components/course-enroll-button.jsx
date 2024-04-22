"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useCheckoutMutation } from "@/redux/slices/paymentApiSlice";
const CourseEnrollButton = ({ price, courseId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [checkout, { error }] = useCheckoutMutation();
	const onClick = async () => {
		try {
			setIsLoading(true);
			const { data } = await checkout(courseId);
			console.log(data);
			window.location.assign(data);
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
		if (error) {
			toast.error("Something went wrong");
		}
	};
	return (
		<Button
			onClick={onClick}
			disabled={isLoading}
			size="sm"
			className="w-full md:w-auto"
		>
			Enroll for {formatPrice(price)}
		</Button>
	);
};

export default CourseEnrollButton;
