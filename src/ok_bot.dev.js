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
}); // React with cookie:

client.on("message", function (message) {
  var cookieChannel = client.channels.cache.get("841307474626871296");
  if (message.channel == "841307474626871296") message.react('🤔').then(console.log)["catch"](console.error);
}); // Delete non-ok messages:

client.on("message", function (message) {
  if (message.channel == "819925987268755456" && message.content.toLowerCase() != "ok" && message.author.id != "819932513144930314") message["delete"](); //console.log(message.channel);
}); // Count ok's

client.on("message", function (message) {
  if (message.content.toLowerCase() == "ok") {
    var okChannel = client.channels.cache.get("819925987268755456");
    var okCounterChannel = client.channels.cache.get("821395045256003604");
    okCounterChannel.messages.fetch({
      limit: 1
    }).then(function (messages) {
      var lastMessage = messages.first();
      okCount = parseInt(lastMessage.content) + 1;
      console.log(okCount);
      okChannel.send("".concat(message.author, ", ok counter is now at ").concat(numberWithCommas(okCount), "!"));
      okCounterChannel.send(okCount);
    })["catch"](console.error); //process.env.okCount = toString(okCount);
    //console.log(`Ok count modified to ${process.env.okCount}`);
  }
});