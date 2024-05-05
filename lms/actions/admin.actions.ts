"use server";

import { db } from "@/lib/db";

export async function getTotalRevenue() {
	try {
		const revenue = await db.purchase.aggregate({
			_sum: {
				amount: true,
			},
		});
		return revenue;
	} catch (error) {
		console.log("[GET_TOTAL_REVENUE_ADMIN]", error);
		return null;
	}
}
export async function getTotalCreators() {
	try {
		const totalCreators = await db.user.count({
			where: {
				role: "CREATOR",
			},
		});
		return totalCreators;
	} catch (error) {
		console.log("[GET_TOTAL_REVENUE_ADMIN]", error);
		return null;
	}
}
export async function getTotalUsers() {
	try {
		const totalUsers = await db.user.count({
			where: {
				role: "USER",
			},
		});
		return totalUsers;
	} catch (error) {
		console.log("[GET_TOTAL_REVENUE_ADMIN]", error);
		return null;
	}
}
export async function getRecentSales() {
	try {
		const recentSales = await db.purchase.findMany({
			orderBy: {
				createdAt: "desc", // Sorting by creation date in descending order
			},
			take: 5, // Limiting the result to 5
			// include: {
			//   user: true // Including the associated user details
			// }
		});

		// Since there is no direct relation 'user' in the Purchase model,
		// we need to manually populate the user details using userId
		const salesWithUserDetails = await Promise.all(
			recentSales.map(async (sale) => {
				const user = await db.user.findUnique({
					where: {
						id: sale.userId,
					},
				});
				return { ...sale, user };
			})
		);

		return salesWithUserDetails;
	} catch (error) {
		console.log("[GET_TOTAL_REVENUE_ADMIN]", error);
		return null;
	}
}
export async function getTotalMonthSales() {
	try {
		let currentDate = new Date();
		let firstDayOfMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1
		);
		let formattedFirstDayOfMonth = `${firstDayOfMonth.getFullYear()}-${(
			firstDayOfMonth.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}-${firstDayOfMonth.getDate().toString().padStart(2, "0")}`;

		let lastDayOfMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			0
		);
		let formattedLastDayOfMonth = `${lastDayOfMonth.getFullYear()}-${(
			lastDayOfMonth.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}-${lastDayOfMonth.getDate().toString().padStart(2, "0")}`;
		const totalSalesCurrentMonth = await db.purchase.aggregate({
			_sum: {
				amount: true,
			},
			where: {
				createdAt: {
					gte: new Date(formattedFirstDayOfMonth),
					lt: new Date(formattedLastDayOfMonth),
				},
			},
		});

		return totalSalesCurrentMonth;
	} catch (error) {
		console.log("[GET_TOTAL_REVENUE_ADMIN]", error);
		return null;
	}
}
function monthToName(monthNumber: number) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	return months[monthNumber - 1];
}
export async function getRevenueChart() {
	try {
		const salesByMonth = [];

		// Iterate over each month to calculate total sales
		for (let month = 1; month <= 12; month++) {
			const result = await db.purchase.aggregate({
				where: {
					AND: [
						{
							createdAt: {
								gte: new Date(new Date().getFullYear(), month - 1, 1), // Start of the month
							},
						},
						{
							createdAt: {
								lt: new Date(new Date().getFullYear(), month, 1), // Start of next month
							},
						},
					],
				},
				_sum: {
					amount: true,
				},
			});

			// Add total sales for the month to the array
			salesByMonth.push({
				name: monthToName(month), // Convert month number to name
				total: result._sum.amount || 0,
			});
		}

		return salesByMonth;
	} catch (error) {
		console.log("[GET_TOTAL_REVENUE_ADMIN]", error);
		return null;
	}
}
export async function getUnApproveCreators() {
	try {
		const creators = await db.creator.findMany({
			where: {
				status: {
					equals: "pending",
				},
			},
		});
		return creators;
	} catch (error) {
		console.log(error);
		return null;
	}
}
