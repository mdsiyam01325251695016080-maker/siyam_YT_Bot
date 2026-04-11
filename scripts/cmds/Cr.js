module.exports = {
config: {
name: "cr",
version: "2.1",
author: "〲♦ Siyam_YT ♦ツ࿐",
countDown: 5,
role: 2,
shortDescription: "Create group with mention",
longDescription: "Create messenger group using mention",
category: "group",
guide: "{pn} <group name> @mention"
},

onStart: async function ({ api, event, args }) {

const mentions = Object.keys(event.mentions);

if (mentions.length == 0) {
return api.sendMessage("⚠️ Please mention users\nExample:\n-cr Dream Group @user", event.threadID);
}

const groupName = args.join(" ").replace(/@\S+/g, "").trim();

if (!groupName) {
return api.sendMessage("⚠️ Please provide a group name!", event.threadID);
}

const members = [...mentions, event.senderID];

api.createNewGroup(members, groupName, (err, info) => {

if (err) return api.sendMessage("❌ Failed to create group!", event.threadID);

api.sendMessage(
`🎉 𝗚𝗥𝗢𝗨𝗣 𝗖𝗥𝗘𝗔𝗧𝗘𝗗 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬

👑 Owner: Uday Hasan Siyam
🌍 Country: Bangladesh
🎂 Age: 16+
📌 Group Name: ${groupName}
👥 Total Members: ${members.length}

✿•≫───────────────≪•✿
『 💫 Welcome to my new group! Stay active & enjoy 💙 』
✿•≫───────────────≪•✿`,
info.threadID
);

});

}
};
