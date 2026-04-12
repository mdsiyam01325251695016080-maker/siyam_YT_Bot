const axios = require("axios");
const { getPrefix, getStreamFromURL } = global.utils;
const { commands, aliases } = global.GoatBot;

const HELP_VIDEO = "https://files.catbox.moe/g5vr8h.mp4";

let fontsLoaded = false;
let xfont = {}, yfont = {}, categoryEmoji = {};

// ✅ LOAD RESOURCES (ONCE ONLY)
async function loadResources() {
  if (fontsLoaded) return;
  try {
    const [x, y, c] = await Promise.all([
      axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/xfont.json"),
      axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/yfont.json"),
      axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/category.json")
    ]);
    xfont = x.data;
    yfont = y.data;
    categoryEmoji = c.data;
    fontsLoaded = true;
  } catch {
    fontsLoaded = true;
  }
}

// ✅ FONT CONVERT
const font = (text, type = "command") => {
  const map = type === "category" ? xfont : yfont;
  return text.split("").map(c => map[c] || c).join("");
};

// ✅ CATEGORY EMOJI
const getEmoji = (cat) =>
  categoryEmoji?.[cat.toLowerCase()] || "🗂️";

// ✅ ROLE TEXT
const roleText = (r) =>
  ["👤 All", "👑 Admin", "⚡ Owner"][r] || "Unknown";

// ✅ FIND COMMAND (FAST + FULL)
function findCmd(name) {
  name = name.toLowerCase();

  if (commands.has(name)) return commands.get(name);
  if (aliases.has(name)) return commands.get(aliases.get(name));

  for (const [, cmd] of commands) {
    const a = cmd.config?.aliases;
    if (Array.isArray(a) && a.includes(name)) return cmd;
    if (typeof a === "string" && a === name) return cmd;
  }
  return null;
}

module.exports = {
  config: {
    name: "help2",
    aliases: ["menu2"],
    version: "4.0",
    author: "SIYAM",
    role: 0,
    category: "info",
    shortDescription: "Advanced help system",
    guide: "{pn} | {pn} <command> | {pn} -c <category>"
  },

  onStart: async function ({ message, args, event, role }) {
    await loadResources();

    const prefix = getPrefix(event.threadID);
    const input = args.join(" ").trim();

    // ✅ BUILD CATEGORY MAP (OPTIMIZED)
    const categories = {};
    for (const [, cmd] of commands) {
      if (!cmd?.config || cmd.config.role > role) continue;

      const cat = (cmd.config.category || "others").toUpperCase();
      (categories[cat] ||= []).push(cmd.config.name);
    }

    // ✅ CATEGORY FILTER
    if (args[0] === "-c" && args[1]) {
      const cat = args[1].toUpperCase();
      if (!categories[cat])
        return message.reply(`❌ Category "${cat}" not found`);

      let msg = `╭─────✰『 ${getEmoji(cat)} ${font(cat, "category")} 』\n`;
      for (const c of categories[cat].sort())
        msg += `│⚡ ${font(c)}\n`;
      msg += `╰────────────✰\n`;
      msg += `> TOTAL: ${categories[cat].length}\n> PREFIX: ${prefix}`;

      return message.reply({
        body: msg,
        attachment: await getStreamFromURL(HELP_VIDEO)
      });
    }

    // ✅ MAIN MENU
    if (!input) {
      let msg = `╭───────❁\n│✨ 𝗛𝗘𝗟𝗣 2 𝗠𝗘𝗡𝗨 ✨\n╰────────────❁\n`;

      for (const cat of Object.keys(categories).sort()) {
        msg += `╭─────✰『 ${getEmoji(cat)} ${font(cat, "category")} 』\n`;
        for (const c of categories[cat].sort())
          msg += `│⚡ ${font(c)}\n`;
        msg += `╰────────────✰\n`;
      }

      const total = Object.values(categories).flat().length;

      msg += `╭─────✰[🌟 INFO 🌟]
│> TOTAL COMMANDS: ${total}
│> PREFIX: ${prefix}
│> USE: ${prefix}help2 <command>
╰────────────✰`;

      return message.reply({
        body: msg,
        attachment: await getStreamFromURL(HELP_VIDEO)
      });
    }

    // ✅ COMMAND DETAILS
    const cmd = findCmd(input);
    if (!cmd)
      return message.reply(`❌ Command "${input}" not found`);

    const c = cmd.config;

    const desc =
      typeof c.description === "string"
        ? c.description
        : c.description?.en || "No description";

    const usage =
      typeof c.guide?.en === "string"
        ? c.guide.en.replace(/\{pn\}/g, prefix + c.name)
        : `${prefix}${c.name}`;

    const alias =
      Array.isArray(c.aliases)
        ? c.aliases.join(", ")
        : c.aliases || "None";

    const msg = `
╭─── COMMAND INFO ───╮
🔹 Name: ${c.name}
📂 Category: ${c.category}
📜 Description: ${desc}
🔁 Aliases: ${alias}
⚙️ Version: ${c.version || "1.0"}
🔐 Role: ${roleText(c.role)}
⏱️ Cooldown: ${c.countDown || 1}s
👑 Author: ${c.author || "Unknown"}
📖 Usage: ${usage}
╰───────────────────╯`;

    return message.reply({
      body: msg,
      attachment: await getStreamFromURL(HELP_VIDEO)
    });
  }
};
