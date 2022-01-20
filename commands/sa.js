const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const dataArrays = require(`./../dataArrays`)

module.exports = {
    async execute(message, job, msg, embed) {
        console.log(embed)
        let option1
        let option2
        for (const [key, value] of Object.entries(dataArrays.weapons)) {
            if (key === job.value.toUpperCase()) {
                option1 = value.raid
                option2 = value.tome
            }
        }

        const one = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId(`${option1}`)
            .setLabel(`${option1}`)
            .setStyle(`SECONDARY`)
        )

        const two = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId(`${option2}`)
            .setLabel(`${option2}`)
            .setStyle(`SECONDARY`)
        )

        message.channel.send({
            content: dataArrays.questions[0],
            components: [one, two]
        })
    }
}