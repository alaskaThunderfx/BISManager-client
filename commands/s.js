const {
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");
const { Client, Message, MessageEmbed } = require(`discord.js`);
const { slot, questions, jobjects, weapons } = require(`./../dataArrays`);
const dataArrays = require(`./../dataArrays`);
const followup = require(`./sa`);
const { embedColorPicker, embedIconPicker, gearHandler } = require(`./../helperfunctions`);

module.exports = {
  name: `s`,
  description: `test`,
  async execute(message, args) {
    let msg;
    let btnMsgs;
    let value;
    let job;
    let one;
    let two;
    let option1;
    let option2;
    let qIndex = 0;
    let slotIndex = 0;

    const embed = new MessageEmbed().setTitle(`Choose an option`);
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId(`job`)
        .setPlaceholder(`Select an option, please!`)
        .addOptions(jobjects)
    );

    await message.reply(`Hi there, ${message.member.displayName}!`);
    await message.channel
      .send({ embeds: [embed], components: [row] })
      .then((input) => (msg = input));

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: questions.length,
    });

    collector.on("collect", async (interaction) => {
      interaction.deferUpdate();
      // User selects job

      if (interaction.isSelectMenu()) {
        job = jobjects.find((j) => j.value === interaction.values[0]);
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

        for (const [key, value] of Object.entries(weapons)) {
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
          content: questions[qIndex],
          components: [one, two],
        });
        // begin cycling through the questions with buttons
      } else {
        let options = gearHandler(job.value, slotIndex)
        console.log(`options:\n${options}`)
        embed.addField(
          `${slot[slotIndex]}: `,
          `${interaction.customId}`,
          false
        );

        slotIndex++;
        await btnMsgs.delete();
        if (qIndex !== questions.length) {
          btnMsgs = await message.channel.send({
            content: questions[qIndex],
            components: [one, two],
          });
        }
        await msg.edit({
          embeds: [embed],
        });
        option1 = options[0]
        option2 = options[1]
      }
      qIndex++;
    });
    collector.on(`end`, async (collected) => {
      console.log(`done`);
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
