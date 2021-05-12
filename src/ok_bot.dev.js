"use strict";

var Discord = require('discord.js');

var client = new Discord.Client();
client.login(process.env.token); //console.log(process.env.okCount);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cookieReaction(messages, cookies) {
  var cookieMessage, filter, reactions, cookieCount, randomCookie;
  return regeneratorRuntime.async(function cookieReaction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cookieMessage = messages.first();

          filter = function filter(reaction, user) {
            return user.id === client.user.id;
          };

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(cookieMessage.awaitReactions(filter, {
            time: 1000
          }));

        case 5:
          reactions = _context.sent;
          console.log("".concat(cookieMessage.content, " has ").concat(reactions.size, " cookies"));
          cookieCount = collected.size;
          console.log("Cookie count is: ".concat(cookieCount));

          if (!(cookieCount === 0)) {
            _context.next = 13;
            break;
          }

          randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
          _context.next = 13;
          return regeneratorRuntime.awrap(cookieMessage.react(randomCookie));

        case 13:
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          console.error(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 15]]);
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
  };

  var cookies = ["🍪", "<:cookie2:822168019953516585>", "<:cookie3:832742413982105691>", "<:cookie4:841334090774347796>", "<:cookie5:841334348573048862>", "<:cookie6:841334585786761236>", "<:cookie7:841334692271751228>", "<:cookie8:841335151837446154>", "<:cookie9:841335245394935849>", "<:cookie10:841335325879435304>"]; // Count ok's

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
  } // Delete non-ok messages:


  if (message.channel == "819925987268755456" && message.content.toLowerCase() != "ok" && message.author.id != "819932513144930314") message["delete"](); // React with cookie:
  else if (message.channel == "766654092969771018" && message.author.id != "819932513144930314") {} //message.reply("no u")
    //message.react(cookies[Math.floor(Math.random() * cookies.length)]).catch(console.error);
    // Give last message cookie:

  var interval = setInterval(function _callee() {
    var date, cookieChannel;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            date = new Date(); //console.log(date)
            //if(date.getHours === 8 && date.getMinutes === 57, date.getSeconds === 0) {

            cookieChannel = client.channels.cache.get("756599993481297951");
            cookieChannel.messages.fetch({
              limit: 1
            }).then(function (messages) {
              return cookieReaction(messages, cookies);
            })["catch"](console.error); //}

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  }, 1 * 1000);
});