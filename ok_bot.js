const Discord = require('discord.js');
var cron = require('node-cron');
const client = new Discord.Client();
client.login(process.env.token);
//console.log(process.env.okCount);

// React to last message of day with cookie in staff chat
cron.schedule('59 59 23 * * *', () => {
    const cookieChannel = client.channels.cache.get("756599993481297951");
        cookieChannel.messages.fetch({limit: 1}).then(messages => {
        //const todayDate = new Date().getUTCDate();
        //const cookieDate = new Date(cookieMessage.createdTimestamp).getUTCDate();
        cookieReaction(messages.first(), cookies);
    }).catch(console.error)
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function cookieReaction(cookieMessage, cookies) {
    const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
    const filter = (reaction, user) => user.id === client.user.id;

    try {
        //const reactions = await cookieMessage.awaitReactions(filter, {time: 1000});
        const reactions = await cookieMessage.reactions.cache.size 
        console.log(`Cookie count is: ${reactions}`);
    
        if (reactions === 0) await cookieMessage.react(randomCookie);
    }
    catch (error) {
        console.error(error);
    }
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

client.on("ready", () => {
    console.log("Connected as: " + client.user.tag);
    client.user.setActivity("please help! staff has kidnapped me and made me their slave...");
});

client.on("message", (message) => {
    const devChannel = client.channels.cache.get("756599993481297951");
    const delay = ms => new Promise(res => setTimeout(res, ms));
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
});