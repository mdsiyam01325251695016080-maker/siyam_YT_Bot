const fs = require("fs-extra");
const moment = require("moment-timezone");

const getStreamFromURL = global.utils.getStreamFromURL;

const gifList = [
"https://files.catbox.moe/nkit0j.mp4",
"https://files.catbox.moe/nkit0j.mp4"
];

const getRandomGif = () =>
	gifList[Math.floor(Math.random() * gifList.length)];

module.exports = {
	config: {
		name: "prefix",
		version: "3.0 VIP",
		author: "Siyam Hasan + VIP Edit",
		countDown: 5,
		role: 0,
		description: "VIP Prefix Panel System",
		category: "config",
		prefix: "!"
	},

	langs: {
		en: {
			usage: "❌ Usage: prefix <newPrefix> | prefix reset | prefix <newPrefix> -g",
			reset: "✅ Prefix reset successful!\n🔰 System prefix: %1",
			onlyAdmin: "⛔ Only bot admin can change global prefix.",
			confirmGlobal:
`╔═══━━━✦🌍 GLOBAL PREFIX CHANGE ✦━━━═══╗
👉 React দিয়ে confirm করুন ✅
╚═══━━━✦⚡ WAITING FOR REACTION ⚡✦━━━═══╝`,

			confirmThisThread:
`╔═══━━━✦💬 GROUP PREFIX CHANGE ✦━━━═══╗
👉 React দিয়ে confirm করুন ✅
╚═══━━━✦⚡ WAITING FOR REACTION ⚡✦━━━═══╝`,

			successGlobal:
`╔═══━━━✦🔥 PREFIX UPDATED 🔥✦━━━═══╗
🌍 GLOBAL PREFIX ➤ %1
╚═══━━━✦👑 DONE 👑✦━━━═══╝`,

			successThisThread:
`╔═══━━━✦🔥 PREFIX UPDATED 🔥✦━━━═══╗
💬 GROUP PREFIX ➤ %1
╚═══━━━✦👑 DONE 👑✦━━━═══╝`
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0])
			return message.reply(getLang("usage"));

		const gif = getRandomGif();

		if (args[0] == 'reset') {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const setGlobal = args[1] === "-g";

		if (setGlobal && role < 2)
			return message.reply(getLang("onlyAdmin"));

		const confirmMsg = setGlobal
			? getLang("confirmGlobal")
			: getLang("confirmThisThread");

		message.reply({
			body: confirmMsg,
			attachment: await getStreamFromURL(gif)
		}, (err, info) => {
			if (err) return;

			global.GoatBot.onReaction.set(info.messageID, {
				commandName,
				author: event.senderID,
				newPrefix,
				setGlobal
			});
		});
	},

	onReaction: async function ({ event, message, threadsData, Reaction, getLang }) {
		if (event.userID !== Reaction.author) return;

		global.GoatBot.onReaction.delete(event.messageID);

		if (Reaction.setGlobal) {
			global.GoatBot.config.prefix = Reaction.newPrefix;
			fs.writeFileSync(
				global.client.dirConfig,
				JSON.stringify(global.GoatBot.config, null, 2)
			);
			return message.reply(
				getLang("successGlobal", Reaction.newPrefix)
			);
		}

		await threadsData.set(
			event.threadID,
			Reaction.newPrefix,
			"data.prefix"
		);

		return message.reply(
			getLang("successThisThread", Reaction.newPrefix)
		);
	},

	onChat: async function ({ event, message, threadsData }) {
		if (!event.body || event.body.toLowerCase() !== "prefix") return;

		const gif = getRandomGif();

		const systemPrefix = global.GoatBot.config.prefix;
		const groupPrefix = global.utils.getPrefix(event.threadID);

		const threadInfo = await threadsData.get(event.threadID);
		const groupName = threadInfo?.threadName || "Unknown Group";

		const time = moment().tz("Asia/Dhaka").format("hh:mm A");
		const date = moment().tz("Asia/Dhaka").format("DD MMM YYYY");

		const owner = "Uday Hasan Siyam";
		const location = "Kishoreganj, Bangladesh";

		return message.reply({
body:
`╔═══━━━✦🔥 𝐏𝐑𝐄𝐅𝐈𝐗 𝐏𝐀𝐍𝐄𝐋 🔥✦━━━═══╗

👑 ╭─❖ 𝐆𝐑𝐎𝐔𝐏 ❖─╮
   ╰➤ 『${groupName}』

⚙️ ╭─❖ 𝐒𝐘𝐒𝐓𝐄𝐌 ❖─╮
   ╰➤ 『${systemPrefix}』

💬 ╭─❖ 𝐆𝐑𝐎𝐔𝐏 𝐏𝐑𝐄𝐅𝐈𝐗 ❖─╮
   ╰➤ 『${groupPrefix}』

⏰ ╭─❖ 𝐓𝐈𝐌𝐄 ❖─╮
   ╰➤ 『${time}』

📅 ╭─❖ 𝐃𝐀𝐓𝐄 ❖─╮
   ╰➤ 『${date}』

👑 ╭─❖ 𝐎𝐖𝐍𝐄𝐑 ❖─╮
   ╰➤ 『𝑼𝑫𝑨𝒀 𝑯𝑨𝑺𝑨𝑵 𝑺𝑰𝒀𝑨𝑴』

📍 ╭─❖ 𝐋𝐎𝐂𝐀𝐓𝐈𝐎𝐍 ❖─╮
   ╰➤ 『𝑲𝑰𝑺𝑯𝑶𝑹𝑬𝑮𝑨𝑵𝑱 • 𝑩𝑨𝑵𝑮𝑳𝑨𝑫𝑬𝑺𝑯』

⚡ ╭─❖ 𝐒𝐓𝐀𝐓𝐔𝐒 ❖─╮
   ╰➤ 『🟢 𝐎𝐍𝐋𝐈𝐍𝐄』

╚═══━━━✦👑 𝐕𝐈𝐏 𝐁𝐎𝐓 👑✦━━━═══╝`,
			attachment: await getStreamFromURL(gif)
		});
	}
};
