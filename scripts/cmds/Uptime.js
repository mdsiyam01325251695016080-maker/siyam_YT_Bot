const os = require("os");

module.exports = {
  config: {
    name: "uptime",
    version: "3.0",
    author: "亗 SIYAM HASAN 亗",
    countDown: 5,
    role: 0,
    shortDescription: "Pro uptime status",
    longDescription: "Show advanced bot uptime",
    category: "system",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {

    const uptime = process.uptime();
    const d = Math.floor(uptime / (3600 * 24));
    const h = Math.floor((uptime % (3600 * 24)) / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);

    const start = Date.now();

    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

    const ping = Date.now() - start;

    const msg = `
╔━━━❖❖❖ 🚀 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡 𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🚀 ❖❖❖━━━╗
┃
┃ 🤖 Bot Name   ➤ SIYAM HASAN BOT 🤖
┃ 👑 Owner      ➤ SIYAM HASAN 👑
┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ⏰ Uptime     ➤ ${d}d ${h}h ${m}m ${s}s
┃ ⚡ Ping       ➤ ${ping} ms
┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 💻 CPU        ➤ ${os.cpus()[0].model}
┃ 💾 RAM        ➤ ${freeMem}GB / ${totalMem}GB
┃ 📡 Platform   ➤ ${os.platform()}
┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 🧠 Status     ➤ Online & Running 🟢
┃ 🔥 Mode       ➤ Dynamic VIP ⚡
┃
╚━━━❖❖❖ ⚡ 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗦𝗜𝗬𝗔𝗠 ⚡ ❖❖❖━━━╝
`;

    message.reply(msg);
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "uptime") {
      const uptime = process.uptime();
      const h = Math.floor(uptime / 3600);
      const m = Math.floor((uptime % 3600) / 60);
      const s = Math.floor(uptime % 60);

      message.reply(`🚀 SIYAM BOT UPTIME ➤ ${h}h ${m}m ${s}s ⚡`);
    }
  }
};
