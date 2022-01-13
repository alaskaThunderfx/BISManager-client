const {
  Client,
  Intents,
  MessageCollector,
  CommandInteractionOptionResolver,
  MessageFlags,
  DiscordAPIError,
} = require("discord.js");
const commandHandler = require("./commandHandler")
const dotenv = require("dotenv").config();




const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("bot is ready");
});

client.on("messageCreate", commandHandler);

client.login(process.env.TOKEN);

module.exports = {
  client
}