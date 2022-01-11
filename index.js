const {
  Client,
  Intents,
  MessageCollector,
  CommandInteractionOptionResolver,
  MessageFlags,
} = require("discord.js");
const dotenv = require("dotenv").config();
const axios = require("axios");
const getUser = require("./commands/testing");
const dataArrays = require("./dataArrays");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("bot is ready");
});

client.on("messageCreate", async (message) => {
  if (message.content.toLowerCase() === "!bismanager") {
    const userNames = [];
    const response = await axios.get('https://dry-depths-80800.herokuapp.com/users');
    response.data.forEach((entry) => userNames.push(entry.user));
    if (userNames.includes(message.author.username)) {
      message.reply(`Hello ${message.author.username}! Here are the available commands for BISManager!
    !setbis    (help you set up your BIS for this raid tier)
    !viewset   (shows your current set, if it exists)
    !updateset (allows you to update your set as you obtain pieces!)`);
    } else {
      message.reply({
        content: `Hello ${message.author.username}! Nice to meet you! You've been added to the BISManager users! Please type !bismanager to see a list of commands!`,
      });
      axios
        .post('https://dry-depths-80800.herokuapp.com/users', {
          user: message.author.username,
        })
        .then(console.log("okay"));
    }
  }
  if (message.content.toLowerCase() === "!viewset") {
    const userNames = [];
    const gearSets = [];
    try {
      const response = await axios.get("https://dry-depths-80800.herokuapp.com/users");
      response.data.forEach((entry) => userNames.push(entry.user));
      if (userNames.includes(message.author.username)) {
        // message.reply({
        //   content: `Hey there, ${message.author.username}! Good to see you again!`,
        // });
        const gearsets = await axios.get("https://dry-depths-80800.herokuapp.com/gearsets");
        gearsets.data.forEach((entry) => {
          if (entry.user === message.author.username) {
            console.log(entry);
            gearSets.push(entry);
            const intro = `Here's your gear set, ${entry.user}:`;
            const outro = `Have you gotten any of these pieces? If so, type !updateset to let me know!`;
            const job = `Job: ${entry.job}`;
            const mh = entry.weapon.doesHave
              ? `~~Weapon: ${entry.weapon.name}~~`
              : `Weapon: ${entry.weapon.name}`;
            const head = entry.head.doesHave
              ? `~~Head: ${entry.head.name}~~`
              : `Head: ${entry.head.name}`;
            const body = entry.body.doesHave
              ? `~~Body: ${entry.body.name}~~`
              : `Body: ${entry.body.name}`;
            const hands = entry.hands.doesHave
              ? `~~Hands: ${entry.hands.name}~~`
              : `Hands: ${entry.hands.name}`;
            const legs = entry.legs.doesHave
              ? `~~Legs: ${entry.legs.name}~~`
              : `Legs: ${entry.legs.name}`;
            const feet = entry.feet.doesHave
              ? `~~Feet: ${entry.feet.name}~~`
              : `Feet: ${entry.feet.name}`;
            const ears = entry.ears.doesHave
              ? `~~Ears: ${entry.ears.name}~~`
              : `Ears: ${entry.ears.name}`;
            const neck = entry.neck.doesHave
              ? `~~Neck: ${entry.neck.name}~~`
              : `Neck: ${entry.neck.name}`;
            const wrists = entry.wrists.doesHave
              ? `~~Wrists: ${entry.wrists.name}~~`
              : `Wrists: ${entry.wrists.name}`;
            const ring0 = entry.ring0.doesHave
              ? `~~Ring 1: ${entry.ring0.name}~~`
              : `Ring 1: ${entry.ring0.name}`;
            const ring1 = entry.ring1.doesHave
              ? `~~Ring 2: ${entry.ring1.name}~~`
              : `Ring 2: ${entry.ring1.name}`;
            const statement = `${intro}
            ${job}
            ${mh}
            ${head}
            ${body}
            ${hands}
            ${legs}
            ${feet}
            ${ears}
            ${neck}
            ${wrists}
            ${ring0}
            ${ring1}

            *${outro}*`;
            message.reply({ content: statement });
          }
        });
      } else {
        message.reply({
          content: `Hello ${message.author.username}! Nice to meet you! You've been added to the BISManager users! Please type !bismanager to see a list of commands!`,
        });
        axios
          .post("https://dry-depths-80800.herokuapp.com/users", {
            user: message.author.username,
          })
          .then(console.log("okay"));
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (message.content.toLowerCase() === `!setbis`) {
    const userNames = [];
    const response = await axios.get("https://dry-depths-80800.herokuapp.com/users");
    response.data.forEach((entry) => userNames.push(entry.user));
    if (!userNames.includes(message.author.username)) {
      message.reply({
        content: `Hello ${message.author.username}! Nice to meet you! You've been added to the BISManager users! Please type !bismanager to see a list of commands!`,
      });
      axios
        .post("https://dry-depths-80800.herokuapp.com/users", {
          user: message.author.username,
        })
        .then(console.log("okay"));
    }

    const channelName = message.channel;
    const reply = (msg) => {
      message.reply(msg);
    };
    const data = {
      user: message.author.username,
      job: "",
      weapon: { name: "" },
      head: { name: "" },
      body: { name: "" },
      hands: { name: "" },
      legs: { name: "" },
      feet: { name: "" },
      ears: { name: "" },
      neck: { name: "" },
      wrists: { name: "" },
      ring0: { name: "" },
      ring1: { name: "" },
    };
    console.log(data);
    let counter = 0;
    let filter = (m) => message.author.id === m.author.id;
    let collector = message.channel.createMessageCollector({
      filter,
      max: dataArrays.questions.length,
    });

    // User selects job
    message.reply(dataArrays.questions[counter]);

    collector.on("collect", (message) => {
      counter++;
      // User selects Weapon
      if (dataArrays.jobs.includes(message.content.toLowerCase())) {
        data.job = message.content.toUpperCase();
        for (const [key, value] of Object.entries(dataArrays.weapons)) {
          if (key === message.content.toUpperCase()) {
            message.reply(`${dataArrays.questions[counter]}
            1. ${value.tome}
            2. ${value.raid}`);
          }
        }
        // User selects Head
      } else if (counter === 2) {
        // Store weapon choice
        for (const [key, value] of Object.entries(dataArrays.weapons)) {
          if (key === data.job) {
            if (message.content === "1") {
              data.weapon.name = value.tome;
            } else if (message.content === "2") {
              data.weapon.name = value.raid;
            }
            console.log(data);
          }
        }

        // Begin Head questions
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.head.Tank.tome}
            2. ${dataArrays.head.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.head.Heals.tome}
            2. ${dataArrays.head.Heals.raid}`);
        } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.head.Melee.Maiming.tome}
            2. ${dataArrays.head.Melee.Maiming.raid}`);
        } else if (dataArrays.meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.head.Melee.Striking.tome}
            2. ${dataArrays.head.Melee.Striking.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.head.Melee.Scouting.tome}
            2. ${dataArrays.head.Melee.Scouting.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.head.PhysRange.tome}
            2. ${dataArrays.head.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.head.MagRange.tome}
            2. ${dataArrays.head.MagRange.raid}`);
        }
        // User selects Body
      } else if (counter === 3) {
        // Store Head choice
        if (message.content === "1") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.Tank.tome;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.Heals.tome;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.Melee.Maiming.tome;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.head.name = dataArrays.head.Melee.Striking.tome;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.head.name = dataArrays.head.Melee.Scouting.tome;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.PhysRange.tome;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.Tank.raid;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.Heals.raid;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.Melee.Maiming.raid;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.head.name = dataArrays.head.Melee.Striking.raid;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.head.name = dataArrays.head.Melee.Scouting.raid;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.PhysRange.raid;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.head.name = dataArrays.head.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Body questions
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.body.Tank.tome}
            2. ${dataArrays.body.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.body.Heals.tome}
            2. ${dataArrays.body.Heals.raid}`);
        } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.body.Melee.Maiming.tome}
            2. ${dataArrays.body.Melee.Maiming.raid}`);
        } else if (dataArrays.meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.body.Melee.Striking.tome}
            2. ${dataArrays.body.Melee.Striking.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.body.Melee.Scouting.tome}
            2. ${dataArrays.body.Melee.Scouting.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.body.PhysRange.tome}
            2. ${dataArrays.body.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
            1. ${dataArrays.body.MagRange.tome}
            2. ${dataArrays.body.MagRange.raid}`);
        }
        // User selects Hands
      } else if (counter === 4) {
        // Store Body choice
        if (message.content === "1") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.Tank.tome;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.Heals.tome;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.Melee.Maiming.tome;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.body.name = dataArrays.body.Melee.Striking.tome;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.body.name = dataArrays.body.Melee.Scouting.tome;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.PhysRange.tome;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.Tank.raid;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.Heals.raid;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.Melee.Maiming.raid;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.body.name = dataArrays.body.Melee.Striking.raid;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.body.name = dataArrays.body.Melee.Scouting.raid;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.PhysRange.raid;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.body.name = dataArrays.body.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Hands questions
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.hands.Tank.tome}
        2. ${dataArrays.hands.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.hands.Heals.tome}
        2. ${dataArrays.hands.Heals.raid}`);
        } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.hands.Melee.Maiming.tome}
        2. ${dataArrays.hands.Melee.Maiming.raid}`);
        } else if (dataArrays.meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.hands.Melee.Striking.tome}
        2. ${dataArrays.hands.Melee.Striking.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.hands.Melee.Scouting.tome}
        2. ${dataArrays.hands.Melee.Scouting.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.hands.PhysRange.tome}
        2. ${dataArrays.hands.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.hands.MagRange.tome}
        2. ${dataArrays.hands.MagRange.raid}`);
        }
      } else if (counter === 5) {
        // Store Hand choice
        if (message.content === "1") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.Tank.tome;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.Heals.tome;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.Melee.Maiming.tome;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.hands.name = dataArrays.hands.Melee.Striking.tome;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.hands.name = dataArrays.hands.Melee.Scouting.tome;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.PhysRange.tome;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.Tank.raid;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.Heals.raid;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.Melee.Maiming.raid;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.hands.name = dataArrays.hands.Melee.Striking.raid;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.hands.name = dataArrays.hands.Melee.Scouting.raid;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.PhysRange.raid;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.hands.name = dataArrays.hands.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Legs questions
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.legs.Tank.tome}
        2. ${dataArrays.legs.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.legs.Heals.tome}
        2. ${dataArrays.legs.Heals.raid}`);
        } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.legs.Melee.Maiming.tome}
        2. ${dataArrays.legs.Melee.Maiming.raid}`);
        } else if (dataArrays.meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.legs.Melee.Striking.tome}
        2. ${dataArrays.legs.Melee.Striking.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.legs.Melee.Scouting.tome}
        2. ${dataArrays.legs.Melee.Scouting.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.legs.PhysRange.tome}
        2. ${dataArrays.legs.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.legs.MagRange.tome}
        2. ${dataArrays.legs.MagRange.raid}`);
        }
      } else if (counter === 6) {
        // Store Legs choice
        if (message.content === "1") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.Tank.tome;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.Heals.tome;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.Melee.Maiming.tome;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.legs.name = dataArrays.legs.Melee.Striking.tome;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.legs.name = dataArrays.legs.Melee.Scouting.tome;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.PhysRange.tome;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.Tank.raid;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.Heals.raid;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.Melee.Maiming.raid;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.legs.name = dataArrays.legs.Melee.Striking.raid;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.legs.name = dataArrays.legs.Melee.Scouting.raid;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.PhysRange.raid;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.legs.name = dataArrays.legs.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Feet questions
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.feet.Tank.tome}
        2. ${dataArrays.feet.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.feet.Heals.tome}
        2. ${dataArrays.feet.Heals.raid}`);
        } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.feet.Melee.Maiming.tome}
        2. ${dataArrays.feet.Melee.Maiming.raid}`);
        } else if (dataArrays.meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.feet.Melee.Striking.tome}
        2. ${dataArrays.feet.Melee.Striking.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.feet.Melee.Scouting.tome}
        2. ${dataArrays.feet.Melee.Scouting.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.feet.PhysRange.tome}
        2. ${dataArrays.feet.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.feet.MagRange.tome}
        2. ${dataArrays.feet.MagRange.raid}`);
        }
      } else if (counter === 7) {
        // Store Feet choice
        if (message.content === "1") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.Tank.tome;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.Heals.tome;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.Melee.Maiming.tome;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.feet.name = dataArrays.feet.Melee.Striking.tome;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.feet.name = dataArrays.feet.Melee.Scouting.tome;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.PhysRange.tome;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.Tank.raid;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.Heals.raid;
          } else if (dataArrays.meleeMaiming.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.Melee.Maiming.raid;
          } else if (
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.feet.name = dataArrays.feet.Melee.Striking.raid;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.feet.name = dataArrays.feet.Melee.Scouting.raid;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.PhysRange.raid;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.feet.name = dataArrays.feet.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Ears choice
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ears.Tank.tome}
        2. ${dataArrays.ears.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ears.Heals.tome}
        2. ${dataArrays.ears.Heals.raid}`);
        } else if (
          dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
          dataArrays.meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ears.Melee.Slaying.tome}
        2. ${dataArrays.ears.Melee.Slaying.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ears.Melee.Aiming.tome}
        2. ${dataArrays.ears.Melee.Aiming.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ears.PhysRange.tome}
        2. ${dataArrays.ears.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ears.MagRange.tome}
        2. ${dataArrays.ears.MagRange.raid}`);
        }
      } else if (counter === 8) {
        // Store Ears choice
        if (message.content === "1") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.ears.name = dataArrays.ears.Tank.tome;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.ears.name = dataArrays.ears.Heals.tome;
          } else if (
            dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.ears.name = dataArrays.ears.Melee.Slaying.tome;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.ears.name = dataArrays.ears.Melee.Aiming.tome;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.ears.name = dataArrays.ears.PhysRange.tome;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.ears.name = dataArrays.ears.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.ears.name = dataArrays.ears.Tank.raid;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.ears.name = dataArrays.ears.Heals.raid;
          } else if (
            dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.ears.name = dataArrays.ears.Melee.Slaying.raid;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.ears.name = dataArrays.ears.Melee.Aiming.raid;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.ears.name = dataArrays.ears.PhysRange.raid;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.ears.name = dataArrays.ears.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Neck choice
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.neck.Tank.tome}
        2. ${dataArrays.neck.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.neck.Heals.tome}
        2. ${dataArrays.neck.Heals.raid}`);
        } else if (
          dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
          dataArrays.meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.neck.Melee.Slaying.tome}
        2. ${dataArrays.neck.Melee.Slaying.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.neck.Melee.Aiming.tome}
        2. ${dataArrays.neck.Melee.Aiming.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.neck.PhysRange.tome}
        2. ${dataArrays.neck.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.neck.MagRange.tome}
        2. ${dataArrays.neck.MagRange.raid}`);
        }
      } else if (counter === 9) {
        // Store Neck choice
        if (message.content === "1") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.neck.name = dataArrays.neck.Tank.tome;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.neck.name = dataArrays.neck.Heals.tome;
          } else if (
            dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.neck.name = dataArrays.neck.Melee.Slaying.tome;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.neck.name = dataArrays.neck.Melee.Aiming.tome;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.neck.name = dataArrays.neck.PhysRange.tome;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.neck.name = dataArrays.neck.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.neck.name = dataArrays.neck.Tank.raid;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.neck.name = dataArrays.neck.Heals.raid;
          } else if (
            dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.neck.name = dataArrays.neck.Melee.Slaying.raid;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.neck.name = dataArrays.neck.Melee.Aiming.raid;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.neck.name = dataArrays.neck.PhysRange.raid;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.neck.name = dataArrays.neck.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Wrists choice
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.wrists.Tank.tome}
        2. ${dataArrays.wrists.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.wrists.Heals.tome}
        2. ${dataArrays.wrists.Heals.raid}`);
        } else if (
          dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
          dataArrays.meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.wrists.Melee.Slaying.tome}
        2. ${dataArrays.wrists.Melee.Slaying.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.wrists.Melee.Aiming.tome}
        2. ${dataArrays.wrists.Melee.Aiming.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.wrists.PhysRange.tome}
        2. ${dataArrays.wrists.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.wrists.MagRange.tome}
        2. ${dataArrays.wrists.MagRange.raid}`);
        }
      } else if (counter === 10) {
        // Store Wrists choice
        if (message.content === "1") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.wrists.name = dataArrays.wrists.Tank.tome;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.wrists.name = dataArrays.wrists.Heals.tome;
          } else if (
            dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.wrists.name = dataArrays.wrists.Melee.Slaying.tome;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.wrists.name = dataArrays.wrists.Melee.Aiming.tome;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.wrists.name = dataArrays.wrists.PhysRange.tome;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.wrists.name = dataArrays.wrists.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.wrists.name = dataArrays.wrists.Tank.raid;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.wrists.name = dataArrays.wrists.Heals.raid;
          } else if (
            dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.wrists.name = dataArrays.wrists.Melee.Slaying.raid;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.wrists.name = dataArrays.wrists.Melee.Aiming.raid;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.wrists.name = dataArrays.wrists.PhysRange.raid;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.wrists.name = dataArrays.wrists.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Ring0 choice
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring0.Tank.tome}
        2. ${dataArrays.ring0.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring0.Heals.tome}
        2. ${dataArrays.ring0.Heals.raid}`);
        } else if (
          dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
          dataArrays.meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring0.Melee.Slaying.tome}
        2. ${dataArrays.ring0.Melee.Slaying.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring0.Melee.Aiming.tome}
        2. ${dataArrays.ring0.Melee.Aiming.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring0.PhysRange.tome}
        2. ${dataArrays.ring0.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring0.MagRange.tome}
        2. ${dataArrays.ring0.MagRange.raid}`);
        }
      } else if (counter === 11) {
        // Store Ring0 choice
        if (message.content === "1") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.ring0.name = dataArrays.ring0.Tank.tome;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.ring0.name = dataArrays.ring0.Heals.tome;
          } else if (
            dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.ring0.name = dataArrays.ring0.Melee.Slaying.tome;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.ring0.name = dataArrays.ring0.Melee.Aiming.tome;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.ring0.name = dataArrays.ring0.PhysRange.tome;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.ring0.name = dataArrays.ring0.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (dataArrays.tanks.includes(data.job.toLowerCase())) {
            data.ring0.name = dataArrays.ring0.Tank.raid;
          } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
            data.ring0.name = dataArrays.ring0.Heals.raid;
          } else if (
            dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
            dataArrays.meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.ring0.name = dataArrays.ring0.Melee.Slaying.raid;
          } else if (
            dataArrays.meleeScouting.includes(data.job.toLowerCase())
          ) {
            data.ring0.name = dataArrays.ring0.Melee.Aiming.raid;
          } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
            data.ring0.name = dataArrays.ring0.PhysRange.raid;
          } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
            data.ring0.name = dataArrays.ring0.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Ring1 choice
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring1.Tank.tome}
        2. ${dataArrays.ring1.Tank.raid}`);
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring1.Heals.tome}
        2. ${dataArrays.ring1.Heals.raid}`);
        } else if (
          dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
          dataArrays.meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring1.Melee.Slaying.tome}
        2. ${dataArrays.ring1.Melee.Slaying.raid}`);
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring1.Melee.Aiming.tome}
        2. ${dataArrays.ring1.Melee.Aiming.raid}`);
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring1.PhysRange.tome}
        2. ${dataArrays.ring1.PhysRange.raid}`);
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          message.reply(`${dataArrays.questions[counter]}
        1. ${dataArrays.ring1.MagRange.tome}
        2. ${dataArrays.ring1.MagRange.raid}`);
        }
      }
    });

    collector.on("end", (collected) => {
      const answers = [];
      collected.forEach((value) => answers.push(value.content));
      // store Ring1 choice
      if (answers[answers.length - 1] === "1") {
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.Tank.tome;
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.Heals.tome;
        } else if (
          dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
          dataArrays.meleeStriking.includes(data.job.toLowerCase())
        ) {
          data.ring1.name = dataArrays.ring1.Melee.Slaying.tome;
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.Melee.Aiming.tome;
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.PhysRange.tome;
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.MagRange.tome;
        }
      } else if (answers[answers.length - 1] === "2") {
        if (dataArrays.tanks.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.Tank.raid;
        } else if (dataArrays.heals.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.Heals.raid;
        } else if (
          dataArrays.meleeMaiming.includes(data.job.toLowerCase()) ||
          dataArrays.meleeStriking.includes(data.job.toLowerCase())
        ) {
          data.ring1.name = dataArrays.ring1.Melee.Slaying.raid;
        } else if (dataArrays.meleeScouting.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.Melee.Aiming.raid;
        } else if (dataArrays.physRange.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.PhysRange.raid;
        } else if (dataArrays.magRange.includes(data.job.toLowerCase())) {
          data.ring1.name = dataArrays.ring1.MagRange.raid;
        }
      }
      console.log(JSON.stringify(data));
      axios
        .post("https://dry-depths-80800.herokuapp.com/gearsets", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(reply("Go ahead and check out your set! Type !viewset to do so!"))
        .catch((err) => console.log(err));
    });
  }

  if (message.content.toLowerCase() === `!updateset`) {
    const userNames = [];
    const gearSet = [];
    const response = await axios.get();
    // response.data.forEach((entry) => userNames.push(entry.user));
    // console.log(userNames.includes(message.author.username))
    // if (userNames.includes(message.author.username === false)) {
    //   message.reply({
    //     content: `Hello ${message.author.username}! Nice to meet you! You've been added to the BISManager users! Please type !bismanager to see a list of commands!`,
    //   });
    //   axios
    //     .post("https://dry-depths-80800.herokuapp.com/users", {
    //       user: message.author.username,
    //     })
    //     .then(console.log('done'))
    //     .catch(console.log('failed'))

    //   return
    // }

    response.data.forEach((entry) => {
      if (message.author.username === entry.user) {
        gearSet.push(entry);
      }
    });
    const reply = (msg) => {
      message.reply(msg);
    };
    // const currentChannel = message.channel;
    const currentUser = [];

    let userID;
    const gearsets = await axios.get(`https://dry-depths-80800.herokuapp.com/gearsets/`);
    gearsets.data.forEach((entry) => {
      if (entry.user === message.author.username) {
        const data = {
          weapon: entry.weapon,
          head: entry.head,
          body: entry.body,
          hands: entry.hands,
          legs: entry.legs,
          feet: entry.feet,
          ears: entry.ears,
          neck: entry.neck,
          wrists: entry.wrists,
          ring0: entry.ring0,
          ring1: entry.ring1,
        };
        const setId = entry._id;
        console.log(data.head);
        const intro = `Hey, ${entry.user}, if you've obtained any of these, please type "got (item slot)". (An example would be "got ring 1" or "got weapon"):`;
        const job = `Job: ${entry.job}`;
        const mh = entry.weapon.doesHave
          ? `~~Weapon: ${entry.weapon.name}~~`
          : `Weapon: ${entry.weapon.name}`;
        const head = entry.head.doesHave
          ? `~~Head: ${entry.head.name}~~`
          : `Head: ${entry.head.name}`;
        const body = entry.body.doesHave
          ? `~~Body: ${entry.body.name}~~`
          : `Body: ${entry.body.name}`;
        const hands = entry.hands.doesHave
          ? `~~Hands: ${entry.hands.name}~~`
          : `Hands: ${entry.hands.name}`;
        const legs = entry.legs.doesHave
          ? `~~Legs: ${entry.legs.name}~~`
          : `Legs: ${entry.legs.name}`;
        const feet = entry.feet.doesHave
          ? `~~Feet: ${entry.feet.name}~~`
          : `Feet: ${entry.feet.name}`;
        const ears = entry.ears.doesHave
          ? `~~Ears: ${entry.ears.name}~~`
          : `Ears: ${entry.ears.name}`;
        const neck = entry.neck.doesHave
          ? `~~Neck: ${entry.neck.name}~~`
          : `Neck: ${entry.neck.name}`;
        const wrists = entry.wrists.doesHave
          ? `~~Wrists: ${entry.wrists.name}~~`
          : `Wrists: ${entry.wrists.name}`;
        const ring0 = entry.ring0.doesHave
          ? `~~Ring 1: ${entry.ring0.name}~~`
          : `Ring 1: ${entry.ring0.name}`;
        const ring1 = entry.ring1.doesHave
          ? `~~Ring 2: ${entry.ring1.name}~~`
          : `Ring 2: ${entry.ring1.name}`;
        const statement = `${intro}
          ${job}
          ${mh}
          ${head}
          ${body}
          ${hands}
          ${legs}
          ${feet}
          ${ears}
          ${neck}
          ${wrists}
          ${ring0}
          ${ring1}`;
        message.reply({ content: statement });

        let filter = (m) => message.author.id === m.author.id;
        let collector = message.channel.createMessageCollector({
          filter,
          max: 1,
        });
        collector.on("collect", (message) => {
          if (message.content.toLowerCase() === "got weapon") {
            data.weapon.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got head") {
            data.head.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got body") {
            data.body.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got hands") {
            data.hands.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got legs") {
            data.legs.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got feet") {
            data.feet.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got ears") {
            data.ears.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got neck") {
            data.neck.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got wrists") {
            data.wrists.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got ring 1") {
            data.ring0.doesHave = true;
            console.log(data);
          } else if (message.content.toLowerCase() === "got ring 2") {
            data.ring1.doesHave = true;
            console.log(data);
          }
        });

        collector.on("end", (collected) => {
          const intro = "Your gear has been updated!";
          const job = `Job: ${entry.job}`;
          const mh = entry.weapon.doesHave
            ? `~~Weapon: ${entry.weapon.name}~~`
            : `Weapon: ${entry.weapon.name}`;
          const head = entry.head.doesHave
            ? `~~Head: ${entry.head.name}~~`
            : `Head: ${entry.head.name}`;
          const body = entry.body.doesHave
            ? `~~Body: ${entry.body.name}~~`
            : `Body: ${entry.body.name}`;
          const hands = entry.hands.doesHave
            ? `~~Hands: ${entry.hands.name}~~`
            : `Hands: ${entry.hands.name}`;
          const legs = entry.legs.doesHave
            ? `~~Legs: ${entry.legs.name}~~`
            : `Legs: ${entry.legs.name}`;
          const feet = entry.feet.doesHave
            ? `~~Feet: ${entry.feet.name}~~`
            : `Feet: ${entry.feet.name}`;
          const ears = entry.ears.doesHave
            ? `~~Ears: ${entry.ears.name}~~`
            : `Ears: ${entry.ears.name}`;
          const neck = entry.neck.doesHave
            ? `~~Neck: ${entry.neck.name}~~`
            : `Neck: ${entry.neck.name}`;
          const wrists = entry.wrists.doesHave
            ? `~~Wrists: ${entry.wrists.name}~~`
            : `Wrists: ${entry.wrists.name}`;
          const ring0 = entry.ring0.doesHave
            ? `~~Ring 1: ${entry.ring0.name}~~`
            : `Ring 1: ${entry.ring0.name}`;
          const ring1 = entry.ring1.doesHave
            ? `~~Ring 2: ${entry.ring1.name}~~`
            : `Ring 2: ${entry.ring1.name}`;
          const statement = `${intro}
          ${job}
          ${mh}
          ${head}
          ${body}
          ${hands}
          ${legs}
          ${feet}
          ${ears}
          ${neck}
          ${wrists}
          ${ring0}
          ${ring1}`;
          axios
            .patch(
              `https://dry-depths-80800.herokuapp.com/gearsets/${setId}`,
              JSON.stringify(data),
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then(reply({ content: statement }))
            .catch((err) => console.log(err));
        });
      }
    });
  }
});

client.login(process.env.TOKEN);
