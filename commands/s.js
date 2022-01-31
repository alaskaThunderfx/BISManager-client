const { default: axios } = require("axios");
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
  MessageEmbed
} = require("discord.js");
const { slot, questions, jobjects, weapons } = require(`./../dataArrays`);
const {
  getUserInfo,
  embedColorPicker,
  embedIconPicker,
  gearHandler,
} = require(`./../helperfunctions`);

module.exports = {
  name: `s`,
  description: `test`,
  async execute(message, args) {
    const userInfo = await getUserInfo(message)
    let existingSets
    if (userInfo.gearSets) {
      existingSets = []
      for (const set in userInfo.gearSets) {
        existingSets.push(userInfo.gearSets[set].job)
      }
      console.log(existingSets)
    } else {
      existingSets = false
    }

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

    await message.reply(`Hi there, ${message.member.displayName}! Please be patient as you click through my questions! I can be a bit slow sometimes, so be sure not to click more than one time per question!`);
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
        // check if the job they selected already has a set in the database
        job = jobjects.find((j) => j.value === interaction.values[0]);
        if (existingSets.includes(job.value)) {
          message.reply(`You already have a set for ${job.value.toUpperCase()}! Type !bismanager to see the list of options again if you would like to modify the ${job.value.toUpperCase()} set.`)
          collector.stop()
          return
        }
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
          }).then(
            btnMsgs = await message.channel
              .send({
                content: questions[qIndex],
                components: [one, two],
              }))
            .catch(console.error)
        } else {
          await msg.edit({
            embeds: [embed],
          });
        }
      }
      qIndex++;
    });

    collector.on(`end`, async (collected) => {
      if (collected.size < 12) {
        return
      }
      const retrieved = []
      await collected.forEach((t) => {
        t.values ? retrieved.push(t.values) : retrieved.push(t.customId)
      })
      const sendData = {
        userId: userInfo._id,
        job: retrieved[0][0],
        weapon: {
          name: retrieved[1]
        },
        head: {
          name: retrieved[2]
        },
        body: {
          name: retrieved[3]
        },
        hands: {
          name: retrieved[4]
        },
        legs: {
          name: retrieved[5]
        },
        feet: {
          name: retrieved[6]
        },
        ears: {
          name: retrieved[7]
        },
        neck: {
          name: retrieved[8]
        },
        wrists: {
          name: retrieved[9]
        },
        ring0: {
          name: retrieved[10]
        },
        ring1: {
          name: retrieved[11]
        }
      }
      axios.post("http://localhost:4741/gearsets", sendData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(message.reply(`Okay your set for ${retrieved[0][0].toUpperCase()} has been added!`))
      .catch(console.error)
    });
  },
};
