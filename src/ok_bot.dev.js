"use strict";

var Discord = require('discord.js');

var client = new Discord.Client();
client.login(process.env.token);
console.log(process.env.okCount);
okCount = parseInt(process.env.okCount);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

client.on("ready", function () {
  console.log("Connected as: " + client.user.tag);
  client.user.setActivity("ok...");
});
client.on("message", function (message) {
  var okChannel = client.channels.cache.get("819925987268755456");
  if (message.channel == "819925987268755456" && message.content.toLowerCase() != "ok" && message.author.id != "819932513144930314") message["delete"](); //console.log(message.channel);
});
client.on("message", function (message) {
  if (message.content.toLowerCase() == "ok") {
    okCount += 1;
    var okChannel = client.channels.cache.get("819925987268755456");
    okChannel.send("".concat(message.author, ", ok counter is now at ").concat(numberWithCommas(okCount), "!"));
    process.env.okCount = parseString(okCount);
  }
});