const Discord = require("discord.js");
const client = require("./index");
const fs = require("fs");
const prefix = "!";
const { getUserId } = require(`./helperfunctions`)

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

module.exports = async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase()

  if (command === `collector`) {
    client.commands.get('collector').execute(message, args);
  }

  if (command === "bismanager") {
    client.commands.get('bismanager').execute(message, args)
  }
  if (command === "viewset") {
    client.commands.get('viewset').execute(message, args)
  }
  if (command === `setbis`) {
    client.commands.get('setbis').execute(message, args)
  }

  if (command === `updateset`) {
    client.commands.get('updateset').execute(message, args)
  }

  if (command === `loot`) {
    client.commands.get('loot').execute(message, args)
  }

  if (command === 'teams') {
    client.commands.get('teams').execute(message, args)
  }

  if (command === `s`) {
    client.commands.get(`s`).execute(message, args)
  }
};
