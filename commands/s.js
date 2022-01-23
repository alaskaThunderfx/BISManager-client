const {
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");
const { Client, Message, MessageEmbed } = require(`discord.js`);
const { slot } = require(`./../dataArrays`) 
const dataArrays = require(`./../dataArrays`);
const followup = require(`./sa`);
const { embedColorPicker, embedIconPicker } = require(`./../helperfunctions`);

module.exports = {
  name: `s`,
  description: `test`,
  async execute(message, args) {
    console.log(message.author);
    let msg;
    let btnMsgs;
    let value;
    let job;
    let one;
    let two;
    let option1;
    let option2;
    let qIndex = 0;
    let slotIndex = 0

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

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 2,
    });

    collector.on("collect", async (interaction) => {
      interaction.deferUpdate();
      // User selects job
      job = dataArrays.jobjects.find((j) => j.value === interaction.values[0]);
      if (interaction.isSelectMenu()) {
        // Begin building job/set display embed
        embed
          .setColor(embedColorPicker(job.value))
          .setTitle(`${job.label}`)
          .setAuthor({
            name: `${message.member.displayName}`,
            iconURL: `${message.author.avatarURL()}`,
          })
          .setDescription(`*Best in slot*`)
          .setThumbnail(`${embedIconPicker(job)}`);
        // Update dropdown message with embed
        await msg.edit({
          content: `Okay, great! Let's make a set for ${job.emoji}${job.label}!`,
          components: [],
          embeds: [embed],
        });

        // begin Weapon question, pass through job.value, slot
        // somthing like raidButtonPicker(job.value, slot[slot])

        for (const [key, value] of Object.entries(dataArrays.weapons)) {
          if (key === job.value.toUpperCase()) {
            option1 = value.raid;
            option2 = value.tome;
          }
        }

        one = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`${option1}`)
            .setLabel(`${option1}`)
            .setStyle(`SECONDARY`)
        );

        two = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`${option2}`)
            .setLabel(`${option2}`)
            .setStyle(`SECONDARY`)
        );

        btnMsgs = await message.channel.send({
          content: dataArrays.questions[qIndex],
          components: [one, two],
        });
        
      } else {
        console.log(`button`);
        option1 = dataArrays.questions[qIndex];
        await btnMsgs.edit({
          content: `${dataArrays.questions[qIndex]}`,
          components: [],
          embeds: [embed],
        });
      }
      qIndex++
      slotIndex++
    });
    collector.on(`end`, async (collected) => {
      await btnMsgs.edit(`under construction`);
    });
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
