const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    aliases: ["owner", "inf"],
    version: "1.0",
    author: "xnil",
    countDown: 20,
    role: 0,
    category: "box chat",
    guide: { en: "" },
    envConfig: {}
  },
  onStart: async function ({ message }) {
    const botName = global.GoatBot.config.nickNameBot;
    const botPrefix = global.GoatBot.config.prefix;
    const authorName = global.GoatBot.config.authorName;
    const ownAge = global.GoatBot.config.age;
    const teamName = "𝐗⃯⃖𝐍⃯⃖𝐈⃯⃖𝐋⃯⃖6𝐗⃯⃖";
    const authorFB = global.GoatBot.config.facebook;
    const authorFB2 = global.GoatBot.config.facebook2;
    const authorInsta = global.GoatBot.config.insta;
    const authorEmail = global.GoatBot.config.email;
    const Bt = "05/02";
    const github = global.GoatBot.config.github;
    const tikTok = "tiktok.com/deepretionking_143";
    const TG = global.GoatBot.config.TG;
    const urls = JSON.parse(fs.readFileSync('xnil.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];
    const now = moment().tz('Asia/Dhaka');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

    message.reply({
      body: `《 🇧🇩𝘽𝙊𝙏 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝙏𝙄𝙊𝙉🇧🇩 》
\===========👑===========
\n🔴𝘽𝙊𝙏-𝙉𝘼𝙈𝙀: ${botName}
\n🟠𝘽𝙊𝙏-𝙋𝙍𝙀𝙁𝙄𝙓: ${botPrefix}
\n⏳𝙐𝙋𝙏𝙄𝙈𝙀: ${uptimeString}
\n🕣𝙏𝙄𝙈𝙀: ${time}
\n⏰𝘿𝘼𝙏𝙀: ${date}
\n\n《 👑𝙊𝙒𝙉𝙀𝙍 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝙏𝙄𝙊𝙉👑 》
   \===========👑===========
\n\n👑𝙊𝙒𝙉𝙀𝙍 𝙉𝘼𝙈𝙀: ${authorName}
\n🗓𝘼𝙂𝙀: ${ownAge}
\n⏳𝘽𝙄𝙍𝙏𝙃𝘿𝘼𝙔: ${Bt}
\n⚓𝙊𝙒𝙉𝙀𝙍 𝙁𝘽: ${authorFB}
\n👑𝙊𝙒𝙉𝙀𝙍 𝙁𝘽: ${authorFB2}
\n🧭𝙊𝙒𝙉𝙀𝙍 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈: ${authorInsta}
\n💌𝙊𝙒𝙉𝙀𝙍 𝙀𝙈𝘼𝙄𝙇: ${authorEmail}
\n🛟𝙊𝙒𝙉𝙀𝙍 𝙏𝙄𝙆𝙏𝙊𝙆: ${tikTok}
\n💌𝙊𝙒𝙉𝙀𝙍 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈𝙀: ${TG}
\n🎀𝙏𝙀𝘼𝙈: ${teamName}
\===========👑===========`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  },
  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
};
