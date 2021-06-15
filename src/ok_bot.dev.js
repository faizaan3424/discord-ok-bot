"use strict";

var Discord = require('discord.js');

var cron = require('node-cron');

var client = new Discord.Client();
client.login(process.env.token); //console.log(process.env.okCount);
// React to last message of day with cookie in staff chat

cron.schedule('59 59 23 * * *', function () {
  var cookieChannel = client.channels.cache.get("766654092969771018");
  console.log("Cookie time!");
  cookieChannel.messages.fetch({
    limit: 1
  }).then(function (messages) {
    //const todayDate = new Date().getUTCDate();
    //const cookieDate = new Date(cookieMessage.createdTimestamp).getUTCDate();
    cookieReaction(messages.first());
  })["catch"](console.error);
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cookieReaction(cookieMessage) {
  var cookies, randomCookie, filter, reactions;
  return regeneratorRuntime.async(function cookieReaction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cookies = ["🍪", "<:cookie2:822168019953516585>", "<:cookie3:832742413982105691>", "<:cookie4:841334090774347796>", "<:cookie5:841334348573048862>", "<:cookie6:841334585786761236>", "<:cookie7:841334692271751228>", "<:cookie8:841335151837446154>", "<:cookie9:841335245394935849>", "<:cookie10:841335325879435304>"];
          randomCookie = cookies[Math.floor(Math.random() * cookies.length)];

          filter = function filter(reaction, user) {
            return user.id === client.user.id;
          };

          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(cookieMessage.reactions.cache.size);

        case 6:
          reactions = _context.sent;
          console.log("Cookie count is: ".concat(reactions));

          if (!(reactions === 0)) {
            _context.next = 11;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(cookieMessage.react(randomCookie));

        case 11:
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13]]);
}
/*async function cookieReaction(messages, cookies) {
    let cookieCount;
    const cookieMessage = messages.first();
    const filter = (reaction, user) => user.id === client.user.id

    // Check for "cookie" reactions (reactions from bot that are cookie emojis)
    await cookieMessage.awaitReactions(filter, {time: 1000}).then(collected => {
        console.log(`${cookieMessage.content} has ${collected.size} cookies`);
        cookieCount = collected.size;
        console.log(`Cookie count inside is: ${cookieCount}`);
        }).catch(console.error);
    
    // If the message has no "cookie" reactions, then react with a random cookie emoji
    console.log(`Cookie count outside is: ${cookieCount}`);
    if(cookieCount === 0) cookieMessage.react(cookies[Math.floor(Math.random() * cookies.length)]).catch(console.error);
}*/


client.on("ready", function () {
  console.log("Connected as: " + client.user.tag);
  client.user.setActivity("please help! staff has kidnapped me and made me their slave...");
});
client.on("message", function (message) {
  var devChannel = client.channels.cache.get("756599993481297951");

  var delay = function delay(ms) {
    return new Promise(function (res) {
      return setTimeout(res, ms);
    });
  }; // Count ok's


  if (message.content.toLowerCase() == "ok") {
    var okChannel = client.channels.cache.get("819925987268755456");
    var okCounterChannel = client.channels.cache.get("821395045256003604");
    okCounterChannel.messages.fetch({
      limit: 1
    }).then(function (messages) {
      var lastMessage = messages.first();
      okCount = parseInt(lastMessage.content) + 1;
      console.log("Ok count is now at: ".concat(okCount));
      okChannel.send("".concat(message.author, ", ok counter is now at ").concat(numberWithCommas(okCount), "!"));
      okCounterChannel.send(okCount);
    })["catch"](console.error); //process.env.okCount = toString(okCount);
    //console.log(`Ok count modified to ${process.env.okCount}`);
  } // React to Cookie Messages:
  else if (message.content.includes("cookie")) cookieReaction(message); // Delete non-ok messages:


  if (message.channel == "819925987268755456" && message.content.toLowerCase() != "ok" && message.author.id != "819932513144930314") message["delete"](); // Totally non-biased programming

  if (message.mentions.has(client.user) && message.mentions.members.size == 1) message.reply("Faizaan is the most awesome person in the world and is super cool and offline and he did not program me to say this.");
  ;
});