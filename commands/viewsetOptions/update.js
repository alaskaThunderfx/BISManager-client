const { default: axios } = require(`axios`)
const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed,
    MessageButton
} = require(`discord.js`)
const updateSet = async function (buttonRow, message) {
    // This will change buttonRow to a drop down of all the gear pieces
    const gearSlot = new MessageSelectMenu()
        .addOptions() 

    buttonRow.edit({
        content: `Hi`
    })
}

module.exports = {
    updateSet
}