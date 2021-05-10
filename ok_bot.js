const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.token);
//console.log(process.env.okCount);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

client.on("ready", () => {
    console.log("Connected as: " + client.user.tag);
    client.user.setActivity("please help! staff has kidnapped me and made me their slave...");
});

client.on("message", (message) => {
    // Count ok's
    if(message.content.toLowerCase() == "ok") {
        const okChannel = client.channels.cache.get("819925987268755456");
        const okCounterChannel = client.channels.cache.get("821395045256003604");

        okCounterChannel.messages.fetch({ limit: 1 }).then(messages => {
        let lastMessage = messages.first();
        okCount = parseInt(lastMessage.content) + 1;

        console.log(`Ok count is now at: ${okCount}`);
        okChannel.send(`${message.author}, ok counter is now at ${numberWithCommas(okCount)}!`);
        okCounterChannel.send(okCount);
        })
        .catch(console.error);
        
        //process.env.okCount = toString(okCount);
        //console.log(`Ok count modified to ${process.env.okCount}`);
    }

    // Delete non-ok messages:
    if(message.channel == "819925987268755456" && message.content.toLowerCase() != "ok" && message.author.id != "819932513144930314") message.delete();

    // React with cookie:
    else if(message.channel == "766654092969771018" && message.author.id != "819932513144930314") {
        //message.reply("no u");
        message.react('<:ban_hammer:789631435002216488:>').catch(console.error);
    }
});