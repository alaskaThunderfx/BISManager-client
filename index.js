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
  // if (!interaction.isSelectMenu() || !interaction.isButton()) return;
  // const interactionUser = [interaction.user.username, interaction.user.discriminator]
  // const messageUser = []
  // console.log(interaction.message.author.id)
  // console.log(interaction.user.id)
  // console.log(interaction.message.id)
  // console.log(interaction.id)
  // console.log(interaction.author.id)
  // interaction.values ? console.log(`interaction.values in interactionCreate:\n${interaction.values}`) : console.log(`interaction.customId in interactionCreate:\n${interaction.customId}`)
});

client.login(process.env.TOKEN);

module.exports = {
  client,
};
