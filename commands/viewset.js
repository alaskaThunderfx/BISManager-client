const axios = require(`axios`)
const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed,
    MessageButton
} = require("discord.js");
const { slot } = require(`../dataArrays`)
const { getUserInfo, viewSetsHandler, embedColorPicker, embedIconPicker } = require(`../helperfunctions`)

module.exports = {
    name: `viewset`,
    description: `Allows the user to view the gear sets they've made.`,
    async execute(message, args) {
        let rollingMessage;
        await message
            .reply(
                "Retrieving that information for you... I know I left it around here somewhere..."
            )
            .then((msg) => (rollingMessage = msg));
        const jobs = []
        const userInfo = await getUserInfo(message)


        if (userInfo.gearSets.length === 0) {
            rollingMessage.delete()
            message.reply(`You haven't added any gear sets yet!`)
            return
        }
        rollingMessage.delete()
        const userSets = userInfo.gearSets
        for (const set in userInfo.gearSets) {
            jobs.push(userInfo.gearSets[set].job)
        }
        const sets = viewSetsHandler(jobs)
        const forTheMenu = []

        for (const job in sets) {
            forTheMenu.push(sets[job][Object.keys(sets[job])])
        }
        const embed = new MessageEmbed().setTitle(`Here's the jobs you have sets for!`);
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId(`sets`)
                .setPlaceholder(`Choose the set you'd like to view.`)
                .addOptions(forTheMenu)
        )

        await message.reply(`Hey there, ${message.member.displayName}!`)
        const dropdown = await message.channel.send({ embeds: [embed], components: [row] })

        const filter = (interaction) => interaction.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1
        })

        collector.on(`collect`, async (interaction) => {
            interaction.deferUpdate()
            try {
                if (interaction.isSelectMenu()) {
                    let joB
                    for (const set in sets) {
                        if (sets[set][interaction.values[0]]) {
                            joB = sets[set][interaction.values[0]]
                        }
                    }
                    let counter = 0

                    for (const set in userSets) {
                        if (userSets[set].job === joB.value) {
                            for (const [key, value] of Object.entries(userSets[set])) {
                                if (key !== `job` && counter !== 11) {
                                    embed.addField(
                                        `${slot[counter]}`,
                                        `${value.doesHave ? `~~${value.name}~~` : `${value.name}`}`,
                                        false
                                    )
                                    counter++
                                }
                            }

                        }
                    }

                    embed
                        .setColor(embedColorPicker(joB.value))
                        .setTitle(`${joB.label}`)
                        .setAuthor({
                            name: `${message.member.displayName}`,
                            iconURL: `${message.author.avatarURL()}`,
                        })
                        .setDescription(`*Best in slot*`)
                        .setThumbnail(`${embedIconPicker(joB)}`);
                    await dropdown.edit({
                        embeds: [embed],
                        components: []
                    })
                    const options = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId(`Update`)
                                .setLabel(`Update`)
                                .setStyle(`SUCCESS`)
                        )
                        .addComponents(
                            new MessageButton()
                            .setCustomId(`Delete`)
                            .setLabel(`Delete`)
                            .setStyle(`DANGER`)
                        )
                        .addComponents(
                            new MessageButton()
                            .setCustomId(`Finished`)
                            .setLabel(`Finished`)
                            .setStyle(`SECONDARY`)
                        )
                    message.channel.send({ content: `*What would you like to do with this set?*`, components: [options]})
                } else {

                }
            } catch { console.error }
        })

        collector.on(`end`, collected => {
            return
        })
    }
}