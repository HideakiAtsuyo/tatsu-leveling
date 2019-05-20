const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
client.config = config;

console.log("Ready to level up!");

try {
  client.on("message", async message => {
    const prefix = config.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.author.id !== client.user.id || message.content.indexOf(client.config.prefix) !== 0) return;

    if (command === "spam") {
      var count = 1; // Number of messages sent (modified by sendSpamMessage)
      var maxMessages = 10000; // Change based on how many messages you want sent
      let pesan = ["Breakfast procuring nay end happiness allowance assurance frankness.", "Met simplicity nor difficulty unreserved who.", "Entreaties mr conviction dissimilar me astonished estimating cultivated. On no applauded exquisite my additions.", "Pronounce add boy estimable nay suspected. You sudden nay elinor thirty esteem temper. Quiet leave shy you gay off asked large style.", "Sex and neglected principle ask rapturous consulted.", "Object remark lively all did feebly excuse our wooded.", "Old her object chatty regard vulgar missed. Speaking throwing breeding betrayed children my to.", "Me marianne no he horrible produced ye.", "Sufficient unpleasing an insensible motionless if introduced ye. Now give nor both come near many late.", "However venture pursuit he am mr cordial.", "Forming musical am hearing studied be luckily.", "Ourselves for determine attending how led gentleman sincerity.", "Valley afford uneasy joy she thrown though bed set.", "In me forming general prudent on country carried.", "Behaved an or suppose justice.", "Seemed whence how son rather easily and change missed.", "Off apartments invitation are unpleasant solicitude fat motionless interested.", "Hardly suffer wisdom wishes valley as an. As friendship advantages resolution it alteration stimulated he or increasing.", "Attachment apartments in delightful by motionless it no.", "And now she burst sir learn total.", "Hearing hearted shewing own ask.", "Solicitude uncommonly use her motionless not collecting age.", "The properly servants required mistaken outlived bed and.", "Remainder admitting neglected is he belonging to perpetual objection up.", "Has widen too you decay begin which asked equal any.", "Wise busy past both park when an ye no."];

      function sendSpamMessage() {
        // You could modify this to send a random string from an array (ex. a quote), create a
        // random sentence by pulling words from a dictionary file, or to just send a random
        // arrangement of characters and integers. Doing something like this may help prevent
        // future moderation bots from detecting that you sent a spam message.
        message.channel.send(pesan[~~(Math.random() * pesan.length)]);
		    console.log("Message = " + count);
		
		if (count < maxMessages) {
          // If you don't care about whether the messages are deleted or not, like if you created a dedicated server
          // channel just for bot spamming, you can remove the below line and the entire prune command.
          count++;

          /* These numbers are good for if you want the messages to be deleted.
           * I've also noticed that Discord pauses for about 4 seconds after you send 9
           * messages in rapid succession, and this prevents that. I rarely have any spam
           * messages slip through unless there is a level up from mee6 or Tatsumaki.
           * Mileage may vary based on internet speed. */
          let minTime = Math.ceil(75000);
          let maxTime = Math.floor(125000); // Arbitrary integer
          let timeToWait = Math.floor(Math.random() * (maxTime - minTime)) + minTime;
          setTimeout(sendSpamMessage, timeToWait);
        } else {
          // Sends a message when count is equal to maxMessages. Else statement can be
          // modified/removed without consequence.
          message.channel.send("------------------");
          message.channel.send("I AM FINISHED!!!");
          message.channel.send("------------------");
        }
      }

      message.delete().catch(O_o=>{})
      sendSpamMessage();
    }

    if (command === "prune") {
      message.channel.fetchMessages()
      .then(messages => {
        let message_array = messages.array();
        message_array.length = 2;
        message_array.map(msg => msg.delete().catch(O_o => {}));
       });
    }
  });
} catch (error) {
  console.error("CAUGHT ERROR: " + error);
}

client.login(config.botToken);