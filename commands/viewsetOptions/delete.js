const axios = require(`axios`)
const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed,
    MessageButton
} = require(`discord.js`)
const deleteSet = function (joB, buttonRow, message, userId, gearsetId) {
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

    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1
    })

    buttonRow.edit({
        content: `Are you sure you want to delete your ${joB.label} set?`,
        components: [yesNoButtons]
    })

    collector.on(`collect`, async (interaction) => {
        interaction.deferUpdate()
        const timer = function () {
            collector.stop()
        }
        setTimeout(timer, 30000)
    })

    collector.on(`end`, collected => {
        collected.forEach(item => {
            console.log(item.customId)
        })
    })
}

module.exports = {
    deleteSet
}