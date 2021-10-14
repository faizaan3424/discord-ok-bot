const Discord = require('discord.js');
var cron = require('node-cron');
const client = new Discord.Client();
client.login(process.env.token);
//console.log(process.env.okCount);

async function cookieReaction(cookieMessage) {
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

// React to last message of day with cookie in staff chat
cron.schedule('59 59 23 * * *', () => {
    const cookieChannel = client.channels.cache.get("766654092969771018");
    console.log("Cookie time!");
    cookieChannel.messages.fetch({ limit: 1 }).then(messages => {
        //const todayDate = new Date().getUTCDate();
        //const cookieDate = new Date(cookieMessage.createdTimestamp).getUTCDate();
        cookieReaction(messages.first());
    }).catch(console.error)
}, {
    scheduled: true,
    timezone: "America/Toronto",
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

client.on("ready", () => {
    console.log("Connected as: " + client.user.tag);
    client.user.setActivity("please help! staff has kidnapped me and made me their slave...");
});

client.on("message", (message) => {
    const devChannel = client.channels.cache.get("756599993481297951");
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // Count ok's
    if (message.content.toLowerCase() == "ok") {
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
    } // React to Cookie Messages:
    //else if (message.content.includes("cookie")) cookieReaction(message);

    // Delete non-ok messages:
    if (message.channel == "819925987268755456" && message.content.toLowerCase() != "ok" && message.author.id != "819932513144930314") message.delete();

    // Auto-responder for staff chat:
    if (message.content.includes("ok? ") && message.author.id == "648204656853647371") {
        //const staffChannel = client.channels.cache.get("766654092969771018");
        message.channel.send(message.content.slice(4));
        message.delete();
    }

    // Totally non-biased programming:
    if (message.mentions.has(client.user) && message.mentions.members.size == 1 && message.author.id != client.user.id) message.reply("Faizaan is the most awesome person in the world and is super cool and offline and he did not program me to say this.");;

    // Aarav spamming:
    const victimChannel = client.channels.cache.get("766654092969771018");
    const victim = client.users.fetch(user => user.id === "648204656853647371").then(user => {
        //console.log(`${user.id}'s status is ${user.presence.status}.`);
    if (user.presence.status == "offline") {
        victimChannel.send(user.id).then(msg => msg.delete(350));
    } 
    });
    

});