import { validationResult } from "express-validator";
import prisma from "../config/db.config.js";
import Mux from "@mux/mux-node";
import { Config } from "../config/index.js";
import uploadCloudinary, { deleteUpload } from "../utils/cloudinary.js";
// import { error } from "winston";
// const { Video } = new Mux(Config.MUX_TOKEN_ID, Config.MUX_TOKEN_SECRET);
class ChapterController {
	static async createChapter(req, res, next) {
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(400).json({ errors: result.array() });
			}
			const { courseId } = req.params;
			const { title } = req.body;
			const user = req.user;
			// // FIXME: make user dynamic
			const lastChapter = await prisma.chapter.findFirst({
				where: {
					courseId: courseId,
					userId: user.id,
				},
				orderBy: {
					position: "desc",
				},
			});
			const newPosition = lastChapter ? lastChapter.position + 1 : 1;
			const chapter = await prisma.chapter.create({
				data: {
					title: title,
					courseId: courseId,
					position: newPosition,
					userId: user.id,
				},
			});
			return res.status(201).json(chapter);
		} catch (error) {
			next(error);
		}
	}
	static async getChapter(req, res, next) {
		try {
			const { chapterId } = req.params;
			const user = req.user;
			const chapter = await prisma.chapter.findUnique({
				where: { id: chapterId, userId: user.id },
				include: {
					muxData: true,
					attachments: true,
				},
			});
			return res.status(200).json(chapter);
		} catch (error) {
			next(error);
		}
	}
	static async updateChapter(req, res, next) {
		try {
			const mux = new Mux(Config.MUX_TOKEN_ID, Config.MUX_TOKEN_SECRET);
			const { chapterId } = req.params;
			const user = req.user;
			// const video = req.file;
			const { description, videoUrl, position, isFree, title } = req.body;
			// console.log("VIDEO: ", video);
			const chapter = await prisma.chapter.update({
				where: {
					id: chapterId,
					//FIXME: add dynamic value
					userId: user.id,
				},
				data: {
					description,
					videoUrl,
					position,
					isFree,
					title,
				},
			});
			//TODO: Cloudinary upload cost us more timing so try to upload from frontend using uploadthing
			// const folder = "thumbnail";
			// const result = await uploadCloudinary(video.path, folder);
			// if (result == null) {
			// 	return res
			// 		.status(404)
			// 		.json({ errors: [{ error: "Upload failed Try again!" }] });
			// }
			// console.log(result);
			// for mux data
			if (videoUrl) {
				const existingMuxData = await prisma.muxData.findFirst({
					where: {
						chapterId: chapterId,
					},
				});

				if (existingMuxData) {
					// await Video.Assets.del(existingMuxData.assetId);
					await mux.video.assets.delete(existingMuxData.assetId);
					await prisma.muxData.delete({
						where: {
							id: existingMuxData.id,
						},
					});
				}

				const asset = await mux.video.assets.create({
					// input: result.secure_url,
					input: videoUrl,
					playback_policy: "public",
					test: false,
				});
				await prisma.muxData.create({
					data: {
						chapterId: chapterId,
						assetId: asset.id,
						playbackId: asset.playback_ids?.[0]?.id,
					},
				});
			}
			return res.status(200).json(chapter);
		} catch (error) {
			next(error);
		}
	}
	static async reorderChapter(req, res, next) {
		try {
			const { courseId } = req.params;
			const { list } = req.body;
			const { data } = req.body;
			console.log(data);
			console.log(list);
			const user = req.user;
			// FIXME: fix the user
			const ownCourse = await prisma.course.findUnique({
				where: {
					id: courseId,
					userId: user.id,
				},
			});
			if (!ownCourse) {
				return res.status(400).json({ errors: [{ error: "Course not found!" }] });
			}
			for (let item of list) {
				await prisma.chapter.update({
					where: { id: item.id },
					data: { position: item.position },
				});
			}

			return res.status(200).json({ message: "Success" });
		} catch (error) {
			next(error);
		}
	}
	static async deleteChapter(req, res, next) {
		// TODO: also delete the video and attachments
		try {
			const { chapterId } = req.params;
			const user = req.user;
			await prisma.chapter.delete({
				where: {
					id: chapterId,
					//FIXME: add the dynamic value
					userId: 1,
				},
			});
			return res.status(200).json({ message: "success" });
		} catch (error) {
			next(error);
		}
	}
	static async publishChapter(req, res, next) {
		try {
			const { chapterId } = req.params;
			const user = req.user;
			const chapter = await prisma.chapter.findUnique({
				// FIXME: add dynamic user
				where: { id: chapterId, userId: user.id },
			});
			const muxData = await prisma.muxData.findUnique({
				where: {
					chapterId: chapterId,
				},
			});
			if (
				!chapter ||
				!muxData ||
				!chapter.title ||
				!chapter.description ||
				!chapter.videoUrl
			) {
				return res
					.status(401)
					.json({ errors: [{ error: "Fill the all Details of the chapters" }] });
			}
			const publishedChapter = await prisma.chapter.update({
				where: { id: chapterId, userId: user.id },
				data: {
					isPublished: true,
				},
			});
			return res.status(200).json(publishedChapter);
		} catch (error) {
			next(error);
		}
	}
	static async unPublishChapter(req, res, next) {
		try {
			const { chapterId } = req.params;
			const user = req.user;
			const unPublishChapter = await prisma.chapter.update({
				// FIXME: add the dynamic user
				where: { id: chapterId, userId: user.id },
				data: {
					isPublished: false,
				},
			});
			return res.status(200).json(unPublishChapter);
		} catch (error) {
			next(error);
		}
	}
	static async addAttachment(req, res, next) {
		try {
			const { chapterId } = req.body;
			const file = req.file;
			const folder = "attachment";
			const result = await uploadCloudinary(file.path, folder);
			console.log(result);
			if (result == null) {
				return res
					.status(404)
					.json({ errors: [{ error: "Upload failed Try again!" }] });
			}
			const attachment = await prisma.attachment.create({
				data: {
					chapterId: chapterId,
					url: result.secure_url,
					name: result.original_filename,
					publicId: result.public_id.split("/")[1],
				},
			});

			return res.status(201).json(attachment);
		} catch (error) {
			next(error);
		}
	}
	static async deleteAttachment(req, res, next) {
		try {
			const { attachmentId } = req.params;
			const attachment = await prisma.attachment.findUnique({
				where: { id: attachmentId },
			});
			if (!attachment) {
				return res.status(400).json({ errors: [{ error: "File Not Found!" }] });
			}
			const result = await deleteUpload(attachment.publicId, "attachment");
			if (result == null) {
				return res
					.status(404)
					.json({ errors: [{ error: "Delete failed Try again!" }] });
			}
			await prisma.attachment.delete({
				where: { id: attachmentId },
			});
			return res.status(200).json({ message: "Success" });
		} catch (error) {
			next(error);
		}
	}
	static async updateUserProgress(req, res, next) {
		try {
			const { chapterId } = req.params;
			const { isCompleted } = req.body;
			const user = req.user;
			const userProgress = await prisma.userProgress.upsert({
				where: {
					userId_chapterId: {
						userId: user.id,
						chapterId: chapterId,
					},
				},
				update: {
					isCompleted,
				},
				create: {
					userId: user.id,
					chapterId: chapterId,
					isCompleted,
				},
			});
			return res.status(201).json(userProgress);
		} catch (error) {
			next(error);
		}
	}
	static async uploadVideo(req, res, next) {
		try {
			const mux = new Mux(Config.MUX_TOKEN_ID, Config.MUX_TOKEN_SECRET);
			const { chapterId } = req.body;
			const user = req.user;
			const video = req.file;
			const folder = "thumbnail";
			const result = await uploadCloudinary(video.path, folder);
			if (result == null) {
				return res
					.status(404)
					.json({ errors: [{ error: "Upload failed Try again!" }] });
			}
			const existVideo = await prisma.chapter.findUnique({
				where: { id: chapterId, userId: user.id },
			});
			const deleteResult = await deleteUpload(existVideo.videoId, folder, "video");
			if (deleteResult == null) {
				return res
					.status(404)
					.json({ errors: [{ error: "Delete failed Try again!" }] });
			}
			const chapter = await prisma.chapter.update({
				where: { id: chapterId, userId: user.id },
				data: {
					videoUrl: result.secure_url,
					videoId: result.public_id.split("/")[1],
				},
			});

			if (result.secure_url) {
				const existingMuxData = await prisma.muxData.findFirst({
					where: {
						chapterId: chapterId,
					},
				});

				if (existingMuxData) {
					// await Video.Assets.del(existingMuxData.assetId);
					await mux.video.assets.delete(existingMuxData.assetId);
					await prisma.muxData.delete({
						where: {
							id: existingMuxData.id,
						},
					});
				}

				const asset = await mux.video.assets.create({
					// input: result.secure_url,
					input: result.secure_url,
					playback_policy: "public",
					test: false,
				});
				await prisma.muxData.create({
					data: {
						chapterId: chapterId,
						assetId: asset.id,
						playbackId: asset.playback_ids?.[0]?.id,
					},
				});
			}
			return res.status(201).json(chapter);
		} catch (error) {
			next(error);
		}
	}
	static async deleteChapter(req, res, next) {
		try {
			const mux = new Mux(Config.MUX_TOKEN_ID, Config.MUX_TOKEN_SECRET);
			const { chapterId } = req.params;
			const user = req.user;
			const chapter = await prisma.chapter.findUnique({
				where: { id: chapterId, userId: user.id },
				include: {
					attachments: true,
					muxData: true,
				},
			});
			// DELETE: Attachments;
			// const folder = "attachment";
			for (const attachment of chapter.attachments) {
				// console.log("attachment :", attachment);
				if (attachment?.publicId) {
					const result = await deleteUpload(attachment.publicId, "attachment");
					if (result == null) {
						return res
							.status(404)
							.json({ errors: [{ error: "Delete failed Try again!" }] });
					}
					// console.log("Result :", result);
				}
			}
			//DELETE Cloudinary VIDEO;
			if (chapter.videoUrl || chapter.videoId) {
				const result = await deleteUpload(chapter.videoId, "thumbnail", "video");
				if (result == null) {
					return res
						.status(404)
						.json({ errors: [{ error: "Delete failed Try again!" }] });
				}
			}
			// DELETE MUX DATA;
			if (chapter.muxData) {
				// console.log(chapter.muxData);
				await mux.video.assets.delete(chapter.muxData.assetId);
			}
			await prisma.chapter.delete({
				where: { id: chapterId, userId: user.id },
			});
			return res.status(200).json({ message: "success!" });
		} catch (error) {
			next(error);
		}
	}
}

export default ChapterController;
