module.exports = {
    name:'collector',
    description: 'testing',
    execute(message, args) {
        message.reply("Oh HI mark.")
        console.log(`it's working!`)
    }
}