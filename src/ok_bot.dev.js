"use strict";

var Discord = require('discord.js');

var client = new Discord.Client();
client.login(process.env.token); //console.log(process.env.okCount);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            date = new Date(); //console.log(date)
            //if(date.getHours === 8 && date.getMinutes === 57, date.getSeconds === 0) {

            cookieChannel = client.channels.cache.get("756599993481297951");
            _context.next = 4;
            return regeneratorRuntime.awrap(delay(500));

          case 4:
            cookieChannel.messages.fetch({
              limit: 1
            }).then(function (messages) {
              var cookieMessage = messages.first();

              var filter = function filter(reaction, user) {
                return user.id === client.user.id;
              };

              cookieMessage.awaitReactions(filter, {
                time: 1000
              }).then(function (collected) {
                if (!collected.size) {
                  console.log("".concat(cookieMessage.content, " has ").concat(collected.size, " cookies: I am reacting..."));
                  cookieMessage.react(cookies[Math.floor(Math.random() * cookies.length)])["catch"](console.error);
                }
              })["catch"](console.error); //message.reply(`This message sent at: ${dateNow}. The last was sent at: ${d}`)
            })["catch"](console.error); //}

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }, 1 * 1000);
});