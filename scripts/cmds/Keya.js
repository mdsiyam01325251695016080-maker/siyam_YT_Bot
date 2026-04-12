const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "keya",
    version: "1.0.1",
    author: "〲MAMUNツ࿐ T.T　o.O",
    role: 0,
    shortDescription: "Keya Profile Card",
    category: "Information",
    guide: {
      en: "type keya"
    }
  },

  onStart: async function ({ api, event }) {

    const profileText = 
`╔━━━❖❖❖ 🌑🔥 𝗩𝗜𝗣 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 🔥🌑 ❖❖❖━━━╗
┃
┃   👑 𝑵𝑨𝑴𝑬 ➤ ♦ 𝗦𝗜𝗬𝗔𝗠_𝗬𝗧 ♦ ツ࿐ T.T o.O
┃   🎂 𝑨𝑮𝑬  ➤ 17+
┃   🆔 𝑭𝑭 𝑰𝑫 ➤ https://www.facebook.com/share/1H5WhEx2Nf/
┃   💖 𝑺𝑻𝑨𝑻𝑼𝑺 ➤ Single 💘
┃   📍 𝑳𝑶𝑪𝑨𝑻𝑰𝑶𝑵 ➤ Kishoreganj, Bangladesh
┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃        🎮 𝗛𝗢𝗕𝗕𝗜𝗘𝗦 🎮
┃   ➤ Gaming 🎯 | Adda 😎 | Music 🎧
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃        🔗 𝗦𝗢𝗖𝗜𝗔𝗟 𝗭𝗢𝗡𝗘 🔗
┃   📱 WhatsApp ➤ 01789138157
┃   🎵 TikTok   ➤ siyam0178913
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃       ⚔️ 𝗙𝗔𝗩𝗢𝗥𝗜𝗧𝗘 𝗚𝗔𝗠𝗘 ⚔️
┃   🔥 Free Fire 🔫 (Pro Player)
┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃   🧠 𝗔𝗧𝗧𝗜𝗧𝗨𝗗𝗘 ➤ Silent Boy 😶‍🌫️
┃   💎 𝗦𝗧𝗬𝗟𝗘 ➤ VIP & Royal 👑
┃
╚━━━❖❖❖ ⚡ 𝗞𝗜𝗡𝗚 𝗢𝗙 𝗦𝗜𝗬𝗔𝗠 ⚡ ❖❖❖━━━╝`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "keya.jpg");

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const imgLink = "https://i.imgur.com/ACbFtbL.jpeg";

    const sendMsg = () => {
      api.sendMessage(
        {
          body: profileText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", sendMsg);
  }
};
