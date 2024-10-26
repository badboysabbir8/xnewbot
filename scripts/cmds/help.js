const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ ＸＮＩＬ░Ｂ♢Ｔ ]";

const bold = {
	a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵",
	i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽",
	q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅",
	y: "𝘆", z: "𝘇", A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙",
	G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡",
	O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩",
	W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", "0": "𝟬", "1": "𝟭", "2": "𝟮", "3": "𝟯",
	"4": "𝟰", "5": "𝟱", "6": "𝟲", "7": "𝟳", "8": "𝟴", "9": "𝟵",
};

const monospace = {
	a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑",
	i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙",
	q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡",
	y: "𝚢", z: "𝚣", A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵",
	G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽",
	O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅",
	W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉", "0": "𝟶", "1": "𝟷", "2": "𝟸", "3": "𝟹",
	"4": "𝟺", "5": "𝟻", "6": "𝟼", "7": "𝟽", "8": "𝟾", "9": "𝟿",
};

function apply(text, fontMap) {
	return text.replace(/[a-zA-Z0-9]/g, (char) => fontMap[char] || char);
}

module.exports = {
	config: {
		name: "help",
		version: "1.17",
		author: "ntkhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "View command usage and list all commands directly",
		},
		longDescription: {
			en: "View command usage and list all commands directly",
		},
		category: "info",
		guide: {
			en: "{pn} / help cmdName ",
		},
		priority: 1,
	},

	onStart: async function ({ message, args, event, threadsData, role }) {
		const { threadID } = event;
		const threadData = await threadsData.get(threadID);
		const prefix = getPrefix(threadID);

		if (args.length === 0) {
			const categories = {};
			let msg = "";

			msg += `╔═══════════╗\n  ＸＮＩＬ░Ｂ♢Ｔ \n╚═══════════╝`;

			for (const [name, value] of commands) {
				if (value.config.role > 1 && role < value.config.role) continue;

				const category = value.config.category || "Uncategorized";
				categories[category] = categories[category] || { commands: [] };
				categories[category].commands.push(name);
			}

			Object.keys(categories).forEach(category => {
				if (category !== "info") {
					msg += `\n🍒🍓\n│『 ${apply(category.toUpperCase(), bold)} 』`;
					const names = categories[category].commands.sort();
					for (let i = 0; i < names.length; i += 3) {
						const cmds = names.slice(i, i + 3).map(item => `✧${item}`);
						//const cmds = names.slice(i, i + 3).map(item => `➡️ ${apply(item, monospace)}💫`);
						msg += `\n│${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
					}
					msg += `\n╰────────────ꔪ`;
				}
			});

			const totalCommands = commands.size;
			msg += `\n𝗖𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆, 𝘁𝗵𝗲 𝗯𝗼𝘁 𝗵𝗮𝘀 ${totalCommands} 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝘁𝗵𝗮𝘁 𝗰𝗮𝗻 𝗯𝗲 𝘂𝘀𝗲𝗱\n`;
			msg += `𝗧𝘆𝗽𝗲 ${prefix}𝗵𝗲𝗹𝗽 [ＸＮＩＬ░Ｂ♢Ｔ] 𝘁𝗼 𝘃𝗶𝗲𝘄 𝘁𝗵𝗲 𝗱𝗲𝘁𝗮𝗶𝗹𝘀 𝗼𝗳 𝘁𝗵𝗮𝘁 𝗰𝗼𝗺𝗺𝗮𝗻𝗱\n`;
			msg += `♥ |  `;

			const helpListImages = [
				"https://i.imgur.com/GiN47ra.jpeg" // add image link here 
			];

			const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

			await message.reply({
				body: msg,
				attachment: await global.utils.getStreamFromURL(helpListImage)
			});
		} else {
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.get(aliases.get(commandName));

			if (!command) {
				await message.reply(`Command "${commandName}" not found.`);
			} else {
				const configCommand = command.config;
				const roleText = roleTextToString(configCommand.role);
				const author = configCommand.author || "Unknown";
				const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";
				const guideBody = configCommand.guide?.en || "No guide available.";
				const usage = guideBody.replace(/{pn}/g, prefix).replace(/{n}/g, configCommand.name);

				const response = `━━━━━━━━━━━━━━━━━♡

 ➢  🤖𝐍𝐀𝐌𝐄❤
 ➠ ${configCommand.name}
 ➢ 𝙄𝙉𝙁𝙊

 ➠ 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻 : ${longDescription}
 ➠ 𝗔𝗹𝗶𝗮𝘀𝗲𝘀 : ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
 ➠ 𝗔𝘂𝘁𝗵𝗼𝗿: ${author} //𝙼𝚘𝚍𝚒𝚏𝚒𝚎𝚍 𝙱𝚢 𝚇 𝙽 𝙸 𝙻
 ➠ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻 : ${configCommand.version || "1.0"}
 ➠ 𝗥𝗼𝗹𝗲 : ${roleText}
 ➠ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻 : ${configCommand.countDown || 1}s
 ➢ 𝙐𝙎𝘼𝙂𝙀
 ➠ ${usage}
━━━━━━━━━━━━━━━━━━ꔪ`;

				await message.reply(response);
			}
		}
	},
};

function roleTextToString(roleText) {
	switch (roleText) {
		case 0:
			return "0 (All users)";
		case 1:
			return "1 (Group administrators)";
		case 2:
			return "2 (Admin bot)";
		default:
			return "Unknown role";
	}
}
