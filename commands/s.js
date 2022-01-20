const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const { Client, Message, MessageEmbed } = require(`discord.js`);
const dataArrays = require(`./../dataArrays`);
const followup = require(`./sa`)

module.exports = {
  name: `s`,
  description: `test`,
  async execute(message, args) {
      console.log(message.author)
    let msg;
    let value;
    let job

    const embed = new MessageEmbed().setTitle(`Choose an option`);
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId(`job`)
        .setPlaceholder(`Select an option, please!`)
        .addOptions(dataArrays.jobjects)
    );
    

    await message.reply(`Hi there, ${message.member.displayName}!`);
    await message.channel
      .send({ embeds: [embed], components: [row] })
      .then((input) => (msg = input));

    const filter = (interaction) =>
      interaction.isSelectMenu() && interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 1,
    });

    collector.on("collect", async (interaction) => {
      value = interaction.values[0];
      interaction.deferUpdate();
      console.log(interaction.componentType)
    });

    collector.on(`end`, async (collected) => {
      job = dataArrays.jobjects.find(j => j.value === collected.first().values[0])
      let icon
      for (const [key, value] of Object.entries(dataArrays.jobicons)) {
          if (key === job.value.toUpperCase()) {
              icon = value
          }
      }

      embed
      .setColor(`#000f85`)
      .setTitle(`${job.label}`)
      .setAuthor({name: `${message.member.displayName}`, iconURL: `${message.author.avatarURL()}`})
        .setDescription(`*Best in slot*`)
        .setThumbnail(`${icon}`)

      await msg.edit({
        content: `Okay, great! Let's make a set for ${job.emoji}${job.label}!`,
        components: [],
        embeds: [embed],
      });
      console.log(msg)
      console.log(embed)
      followup.execute(message, job, msg, embed)
    });
    
    console.log(job)
    // const gearButtons = new MessageActionRow().addComponents(
        
    // )

    //   Buttons
    //     let msgRoll;
    //     const row = new MessageActionRow()
    //     .addComponents(
    //       new MessageButton()
    //         .setCustomId(`dick`)
    //         .setEmoji("👌")
    //         .setLabel("eat a dick")
    //         .setStyle("SUCCESS")
    //     )
    //     .addComponents(
    //         new MessageButton()
    //         .setCustomId('othadiock')
    //         .setEmoji('😒')
    //         .setLabel(`eat something else`)
    //         .setStyle('SUCCESS')
    //     );
    //     await message
    //       .reply({
    //         content: `hello`,
    //         components: [row],
    //       })
    //       .then((m) => (msgRoll = m));

    //     const filter = (m) => message.author.id === m.user.id;

    //     const collector = message.channel.createMessageComponentCollector({
    //       filter,
    //       max: 1,
    //       time: 15000,
    //     });

    //     collector.on(`collect`, async (interaction) => {
    //       interaction
    //         .reply({
    //           content: `you clicked a button`,
    //         })
    //         .then((msg) => console.log(msg));
    //     });

    //     collector.on(`end`, async (collection) => {
    //       collection.forEach((click) => {
    //         console.log(click.user.id, click.customId);
    //       });

    //       if (collection.first()?.customId === "dick") {
    //       }

    //       await msgRoll.edit({
    //         content: "penis",
    //         components: [],
    //       });
    //     });
  },
};
