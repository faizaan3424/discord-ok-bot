const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.token);
//console.log(process.env.okCount);
//okCount = parseInt(process.env.okCount)

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
        const okChannel = client.channels.cache.get("819925987268755456");
        const okCounterChannel = client.channels.cache.get("821395045256003604");

        okCounterChannel.messages.fetch({ limit: 1 }).then(messages => {
        let lastMessage = messages.first();

        okCount = lastMessage.content;
        })
        .catch(console.error);
        
        okCount += 1;
        okChannel.send(`${message.author}, ok counter is now at ${numberWithCommas(okCount)}!`);

        okCounterChannel.send(okCount);
        //process.env.okCount = toString(okCount);
        //console.log(`Ok count modified to ${process.env.okCount}`);
    }
});