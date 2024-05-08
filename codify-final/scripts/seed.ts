const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();
const chaptersId = [
	"0ac8226a-1f4d-444c-99c9-e670edc646e7",
	"177937e5-4645-48c0-b89f-8e8248b7a4dd",
	"2b4c5d90-311f-464e-b515-8a3b66bf392c",
	"525c336b-b12b-44ed-a4fa-b50f6a477778",
	"540cbb6f-e902-4f15-b51f-56f7a527501e",
	"563ae709-1d8c-4a18-a364-781a8887e8ee",
	"6c1b6c07-3798-437e-863b-97f5e42432b8",
	"7078d29e-4945-431e-94db-360427dc18aa",
	"75d1f199-a77d-4ccf-a62d-dd87a6900095",
	"78be9709-e517-463a-8ae9-6ea6372617b5",
	"8faeaf25-2eb7-42e2-aae2-4961215ce531",
	"920e9e4d-e5a9-4e51-9c24-4486777deba6",
	"999a7aff-a9d1-4c7c-bfca-4d2a0549af79",
	"ec6d8438-cb5a-4e01-be96-28e5f94b3d8b",
	"eca5d81b-511f-4b5e-9fa6-60a778a6e9ff",
	"f314bd92-3ad6-4baa-8306-318c3948e58b",
	"f3d92c0f-63ff-4678-9c21-4e0e4eda93d5",
	"f43b6a1f-3741-45ea-92d9-dafc2d7b88e9",
	"f72680aa-a8ea-41ce-b582-4471df241e94",
	"f7aec3b0-6a86-4720-9c51-ae2e2bf2f799",
];
const videoUrl =
	"https://utfs.io/f/df8b8867-b3ed-4bdf-866f-a53b83893a17-qln398.mp4";
const assetId = "ijdMw02t013CevWNs6bKZkoJczZH52d202HjDKuu01P8fhs";
const playbackId = "kPLNc6Ble1e6unp8uvOSQz01j00b36ZQlZ7fE21WRTr6Y";
async function main() {
	try {
		for (let i = 0; i < chaptersId.length; i++) {
			// add mux data
			// update video url to chapter
			await database.chapter.update({
				where: { id: chaptersId[i] },
				data: { videoUrl: videoUrl },
			});
			await database.muxData.create({
				data: {
					assetId: assetId,
					playbackId: playbackId,
					chapterId: chaptersId[i],
				},
			});
		}
		// const randomCategory = await generateCategory();

		// await database.category.createMany({
		// 	data: [
		// 		{ name: "Electronics" },
		// 		{ name: "Clothing & Apparel" },
		// 		{ name: "Home & Garden" },
		// 		{ name: "Health & Beauty" },
		// 		{ name: "Toys & Games" },
		// 		{ name: "Books & Magazines" },
		// 		{ name: "Sports & Outdoors" },
		// 		{ name: "Automotive" },
		// 		{ name: "Jewelry & Accessories" },
		// 		{ name: "Pet Supplies" },
		// 		{ name: "Office Supplies" },
		// 		{ name: "Baby & Kids" },
		// 		{ name: "Food & Beverages" },
		// 		{ name: "Travel & Luggage" },
		// 		{ name: "Electricals" },
		// 		{ name: "Furniture" },
		// 		{ name: "Fitness & Wellness" },
		// 		{ name: "Crafts & Hobbies" },
		// 		{ name: "Art & Collectibles" },
		// 		{ name: "Gadgets & Gizmos" },
		// 		{ name: "Party Supplies" },
		// 		{ name: "Stationery" },
		// 		{ name: "Musical Instruments" },
		// 		{ name: "Electronics Accessories" },
		// 		{ name: "Cosmetics" },
		// 		{ name: "Outdoor Equipment" },
		// 		{ name: "Home Improvement" },
		// 		{ name: "Kitchenware" },
		// 		{ name: "Tech Gadgets" },
		// 		{ name: "Virtual Reality" },
		// 		{ name: "Fashion Accessories" },
		// 		{ name: "DIY & Tools" },
		// 		{ name: "Bath & Body" },
		// 		{ name: "Outdoor Recreation" },
		// 		{ name: "Smart Home" },
		// 		{ name: "Party Decorations" },
		// 		{ name: "Board Games" },
		// 		{ name: "Car Accessories" },
		// 		{ name: "Gardening Supplies" },
		// 		{ name: "Kids Toys" },
		// 		{ name: "Fashion Footwear" },
		// 		{ name: "Digital Cameras" },
		// 		{ name: "Health Supplements" },
		// 		{ name: "Personal Care" },
		// 		{ name: "Mobile Accessories" },
		// 		{ name: "Travel Accessories" },
		// 		{ name: "DIY Supplies" },
		// 		{ name: "Fitness Equipment" },
		// 		{ name: "Camping Gear" },
		// 		{ name: "Computer Accessories" },
		// 		{ name: "Audio & Video" },
		// 		{ name: "Skincare" },
		// 		{ name: "Home Decor" },
		// 		{ name: "Cycling Gear" },
		// 		{ name: "Educational Toys" },
		// 		{ name: "Fashion Jewelry" },
		// 		{ name: "Electronic Gadgets" },
		// 		{ name: "Hair Care" },
		// 		{ name: "Cookware" },
		// 		{ name: "Smartphones" },
		// 		{ name: "Luggage & Travel Gear" },
		// 		{ name: "Pet Accessories" },
		// 		{ name: "Painting Supplies" },
		// 		{ name: "Party Favors" },
		// 		{ name: "Remote Control Toys" },
		// 		{ name: "Fitness Apparel" },
		// 		{ name: "Tablet Accessories" },
		// 		{ name: "Kitchen Appliances" },
		// 		{ name: "Wearable Technology" },
		// 		{ name: "Tech Accessories" },
		// 		{ name: "Fitness Accessories" },
		// 		{ name: "Travel Essentials" },
		// 		{ name: "Luxury Watches" },
		// 		{ name: "Gaming Accessories" },
		// 		{ name: "Fashion Apparel" },
		// 		{ name: "Electrical Appliances" },
		// 		{ name: "Baby Gear" },
		// 		{ name: "Outdoor Clothing" },
		// 		{ name: "Cooking Essentials" },
		// 		{ name: "Hiking Gear" },
		// 		{ name: "Computer Components" },
		// 		{ name: "Hair Accessories" },
		// 		{ name: "Smartwatches" },
		// 		{ name: "Party Supplies" },
		// 		{ name: "Home Textiles" },
		// 		{ name: "Yoga & Pilates" },
		// 		{ name: "Mobile Phones" },
		// 		{ name: "Travel Gear" },
		// 		{ name: "Camera Accessories" },
		// 		{ name: "Camping Essentials" },
		// 		{ name: "Audio Equipment" },
		// 		{ name: "Gardening Tools" },
		// 		{ name: "Tabletop Games" },
		// 		{ name: "Luxury Handbags" },
		// 		{ name: "Vintage Collectibles" },
		// 		{ name: "Home Appliances" },
		// 		{ name: "Puzzles & Brain Teasers" },
		// 		{ name: "Stationery Supplies" },
		// 		{ name: "Fishing Gear" },
		// 		{ name: "Smart Lighting" },
		// 	],
		// });

		console.log("Success");
	} catch (error) {
		console.log("Error seeding the database categories", error);
	} finally {
		await database.$disconnect();
	}
}

main();
// console.log(faker.helpers.uniqueArray(faker.commerce.department, 100));
