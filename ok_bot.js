const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.token);
okCount = 0

client.on("ready", () => {
    console.log("Connected as: " + client.user.tag);
    client.user.setActivity("ok...");
});

client.on("message", (message) => {
    const okChannel = client.channels.cache.get("819925987268755456");
    if(message.channel == "819925987268755456" && message.content.toLowerCase() != "ok" && message.author.id != "819932513144930314") message.delete();
    //console.log(message.channel);
});

client.on("message", (message) => {
    if(message.content.toLowerCase() == "ok") {
        okCount += 1;
        const okChannel = client.channels.cache.get("819925987268755456");
        okChannel.send(`${message.author}, Ok counter is now at ${okCount}!`);
    }
});
