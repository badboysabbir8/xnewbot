const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
	config: {
		name: "join",
		version: "2.0",
		author: "Kshitiz",
		countDown: 5,
		role: 2,
		shortDescription: "Join the group that bot is in",
		longDescription: "",
		category: "user",
		guide: {
			en: "{p}{n}",
		},
	},

	onStart: async function ({ api, event }) {
		try {
			const groupList = await api.getThreadList(10, null, ['INBOX']);
			// Filter out invalid groups with threadID 0
			const filteredList = groupList.filter(group => group.threadName && group.threadID && group.threadID !== 0);

			if (filteredList.length === 0) {
				api.sendMessage('No group chats found.', event.threadID);
			} else {
				const formattedList = await Promise.all(filteredList.map(async (group, index) => {
					try {
						const threadInfo = await api.getThreadInfo(group.threadID);
						const adminInfoList = await Promise.all(
							threadInfo.adminIDs.map(async (admin) => {
								const userInfo = await api.getUserInfo(admin.id);
								const adminName = userInfo[admin.id]?.name || "Unknown";
								return `${adminName} (ID: ${admin.id})`;
							})
						);

						return `│${index + 1}. ${group.threadName}\n│𝐓𝐈𝐃: ${group.threadID}\n│𝐀𝐝𝐦𝐢𝐧𝐬: ${adminInfoList.join(", ")}`;
					} catch (err) {
						console.warn(`Could not fetch info for group: ${group.threadName}, ID: ${group.threadID}`);
						return `│${index + 1}. ${group.threadName}\n│𝐓𝐈𝐃: ${group.threadID}\n│𝐀𝐝𝐦𝐢𝐧𝐬: Unavailable`;
					}
				}));

				const message = `╭─╮\n│𝐋𝐢𝐬𝐭 𝐨𝐟 𝐠𝐫𝐨𝐮𝐩 𝐜𝐡𝐚𝐭𝐬:\n${formattedList.join("\n")}\n╰───────────ꔪ`;

				const sentMessage = await api.sendMessage(message, event.threadID);
				global.GoatBot.onReply.set(sentMessage.messageID, {
					commandName: 'join',
					messageID: sentMessage.messageID,
					author: event.senderID,
				});
			}
		} catch (error) {
			console.error("Error listing group chats", error);
			api.sendMessage('An error occurred while listing group chats. Please try again later.', event.threadID);
		}
	},

	onReply: async function ({ api, event, Reply, args }) {
		const { author, commandName } = Reply;

		if (event.senderID !== author) {
			return;
		}

		const groupIndex = parseInt(args[0], 10);

		if (isNaN(groupIndex) || groupIndex <= 0) {
			api.sendMessage('Invalid input.\nPlease provide a valid number.', event.threadID, event.messageID);
			return;
		}

		try {
			const groupList = await api.getThreadList(10, null, ['INBOX']);
			const filteredList = groupList.filter(group => group.threadName && group.threadID && group.threadID !== 0);

			if (groupIndex > filteredList.length) {
				api.sendMessage('Invalid group number.\nPlease choose a number within the range.', event.threadID, event.messageID);
				return;
			}

			const selectedGroup = filteredList[groupIndex - 1];
			const groupID = selectedGroup.threadID;

			await api.addUserToGroup(event.senderID, groupID);
			api.sendMessage(`You have joined the group chat: ${selectedGroup.threadName}`, event.threadID, event.messageID);
		} catch (error) {
			console.error("Error joining group chat", error);
			api.sendMessage('An error occurred while joining the group chat.\nPlease try again later.', event.threadID, event.messageID);
		} finally {
			global.GoatBot.onReply.delete(event.messageID);
		}
	},
};