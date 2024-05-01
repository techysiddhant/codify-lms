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
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
    const currentYear = today.getFullYear();

    const totalSalesCurrentMonth = await db.purchase.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: new Date(`${currentYear}-${currentMonth}-01T00:00:00.000Z`),
          lt: new Date(`${currentYear}-${currentMonth + 1}-01T00:00:00.000Z`),
        },
      },
    });
    return totalSalesCurrentMonth;
  } catch (error) {
    console.log("[GET_TOTAL_REVENUE_ADMIN]", error);
    return null;
  }
}
