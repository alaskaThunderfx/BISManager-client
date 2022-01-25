const {
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");
const { MessageEmbed } = require(`discord.js`);
const { slot, questions, jobjects, weapons } = require(`./../dataArrays`);
const {
  embedColorPicker,
  embedIconPicker,
  gearHandler,
} = require(`./../helperfunctions`);

module.exports = {
  name: `s`,
  description: `test`,
  async execute(message, args) {
    let msg;
    let btnMsgs;
    let job;
    let one;
    let two;
    let option1;
    let option2;
    let qIndex = 0;
    let slotIndex = 0;

    const embed = new MessageEmbed().setTitle(`Let's set up your BIS!`);
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId(`job`)
        .setPlaceholder(`Select your job, please!`)
        .addOptions(jobjects)
    );

    await message.reply(`Hi there, ${message.member.displayName}!`);
    await message.channel
      .send({ embeds: [embed], components: [row] })
      .then((input) => (msg = input));

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: questions.length + 1,
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
        option1 = gearHandler(job.value, slotIndex)[0];
        option2 = gearHandler(job.value, slotIndex)[1];

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

        embed.addField(
          `${slot[slotIndex]}: `,
          `${interaction.customId}`,
          false
        );

        slotIndex++;
        await btnMsgs.delete();
        if (qIndex !== questions.length) {
          await msg.edit({
            embeds: [embed],
          }) . then(
          btnMsgs = await message.channel
            .send({
              content: questions[qIndex],
              components: [one, two],
            }))
        } else {
          await msg.edit({
            embeds: [embed],
          });
        }
      }
      qIndex++;
    });

    collector.on(`end`, async (collected) => {
      console.log(`collecting ended`)
      collected.forEach((t) => {
        console.log(t.values ? t.values : t.customId)
      })
    });
  },
};
