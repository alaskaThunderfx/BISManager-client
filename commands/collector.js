const DiscordJS = require('discord.js')

module.exports = {
    category: 'testing',
    description: 'testing',
    callback: (message) => {
        const questions = [
            `1.1.1`,
            `2.2.2`,
            `3.3.3`
        ]
        let counter = 0

        const filter = m => m.author.id === message.author.id

        const collector = new DiscordJS.MessageCollector(message.channel, filter, {
            max: questions.length,
            time: 15000
        })

        message.channel.send(questions[counter++])
        collector.on('collect', m => {
            if (counter < questions.length) {
                m.channel.send(questions[counter++])
            }
        })

        collector.on('end', collected => {
            console.log(`${collected.size}`)

            let counter = 0
            collected.forEach((value) => {
                console.log(questions[counter++], value.content)
            })
        })
    }
}