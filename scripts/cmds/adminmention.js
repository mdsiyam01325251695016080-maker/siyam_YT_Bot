module.exports = {
  config: {
    name: "adminmention",
    version: "1.3.2",
    author: "〲亗 SIYAM HASAN 亗",
    countDown: 0,
    role: 0,
    shortDescription: "Replies angrily when someone tags admins",
    longDescription: "If anyone mentions an admin, bot will angrily reply with random messages.",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const adminIDs = ["61568411310748", "61584641872032", ""].map(String);

    // Skip if sender is admin
    if (adminIDs.includes(String(event.senderID))) return;

    // যদি কেউ মেনশন দেয়
    const mentionedIDs = event.mentions ? Object.keys(event.mentions).map(String) : [];
    const isMentioningAdmin = adminIDs.some(id => mentionedIDs.includes(id));

    if (!isMentioningAdmin) return;

    // র‍্যান্ডম রাগী রিপ্লাই
    const REPLIES = [
      " বস কে মেনশন দিলে তোর নানির খালি ঘর 😩🐸",
      "বস এক আবাল তুমারে ডাকতেছে 😂😏",
      " বুকাচুদা তুই মেনশন দিবি না আমার বস রে 🥹",
      "মেনশন দিছস আর বেচে যাবি? দারা বলতাছি 😠",
      "বস কে মেনশন দিলে তোর নানির খালি ঘর 😩🐸"
      "「😏🔥」এই যে বস সিয়ামরে মেনশন দিছস… তোর লাইফ আপডেট লাগবো 💀",
"「😂⚡」বস সিয়ামরে ডাকছস? হালকা পাগল নাকি ফুল ভার্সন? 😈",
"「😤💣」এইখানে বস সিয়ামরে ট্যাগ মানে নিজে নিজে ধরা খাওয়া 😏",
"「🐸🔥」বস সিয়াম ঘুমাইতেছিল… তুই এখন স্বপ্নে গিয়ে মার খাবি 😭",
"「😈⚠️」বস সিয়াম অনলাইন = তোর অফলাইন শুরু 😎",
"「😂💀」এইটা মেনশন না ভাই… আত্মহত্যা attempt 😏",
"「🔥😤」বস সিয়ামরে ডাকছস… এখন কান্দার প্রস্তুতি নে 😈",
"「😎💣」তুই কি বস সিয়ামরে চেনস? না চিনে ট্যাগ দিছস? 😏",
"「🐸⚡」এইবার বস সিয়াম তোরে special care দিবে 😭",
"「😈🔥」বস সিয়ামরে ডিস্টার্ব = free মার 😤"「😂😏」এইটা ভুল না ভাই… ভুলের বাবা 😈",
"「🔥💀」বস সিয়ামরে ট্যাগ দিছস… এখন RIP ready রাখ 😎",
"「😤⚡」তোর সাহস বেশি… কিন্তু লাইফ কম 😏",
"「🐸💣」এইবার বস সিয়াম তোরে roast না grill করবো 🔥",
"「😈🔥」চুপচাপ থাকলে বাঁচতি… এখন বস সিয়াম আসতেছে 😏",
"「😂⚠️」Danger না ভাই… Ultra Danger 😈",
"「🔥😎」বস সিয়ামরে mention = premium problem 😤",
"「😏💀」এইখানে বস সিয়ামরে ডাকলে free offer পাইসোস 😈",
"「🐸⚡」তোর নাম এখন hit list এ 😭",
"「😈💣」বস সিয়াম incoming… hide কর 😏",
"「😂🔥」এইটা খেলা না ভাই… বস সিয়াম এর exam 😈",
"「😤⚡」তুই fail already 😏",
"「💀🔥」বস সিয়ামরে ডাকছস… কবরে wifi লাগবো? 😭",
"「😈🐸」এইটা comedy না tragedy শুরু 😏",
"「🔥💣」Boom ready… বস সিয়াম typing… 😈",
"「😂😤」এইটা joke না… real danger 😏",
"「⚡🔥」বস সিয়াম mood = off… তোর life = finish 😈",
"「🐸💀」তুই নিজের কপাল নিজে পোড়াইছস 😭",
"「😈⚠️」Last warning skip করছস 😏",
"「🔥😎」এখন বস সিয়াম full form এ আসবো 😤",
"「😂💣」এইটা mention না… summon 😈",
"「😤🔥」boss summon complete 😏",
"「🐸⚡」তুই এখন NPC 😭",
"「😈💀」main character = বস সিয়াম 😎",
"「🔥😏」তোর story এখানেই শেষ 😤",
"「😂⚠️」Game over screen আসতেছে 😈",
"「🐸🔥」respawn নাই 😭",
"「😈💣」save option disable 😏",
"「⚡😎」boss fight start 🔥",
"「💀😤」winner already fixed 😈",
"「😂🔥」বস সিয়ামরে ডিস্টার্ব = নিজেরে roast করা 😏",
"「😈⚡」তুই নিজেই নিজের meme বানাইলি 😭",
"「🐸💣」এখন বস সিয়াম তোরে viral করবে 😏",
"「🔥😤」এইটা ending না… bad ending 😈",
"「😎⚠️」try again option নাই 😏",
"「💀🔥」hard mode চালু হইছে 😤",
"「😈🐸」তুই beginner level এই মারা গেছস 😭",
"「🔥💣」boss সিয়াম OP 😎",
"「😂⚡」balance নাই… only damage 😈",
"「😤💀」GG bro 😏"
    ];

    const randomReply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
    return message.reply(randomReply);
  }
};
