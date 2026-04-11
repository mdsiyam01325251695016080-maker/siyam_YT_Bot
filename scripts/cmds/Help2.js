const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

function fancyText(text) {
  const map = {
    'a': '𝖺','b': '𝖻','c': '𝖼','d': '𝖽','e': '𝖾','f': '𝖿','g': '𝗀','h': '𝗁','i': '𝗂','j': '𝗃','k': '𝗄','l': '𝗅','m': '𝗆','n': '𝗇','o': '𝗈','p': '𝗉','q': '𝗊','r': '𝗋','s': '𝗌','t': '𝗍','u': '𝗎','v': '𝗏','w': '𝗐','x': '𝗑','y': '𝗒','z': '𝗓',
    'A': '𝖠','B': '𝖡','C': '𝖢','D': '𝖣','E': '𝖤','F': '𝖥','G': '𝖦','H': '𝖧','I': '𝖨','J': '𝖩','K': '𝖪','L': '𝖫','M': '𝖬','N': '𝖭','O': '𝖮','P': '𝖯','Q': '𝖰','R': '𝖱','S': '𝖲','T': '𝖳','U': '𝖴','V': '𝖵','W': '𝖶','X': '𝖷','Y': '𝖸','Z': '𝖹'
  };
  return text.split("").map(c => map[c] || c).join("");
}

const categoryEmoji = (category) => {
  const emojiMap = {
    'info':'📚','system':'⚙️','bot':'🤖','admin':'👑','owner':'👁️',
    'group':'👥','fun':'🎮','game':'🎲','media':'🎵','video':'🎬',
    'utility':'🔧','economy':'💰','image':'🖼️','education':'🎓',
    'chat':'💬','ai':'🧠','search':'🔍','security':'🛡️','misc':'📦',
    'love':'💖','family':'👨‍👩‍👧‍👦','health':'🏥','sports':'⚽',
    'travel':'✈️','business':'💼','technology':'💻','science':'🔬',
    'religion':'🕌','default':'📁'
  };

  const cat = category.toLowerCase();
  if (emojiMap[cat]) return emojiMap[cat];

  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (cat.includes(key) || key.includes(cat)) return emoji;
  }

  return emojiMap.default;
};

module.exports = {
  config: {
    name: "help2",
    version: "3.0",
    author: "Siyam Hasan",
    role: 0,
    countDown: 5,
    description: { en: "👑 Royal styled command list & details" },
    category: "Info",
    guide: { en: "{pn} [command_name]" }
  },

  onStart: async function ({ message, args, event, role }) {
    const prefix = getPrefix(event.threadID);
    const input = args[0]?.toLowerCase();

    let cmd = null;

    if (input) {
      if (commands.has(input)) {
        cmd = commands.get(input);
      } else if (aliases.has(input)) {
        cmd = commands.get(aliases.get(input));
      } else {
        return message.reply(`
╔═══════❖ ❌ NOT FOUND ❖═══════╗
┃ 🔍 Command: "${input}"
┃ 📌 Use: ${prefix}help
╚══════════════════════════════╝`);
      }
    }

    if (cmd) {
      const cfg = cmd.config;

      const desc = typeof cfg.description === "string"
        ? cfg.description
        : cfg.description?.en || "No description";

      const usage = typeof cfg.guide?.en === "string"
        ? cfg.guide.en.replace(/\{pn\}/g, prefix + cfg.name)
        : `${prefix}${cfg.name}`;

      const aliasesList = cfg.aliases
        ? cfg.aliases.map(a => `${prefix}${a}`).join(", ")
        : "None";

      const helpMessage = `
╔═══════👑 SIYAM ROYAL HELP 👑═══════╗
┃ 📛 Name: ${prefix}${cfg.name}
┃ 🗂 Category: ${categoryEmoji(cfg.category)} ${cfg.category}
┃ 📄 Description: ${desc}
┃ ⚙ Version: ${cfg.version}
┃ ⏳ Cooldown: ${cfg.countDown}s
┃ 🔒 Role: ${cfg.role === 0 ? "All" : cfg.role === 1 ? "Admin" : "Owner"}
┃ 👑 Author: Siyam Hasan
┃ 🔤 Aliases: ${aliasesList}
╠══════════════ USAGE ══════════════╣
${usage.split('\n').map(line => `┃ ➤ ${line}`).join('\n')}
╚══════════════════════════════════╝
`;

      return message.reply(helpMessage);
    }

    const categories = {};
    for (const [, c] of commands) {
      if (c.config.role > role) continue;
      const cat = c.config.category || "Other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(c.config.name);
    }

    let msg = `
╔═══════👑 SIYAM BOT MENU 👑═══════╗
`;

    const sortedCategories = Object.keys(categories).sort();

    for (const cat of sortedCategories) {
      const categoryName = fancyText(cat.toUpperCase());
      const commandsList = categories[cat].sort();

      msg += `
╠═══ ${categoryEmoji(cat)} ${categoryName} ═══╣
`;

      for (let i = 0; i < commandsList.length; i += 2) {
        const cmd1 = commandsList[i];
        const cmd2 = commandsList[i + 1];

        msg += cmd2
          ? `┃ ➤ ${cmd1.padEnd(14)} ${cmd2}\n`
          : `┃ ➤ ${cmd1}\n`;
      }
    }

    const totalCommands = Object.values(categories).flat().length;

    msg += `
╠══════════════ 📊 STATS ══════════════╣
┃ Total Commands: ${totalCommands}
┃ Total Categories: ${sortedCategories.length}
╠══════════════ 👤 OWNER INFO ══════════════╣
┃ Name: Uday Hasan Siyam
┃ Location: Kishoreganj, Bangladesh
┃ Study: Class 10
┃ School: Emni Mannan High School
┃ Age: 16+
┃ Work: Student
┃ Facebook: [Your FB Link]
┃ Number: [Your Number]
╠══════════════ 🚀 SYSTEM ══════════════╣
┃ Prefix: ${prefix}
┃ Developer: Siyam Hasan
┃ Use: ${prefix}help <command>
╚══════════════════════════════════════╝
`;

    return message.reply(msg);
  }
};
