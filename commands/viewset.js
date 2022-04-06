const axios = require(`axios`)
const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed,
    MessageButton,
    Message
} = require("discord.js");
const { options } = require("nodemon/lib/config");
const { slot } = require(`../dataArrays`)
const { getUserInfo, viewSetsHandler, embedColorPicker, embedIconPicker } = require(`../helperfunctions`)
const { deleteSet } = require(`./viewsetOptions/delete`)

module.exports = {
    name: `viewset`,
    description: `Allows the user to view the gear sets they've made.`,
    async execute(message, args) {
        const items = []
        const ids = []
        let idObj = {}
        let buttonRow
        let rollingMessage;
        await message
            .reply(
                "Retrieving that information for you... I know I left it around here somewhere..."
            )
            .then((msg) => (rollingMessage = msg));
        const jobs = []
        let joB
        const userInfo = await getUserInfo(message)
        idObj[`userId`] = userInfo._id

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
            max: 2
        })


        collector.on(`collect`, async (interaction) => {
            interaction.deferUpdate()
            const timer = function () {
                collector.stop()
            }
            setTimeout(timer, 30000)

            try {
                if (interaction.isSelectMenu()) {
                    for (const set in sets) {
                        if (sets[set][interaction.values[0]]) {
                            joB = sets[set][interaction.values[0]]
                        }
                    }
                    let counter = 0

                    for (const set in userSets) {
                        if (userSets[set].job === joB.value) {
                            idObj[`gersetId`] = userSets[set]._id
                            ids.push(idObj)
                            for (const [key, value] of Object.entries(userSets[set])) {
                                if (key !== `job` && counter !== 11) {
                                    let obj = {}
                                    obj[slot[counter]] = {
                                        name: value.name,
                                        doesHave: value.doesHave
                                    }
                                    items.push(obj)
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
                    await message.channel.send({ content: `*What would you like to do with this set?*`, components: [options] }).then(rply => buttonRow = rply)
                }
                return
            } catch { console.error }
        })

        collector.on(`end`, collected => {
            console.log(ids)
            let button
            collected.forEach(item => {
                if (!item.values) button = item.customId
            })
            switch (button) {
                case 'Update':
                console.log(`You're in update now!`)
                    break
                case `Delete`:
                    console.log(`You're in Delete now!`)
                    deleteSet(joB, buttonRow, message)
                    console.log(button)
                    break
                case `Finished`:
                    console.log(button)
                    buttonRow.edit({
                        content: `*All done! Thank you!*`,
                        components: []
                    })
                    break
                default:
                    break
            }
            return
        })
    }
}