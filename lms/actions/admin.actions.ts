"use server";

import { db } from "@/lib/db";


export async function getTotalRevenue() {
  try {
    const  revenue = await db.purchase.aggregate({
        _sum:{
            amount:true
        }
    })
    return revenue;
  } catch (error) {
    console.log("[GET_TOTAL_REVENUE_ADMIN]",error);
    return null;
  }
}
