const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
config: {
name: "owner",
version: "17.0.0",
author: "Milon + VIP Edit",
countDown: 5,
role: 0,
category: "info",
description: "VIP Owner Card Ultra Design",
guide: "{p}owner"
},

onStart: async function ({ api, event, threadsData }) {
const { threadID, messageID } = event;

let Canvas;
try {
Canvas = require("canvas");
} catch (e) {
return api.sendMessage("❌ canvas install করা নাই", threadID, messageID);
}

const { createCanvas, loadImage } = Canvas;

// DATA
const cardUrl = "https://files.catbox.moe/4nabja.jpg";
const avatarUrl = "https://files.catbox.moe/jdltqj.jpg";

try {
api.sendMessage("⏳ VIP CARD বানানো হচ্ছে...", threadID, messageID);

async function getImg(url) {
const res = await axios({
url,
method: "GET",
responseType: "arraybuffer"
});
return await loadImage(Buffer.from(res.data));
}

const [cardImg, avatarImg] = await Promise.all([
getImg(cardUrl),
getImg(avatarUrl)
]);

const scale = 3;
const canvas = createCanvas(cardImg.width * scale, cardImg.height * scale);
const ctx = canvas.getContext("2d");

// BG
ctx.drawImage(cardImg, 0, 0, canvas.width, canvas.height);

// CENTER
const centerX = canvas.width / 2;
const centerY = 150 * scale;

// HEADER
ctx.fillStyle = "#FFD700";
ctx.textAlign = "center";
ctx.font = `bold ${28 * scale}px Arial`;
ctx.fillText("𓊈 OWNER PROFILE 𓊉", centerX, 80 * scale);

// AVATAR
const radius = 65 * scale;
ctx.save();
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.clip();
ctx.drawImage(avatarImg, centerX - radius, centerY - radius, radius * 2, radius * 2);
ctx.restore();

ctx.strokeStyle = "#FFD700";
ctx.lineWidth = 6;
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.stroke();

// NAME
ctx.fillStyle = "#FFD700";
ctx.shadowColor = "black";
ctx.shadowBlur = 20;
ctx.font = `bold ${34 * scale}px Arial`;
ctx.fillText("𓊈𝐆𝐎𝐋𝐀𝐏 𝐕𝐈𝐏𓊉", centerX, centerY + radius + 40);

// INFO
ctx.textAlign = "left";
ctx.font = `bold ${18 * scale}px Arial`;

let y = centerY + radius + 80;
const x = centerX - (180 * scale);

function draw(text) {
ctx.fillText(text, x, y);
y += 30 * scale;
}

// VIP INFO DESIGN
draw(`╔═━𓊈👑 𝐍𝐀𝐌𝐄 𓊉━═╗ ➤ 𝑼𝑫𝑨𝒀 𝑯𝑨𝑺𝑨𝑵 𝑺𝑰𝒀𝑨𝑴`);
draw(`╚═━𓊈🔥 𝐍𝐈𝐂𝐊 𓊉━═╝ ➤ 『𝑻𝑼𝑹𝑨』`);

draw(`✦ ━━━━ 🎂 𝐀𝐆𝐄 ━━━━ ✦ ➤ ➊➏`);
draw(`✦ ━━━━ 📅 𝐃𝐎𝐁 ━━━━ ✦ ➤ ⓿➎ 𝑴𝑨𝒀 ➋⓿➊⓿`);

draw(`╭─❖ 📍 𝐋𝐎𝐂𝐀𝐓𝐈𝐎𝐍 ❖─╮`);
draw(`╰➤ 𝑲𝑰𝑺𝑯𝑶𝑹𝑬𝑮𝑨𝑵𝑱 • 𝑩𝑨𝑵𝑮𝑳𝑨𝑫𝑬𝑺𝑯`);

draw(`▣═━ 🎓 𝐂𝐋𝐀𝐒𝐒 ━═▣ ➤ 𝑻𝑬𝑵`);
draw(`▣═━ 🏫 𝐒𝐂𝐇𝐎𝐎𝐋 ━═▣`);
draw(`➤ 𝑴.𝑨 𝑴𝑨𝑵𝑵𝑨𝑵 𝑴𝑨𝑵𝑰𝑲 𝑯𝑰𝑮𝑯 𝑺𝑪𝑯𝑶𝑶𝑳`);

draw(`╔═━💼 𝐖𝐎𝐑𝐊━═╗ ➤ 『𝑺𝑻𝑼𝑫𝑬𝑵𝑻』`);
draw(`╚═━💔 𝐒𝐓𝐀𝐓𝐔𝐒━═╝ ➤ 𝑺𝑰𝑵𝑮𝑳𝑬`);

draw(`⫷😎 𝐀𝐓𝐓𝐈𝐓𝐔𝐃𝐄⫸ ➤ 𝑺𝑻𝑨𝒀 𝑰𝑵 𝑴𝒀 𝑶𝑾𝑵 𝒁𝑶𝑵𝑬`);

draw(`⚡⫸ 𝐕𝐈𝐏 𝐍𝐎𝐓𝐄 ⫷⚡`);
draw(`➤ ❝ 𝑫𝑶𝑵'𝑻 𝑻𝑹𝒀 𝑻𝑶 𝑹𝑬𝑨𝑪𝑯 𝑴𝒀 𝑳𝑬𝑽𝑬𝑳 ❞`);

// SAVE
const filePath = path.join(__dirname, "cache", `vip_${Date.now()}.png`);
fs.ensureDirSync(path.dirname(filePath));
fs.writeFileSync(filePath, canvas.toBuffer());

// SEND
return api.sendMessage({
body: "🔥 VIP OWNER CARD READY!",
attachment: fs.createReadStream(filePath)
}, threadID, () => fs.unlinkSync(filePath), messageID);

} catch (e) {
console.error(e);
api.sendMessage("❌ Error: " + e.message, threadID, messageID);
}
}
};
