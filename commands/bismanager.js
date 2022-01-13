const axios = require('axios');

module.exports = {
  name: "bismanager",
  description: "brings up main bismanager menu",
  async execute(message, args) {
    let rollingMessage;
    await message
      .reply(
        "Retrieving that information for you... I know I left it around here somewhere..."
      )
      .then((msg) => (rollingMessage = msg));
    const userNames = [];
    const response = await axios.get(
      "https://dry-depths-80800.herokuapp.com/users"
    );
    response.data.forEach((entry) => userNames.push(entry.user));
    if (userNames.includes(message.author.username)) {
      await rollingMessage.edit(`Hello ${message.author.username}! Here are the available commands for BISManager!
      !setbis    (helps you set up your BIS for this raid tier)
      !viewset   (shows your current set, if it exists)
      !updateset (allows you to update your set as you obtain pieces!)
      !loot      (shows you what loot you need from each raid)`);
    } else {
      await rollingMessage.edit({
        content: `Hello ${message.author.username}! Nice to meet you! You've been added to the BISManager users! Please type !bismanager to see a list of commands!`,
      });
      await axios
        .post("https://dry-depths-80800.herokuapp.com/users", {
          user: message.author.username,
        })
        .then(console.log("New User Created"));
    }
  },
};
