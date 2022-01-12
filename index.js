const {
  Client,
  Intents,
  MessageCollector,
  CommandInteractionOptionResolver,
  MessageFlags,
} = require("discord.js");
const commandHandler = require("./commands")
const dotenv = require("dotenv").config();
const getUser = require("./commands/testing");
const dataArrays = require("./dataArrays");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("bot is ready");
});

client.on("messageCreate", commandHandler);

client.login(process.env.TOKEN);
