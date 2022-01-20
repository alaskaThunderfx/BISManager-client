const {
  Client,
  Intents,
  MessageCollector,
  CommandInteractionOptionResolver,
  MessageFlags,
  DiscordAPIError,
  Message,
  InteractionCollector,
} = require("discord.js");
const commandHandler = require("./commandHandler");
const dotenv = require("dotenv").config();
const s = require(`./commands/s`)

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  console.log("bot is ready");
});

// working code for command handler
client.on("messageCreate", commandHandler);

// interaction collector attempt
// client.on(`messageCreate`, async (message) => {
//   if (message.content === `xx`) {
//     const collector = message.createMessageComponentCollector({
//       componentType: `SELECT_MENU`,
//       time: 15000,
//     });

//     collector.on(`collect`, (i) => {
//       console.log;
//     });
//   }
// });

// client.on(`eventCreate`, (event) => {
//   console.log(event);
// });

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  console.log(interaction.values)
});

client.login(process.env.TOKEN);

module.exports = {
  client,
};
