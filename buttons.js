const { MessageActionRow, MessageButton } = require("discord.js");

const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`dick`)
        .setEmoji("👌")
        .setLabel("eat a dick")
        .setStyle("SUCCESS")
    )
    .addComponents(
        new MessageButton()
        .setCustomId('othadiock')
        .setEmoji('😒')
        .setLabel(`eat something else`)
        .setStyle('SUCCESS')
    );

module.exports = row