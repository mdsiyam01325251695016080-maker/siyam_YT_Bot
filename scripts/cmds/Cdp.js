const axios = require("axios");

module.exports = {
  config: {
    name: "coupledp",
    aliases: ["cdp"],
    version: "3.3",
    author: "♦ Siyam_YT ♦",
    description: "Get random boy & girl matching couple DP 🌬️",
    category: "love",
    cooldown: 5
  },

  onStart: async function ({ api, event, args }) {
    try {

      api.setMessageReaction("⏳", event.messageID, () => {}, true);
      api.sendTypingIndicator(event.threadID, true);

      const baseRes = await axios.get(
        "https://raw.githubusercontent.com/goatbotnx/Sexy-nx2.0Updated/refs/heads/main/nx-apis.json"
      );

      const cdpBase = baseRes.data.cdp;
      if (!cdpBase) {
        api.sendTypingIndicator(event.threadID, false);
        return api.setMessageReaction("❌", event.messageID, () => {}, true);
      }

      if (args[0] && args[0].toLowerCase() === "list") {
        const res = await axios.get(`${cdpBase}/cdp/list`);
        const { total_cdp } = res.data;

        api.sendTypingIndicator(event.threadID, false);
        api.setMessageReaction("✅", event.messageID, () => {}, true);

        return api.sendMessage(
`📂 𝐂𝐨𝐮𝐩𝐥𝐞 𝐃𝐏 𝐋𝐢𝐛𝐫𝐚𝐫𝐲
💑 𝐓𝐨𝐭𝐚𝐥 𝐏𝐚𝐢𝐫𝐬 : ${total_cdp}
🌬️ 𝐑𝐞𝐚𝐝𝐲 𝐓𝐨 𝐔𝐬𝐞

✨ 𝐓𝐲𝐩𝐞 : cdp`,
          event.threadID
        );
      }

      const res = await axios.get(`${cdpBase}/cdp`);
      const pair = res.data.pair;

      if (!pair || !pair.boy || !pair.girl) {
        api.sendTypingIndicator(event.threadID, false);
        return api.setMessageReaction("❌", event.messageID, () => {}, true);
      }

      const getStream = async (url) => {
        return (
          await axios.get(url, {
            responseType: "stream",
            headers: {
              "User-Agent": "Mozilla/5.0",
              Referer: "https://imgur.com/"
            }
          })
        ).data;
      };

      const boyStream = await getStream(pair.boy);
      const girlStream = await getStream(pair.girl);

      api.sendTypingIndicator(event.threadID, false);

      api.sendMessage(
        {
          body:
`🎀 h̷e̷r̷e̷ i̷s̷ y̷o̷u̷r̷ c̷d̷p̷ 🌬️
💞 𝐁𝐨𝐲 & 𝐆𝐢𝐫𝐥 𝐏𝐚𝐢𝐫`,
          attachment: [boyStream, girlStream]
        },
        event.threadID,
        () => {
          api.setMessageReaction("✅", event.messageID, () => {}, true);
        }
      );

    } catch (err) {
      console.error("CDP Error:", err);
      api.sendTypingIndicator(event.threadID, false);
      api.setMessageReaction("❌বাল সর এন্তে কাজ করে না", event.messageID, () => {}, true);
    }
  }
};
