const axios = require("axios"); 
const TinyURL = require('tinyurl');
module.exports = {
  config: {
    name: "imgur",
    aliases: [`ig`],
    version: "1.0",
    author: "xnil",
    countDown: 0,
    role: 0,
    shortDescription: "upload any images in imgur server..",
    longDescription: "upload any images in imgur server..",
    category: "utility",
    guide: "{pn} reply or add link of image"
  },

  onStart: async function ({ api, event }) {
    const xnil = event.messageReply.attachments[0].url || args.join(" ");
    
    if(!xnil) return api.sendMessage('Please reply or enter the link 1 image!!!', event.threadID, event.messageID)
    
    const shortenedUrl = await TinyURL.shorten(xnil);
    const response = await axios.get(`https://xnilnew404.onrender.com/xnil/imgur?url=${shortenedUrl}`);
const x = response.data.uploaded.image;
    
  return api.sendMessage(`${x}`, event.threadID, event.messageID)
  }
};
