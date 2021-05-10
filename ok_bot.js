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
    const cookie1 = "U+1F36A";
    const cookie2 = "<:cookie2:822168019953516585>";
    const cookie3 = "<:cookie3:832742413982105691>";
    const cookie4 = "<:cookie4:841334090774347796>";
    const cookie5 = "<:cookie5:841334348573048862>";
    const cookie6 = "<:cookie6:841334585786761236>";
    const cookie7 = "<:cookie7:841334692271751228>";
    const cookie8 = "<:cookie8:841335151837446154>";
    const cookie9 = "<:cookie9:841335245394935849>";
    const cookie10 = "<:cookie10:841335325879435304>";

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
        message.react(cookie1).catch(console.error);
    }
});