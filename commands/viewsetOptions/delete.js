const axios = require(`axios`)
const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed,
    MessageButton
} = require(`discord.js`)
const deleteSet = function (joB, buttonRow, userId, gearsetId) {
    const yesNoButtons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`Yes`)
                .setLabel(`Yes`)
                .setStyle(`SUCCESS`))
        .addComponents(
            new MessageButton()
                .setCustomId(`No`)
                .setLabel(`No`)
                .setStyle(`DANGER`)
        )

    buttonRow.edit({
        content: `Are you sure you want to delete your ${joB.label} set?`,
        components: [yesNoButtons]
    })
}

module.exports = {
    deleteSet
}