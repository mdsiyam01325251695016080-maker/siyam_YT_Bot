const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "siyam",
    version: "1.0.3",
    author: "〲亗 SIYAM HASAN 亗",
    role: 0,
    shortDescription: "Mamun Profile (No Prefix)",
    category: "Information",
    guide: {
      en: "type siyam"
    }
  },

  // 👇 এটা না থাকলে error দিবে
  onStart: async function () {},

  onChat: async function ({ api, event }) {
    const msg = event.body?.toLowerCase();
    if (!msg || msg !== "mamun") return;

    const profileText = 
`╔════════════════════════════════════════╗
║ 🌌✨ 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 𝗖𝗔𝗥𝗗 ✨🌌 ║
╠════════════════════════════════════════╣
║ 🌟 Name       : 〲亗 SIYAM HASAN 亗.O
║ 🎂 Age        : 17+
║ 🆔 FF ID      : https://www.facebook.com/share/1BfTXCVPWd/
║ 💌 Status     : Single
║ 📍 Location   : Kishoreganj, Bangladesh
║ 🎮 Hobbies    : Gaming 🎮 | Coding 💻 | Music 🎧
╠════════════════════════════════════════╣
║ 🔗 Social Links:
║ • Facebook  : https://www.facebook.com/share/1BfTXCVPWd/
║ • WhatsApp  : +8801789138157
║ • TikTok    : siyam0178913
╠════════════════════════════════════════╣
║ 🎯 Game      : Free Fire 🔫
╚════════════════════════════════════════╝`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "mamun.jpg");

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    const imgLink = "https://i.imgur.com/dgr2wq1.jpeg?fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMzUwNjg1NTMxNzI4AAEeFMG8l7lbsv5Tglmzr0wt2H7QR6SYhspUvB5LQ7UZ_rW7cmgAlFK5U-xW-ec_aem_NGcH1_dLi5CF9a-UPW8ycg";

    const send = () => {
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
      .on("close", send)
      .on("error", () => {
        api.sendMessage("❌ Image load failed!", event.threadID, event.messageID);
      });
  
