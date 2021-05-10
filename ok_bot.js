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
    let lastCookieMessage;
    let d;
    const cookies = [
        "🍪",
        "<:cookie2:822168019953516585>",
        "<:cookie3:832742413982105691>",
        "<:cookie4:841334090774347796>",
        "<:cookie5:841334348573048862>",
        "<:cookie6:841334585786761236>",
        "<:cookie7:841334692271751228>",
        "<:cookie8:841335151837446154>",
        "<:cookie9:841335245394935849>",
        "<:cookie10:841335325879435304>",
    ]
    

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
        //message.reply("no u")
        
        message.react(cookies[Math.floor(Math.random() * cookies.length)]).catch(console.error);
    }
    // For dev channel:
    else if(message.channel == "756599993481297951" && message.author.id != "819932513144930314") {
        if(!lastCookieMessage) {
            lastCookieMessage = message;
            console.log(!lastCookieMessage);
        }
        d = new Date(message.createdTimestamp);
        dateNow = [d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()]
        d = new Date(lastCookieMessage.createdTimestamp);
        dateLast = [d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()]

        message.react(cookies[Math.floor(Math.random() * cookies.length)]).catch(console.error);
        message.reply(`This message sent at: ${dateNow}. The last message was sent at: ${dateLast}`)
    }
});