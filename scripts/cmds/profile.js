module.exports = {
  config: {
    name: "profile",
    aliases: ["pfp"],
    version: "1.1",
    author: "xnil",
    countDown: 5,
    role: 0,
    shortDescription: "PROFILE image",
    longDescription: "PROFILE image",
    category: "image",
    guide: {
      en: "   {pn} @tag"
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn lấy ảnh đại diện"
    },
    en: {
      noTag: "You must tag the person you want to get the profile picture of"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    let avatarUrl;
    const uid1 = event.senderID;
    const uid3 = args[0];  // If a direct ID is provided in the arguments
    const uid2 = Object.keys(event.mentions)[0];

    if (event.type === "message_reply") {
      avatarUrl = await usersData.getAvatarUrl(event.messageReply.senderID);
    } else if (uid2) {
      avatarUrl = await usersData.getAvatarUrl(uid2);
    } else if (uid3) {
      avatarUrl = await usersData.getAvatarUrl(uid3);
    } else {
      avatarUrl = await usersData.getAvatarUrl(uid1);
    }
    message.reply({
      body: "🌟Profile pic💫",
      attachment: await global.utils.getStreamFromURL(avatarUrl)
    });
  }
};
