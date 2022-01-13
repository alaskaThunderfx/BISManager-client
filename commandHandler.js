const Discord = require("discord.js");
const axios = require("axios");
const dataArrays = require("./dataArrays");
const client = require("./index");
const fs = require("fs");
const {
  questions,
  jobs,
  tanks,
  heals,
  meleeMaiming,
  meleeScouting,
  meleeStriking,
  physRange,
  magRange,
  weapons,
  head,
  body,
  hands,
  legs,
  feet,
  ears,
  neck,
  wrists,
  ring0,
  ring1,
  loot,
} = require("./dataArrays");
const prefix = "!";

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

module.exports = async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase()

  if (command === `collector`) {
    client.commands.get('collector').execute(message, args);
  }

  if (command === "bismanager") {
    client.commands.get('bismanager').execute(message, args)
    // let rollingMessage;
    // await message
    //   .reply(
    //     "Retrieving that information for you... I know I left it around here somewhere..."
    //   )
    //   .then((msg) => (rollingMessage = msg));
    // const userNames = [];
    // const response = await axios.get(
    //   "https://dry-depths-80800.herokuapp.com/users"
    // );
    // response.data.forEach((entry) => userNames.push(entry.user));
    // if (userNames.includes(message.author.username)) {
    //   await rollingMessage.edit(`Hello ${message.author.username}! Here are the available commands for BISManager!
    //   !setbis    (help you set up your BIS for this raid tier)
    //   !viewset   (shows your current set, if it exists)
    //   !updateset (allows you to update your set as you obtain pieces!)
    //   !loot      (shows you what loot you need from each raid)`);
    // } else {
    //   await rollingMessage.edit({
    //     content: `Hello ${message.author.username}! Nice to meet you! You've been added to the BISManager users! Please type !bismanager to see a list of commands!`,
    //   });
    //   await axios
    //     .post("https://dry-depths-80800.herokuapp.com/users", {
    //       user: message.author.username,
    //     })
    //     .then(console.log("New User Created"));
    // }
  }
  if (message.content.toLowerCase() === "!viewset") {
    const userNames = [];
    const gearSets = [];
    try {
      const response = await axios.get(
        "https://dry-depths-80800.herokuapp.com/users"
      );
      response.data.forEach((entry) => userNames.push(entry.user));
      if (userNames.includes(message.author.username)) {
        // message.reply({
        //   content: `Hey there, ${message.author.username}! Good to see you again!`,
        // });
        const gearsets = await axios.get(
          "https://dry-depths-80800.herokuapp.com/gearsets"
        );
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
    const response = await axios.get(
      "https://dry-depths-80800.herokuapp.com/users"
    );
    response.data.forEach((entry) => userNames.push(entry.user));
    if (!userNames.includes(message.author.username)) {
      message.reply({
        content: `Hello ${message.author.username}! Nice to meet you! You've been added to the BISManager users! Please type !bismanager to see a list of commands!`,
      });
      axios
        .post("https://dry-depths-80800.herokuapp.com/users", {
          user: message.author.username,
        })
        .then(console.log("new user created"));
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
      max: questions.length,
    });

    // User selects job
    message.reply(questions[counter]);

    collector.on("collect", (message) => {
      counter++;
      // User selects Weapon
      if (jobs.includes(message.content.toLowerCase())) {
        data.job = message.content.toUpperCase();
        for (const [key, value] of Object.entries(weapons)) {
          if (key === message.content.toUpperCase()) {
            message.reply(`${questions[counter]}
              1. ${value.tome}
              2. ${value.raid}`);
          }
        }
        // User selects Head
      } else if (counter === 2) {
        // Store weapon choice
        for (const [key, value] of Object.entries(weapons)) {
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
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${head.Tank.tome}
              2. ${head.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${head.Heals.tome}
              2. ${head.Heals.raid}`);
        } else if (meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${head.Melee.Maiming.tome}
              2. ${head.Melee.Maiming.raid}`);
        } else if (meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${head.Melee.Striking.tome}
              2. ${head.Melee.Striking.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${head.Melee.Scouting.tome}
              2. ${head.Melee.Scouting.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${head.PhysRange.tome}
              2. ${head.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${head.MagRange.tome}
              2. ${head.MagRange.raid}`);
        }
        // User selects Body
      } else if (counter === 3) {
        // Store Head choice
        if (message.content === "1") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.head.name = head.Tank.tome;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.head.name = head.Heals.tome;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.head.name = head.Melee.Maiming.tome;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.head.name = head.Melee.Striking.tome;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.head.name = head.Melee.Scouting.tome;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.head.name = head.PhysRange.tome;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.head.name = head.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.head.name = head.Tank.raid;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.head.name = head.Heals.raid;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.head.name = head.Melee.Maiming.raid;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.head.name = head.Melee.Striking.raid;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.head.name = head.Melee.Scouting.raid;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.head.name = head.PhysRange.raid;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.head.name = head.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Body questions
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${body.Tank.tome}
              2. ${body.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${body.Heals.tome}
              2. ${body.Heals.raid}`);
        } else if (meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${body.Melee.Maiming.tome}
              2. ${body.Melee.Maiming.raid}`);
        } else if (meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${body.Melee.Striking.tome}
              2. ${body.Melee.Striking.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${body.Melee.Scouting.tome}
              2. ${body.Melee.Scouting.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${body.PhysRange.tome}
              2. ${body.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
              1. ${body.MagRange.tome}
              2. ${body.MagRange.raid}`);
        }
        // User selects Hands
      } else if (counter === 4) {
        // Store Body choice
        if (message.content === "1") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.body.name = body.Tank.tome;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.body.name = body.Heals.tome;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.body.name = body.Melee.Maiming.tome;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.body.name = body.Melee.Striking.tome;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.body.name = body.Melee.Scouting.tome;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.body.name = body.PhysRange.tome;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.body.name = body.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.body.name = body.Tank.raid;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.body.name = body.Heals.raid;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.body.name = body.Melee.Maiming.raid;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.body.name = body.Melee.Striking.raid;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.body.name = body.Melee.Scouting.raid;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.body.name = body.PhysRange.raid;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.body.name = body.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Hands questions
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${hands.Tank.tome}
          2. ${hands.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${hands.Heals.tome}
          2. ${hands.Heals.raid}`);
        } else if (meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${hands.Melee.Maiming.tome}
          2. ${hands.Melee.Maiming.raid}`);
        } else if (meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${hands.Melee.Striking.tome}
          2. ${hands.Melee.Striking.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${hands.Melee.Scouting.tome}
          2. ${hands.Melee.Scouting.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${hands.PhysRange.tome}
          2. ${hands.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${hands.MagRange.tome}
          2. ${hands.MagRange.raid}`);
        }
      } else if (counter === 5) {
        // Store Hand choice
        if (message.content === "1") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Tank.tome;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Heals.tome;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Melee.Maiming.tome;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Melee.Striking.tome;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Melee.Scouting.tome;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.hands.name = hands.PhysRange.tome;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.hands.name = hands.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Tank.raid;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Heals.raid;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Melee.Maiming.raid;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Melee.Striking.raid;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.hands.name = hands.Melee.Scouting.raid;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.hands.name = hands.PhysRange.raid;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.hands.name = hands.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Legs questions
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${legs.Tank.tome}
          2. ${legs.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${legs.Heals.tome}
          2. ${legs.Heals.raid}`);
        } else if (meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${legs.Melee.Maiming.tome}
          2. ${legs.Melee.Maiming.raid}`);
        } else if (meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${legs.Melee.Striking.tome}
          2. ${legs.Melee.Striking.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${legs.Melee.Scouting.tome}
          2. ${legs.Melee.Scouting.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${legs.PhysRange.tome}
          2. ${legs.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${legs.MagRange.tome}
          2. ${legs.MagRange.raid}`);
        }
      } else if (counter === 6) {
        // Store Legs choice
        if (message.content === "1") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Tank.tome;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Heals.tome;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Melee.Maiming.tome;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Melee.Striking.tome;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Melee.Scouting.tome;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.legs.name = legs.PhysRange.tome;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.legs.name = legs.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Tank.raid;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Heals.raid;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Melee.Maiming.raid;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Melee.Striking.raid;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.legs.name = legs.Melee.Scouting.raid;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.legs.name = legs.PhysRange.raid;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.legs.name = legs.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Feet questions
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${feet.Tank.tome}
          2. ${feet.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${feet.Heals.tome}
          2. ${feet.Heals.raid}`);
        } else if (meleeMaiming.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${feet.Melee.Maiming.tome}
          2. ${feet.Melee.Maiming.raid}`);
        } else if (meleeStriking.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${feet.Melee.Striking.tome}
          2. ${feet.Melee.Striking.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${feet.Melee.Scouting.tome}
          2. ${feet.Melee.Scouting.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${feet.PhysRange.tome}
          2. ${feet.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${feet.MagRange.tome}
          2. ${feet.MagRange.raid}`);
        }
      } else if (counter === 7) {
        // Store Feet choice
        if (message.content === "1") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Tank.tome;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Heals.tome;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Melee.Maiming.tome;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Melee.Striking.tome;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Melee.Scouting.tome;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.feet.name = feet.PhysRange.tome;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.feet.name = feet.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Tank.raid;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Heals.raid;
          } else if (meleeMaiming.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Melee.Maiming.raid;
          } else if (meleeStriking.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Melee.Striking.raid;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.feet.name = feet.Melee.Scouting.raid;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.feet.name = feet.PhysRange.raid;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.feet.name = feet.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Ears choice
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ears.Tank.tome}
          2. ${ears.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ears.Heals.tome}
          2. ${ears.Heals.raid}`);
        } else if (
          meleeMaiming.includes(data.job.toLowerCase()) ||
          meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${questions[counter]}
          1. ${ears.Melee.Slaying.tome}
          2. ${ears.Melee.Slaying.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ears.Melee.Aiming.tome}
          2. ${ears.Melee.Aiming.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ears.PhysRange.tome}
          2. ${ears.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ears.MagRange.tome}
          2. ${ears.MagRange.raid}`);
        }
      } else if (counter === 8) {
        // Store Ears choice
        if (message.content === "1") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.ears.name = ears.Tank.tome;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.ears.name = ears.Heals.tome;
          } else if (
            meleeMaiming.includes(data.job.toLowerCase()) ||
            meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.ears.name = ears.Melee.Slaying.tome;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.ears.name = ears.Melee.Aiming.tome;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.ears.name = ears.PhysRange.tome;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.ears.name = ears.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.ears.name = ears.Tank.raid;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.ears.name = ears.Heals.raid;
          } else if (
            meleeMaiming.includes(data.job.toLowerCase()) ||
            meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.ears.name = ears.Melee.Slaying.raid;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.ears.name = ears.Melee.Aiming.raid;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.ears.name = ears.PhysRange.raid;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.ears.name = ears.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Neck choice
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${neck.Tank.tome}
          2. ${neck.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${neck.Heals.tome}
          2. ${neck.Heals.raid}`);
        } else if (
          meleeMaiming.includes(data.job.toLowerCase()) ||
          meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${questions[counter]}
          1. ${neck.Melee.Slaying.tome}
          2. ${neck.Melee.Slaying.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${neck.Melee.Aiming.tome}
          2. ${neck.Melee.Aiming.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${neck.PhysRange.tome}
          2. ${neck.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${neck.MagRange.tome}
          2. ${neck.MagRange.raid}`);
        }
      } else if (counter === 9) {
        // Store Neck choice
        if (message.content === "1") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.neck.name = neck.Tank.tome;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.neck.name = neck.Heals.tome;
          } else if (
            meleeMaiming.includes(data.job.toLowerCase()) ||
            meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.neck.name = neck.Melee.Slaying.tome;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.neck.name = neck.Melee.Aiming.tome;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.neck.name = neck.PhysRange.tome;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.neck.name = neck.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.neck.name = neck.Tank.raid;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.neck.name = neck.Heals.raid;
          } else if (
            meleeMaiming.includes(data.job.toLowerCase()) ||
            meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.neck.name = neck.Melee.Slaying.raid;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.neck.name = neck.Melee.Aiming.raid;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.neck.name = neck.PhysRange.raid;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.neck.name = neck.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Wrists choice
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${wrists.Tank.tome}
          2. ${wrists.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${wrists.Heals.tome}
          2. ${wrists.Heals.raid}`);
        } else if (
          meleeMaiming.includes(data.job.toLowerCase()) ||
          meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${questions[counter]}
          1. ${wrists.Melee.Slaying.tome}
          2. ${wrists.Melee.Slaying.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${wrists.Melee.Aiming.tome}
          2. ${wrists.Melee.Aiming.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${wrists.PhysRange.tome}
          2. ${wrists.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${wrists.MagRange.tome}
          2. ${wrists.MagRange.raid}`);
        }
      } else if (counter === 10) {
        // Store Wrists choice
        if (message.content === "1") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.Tank.tome;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.Heals.tome;
          } else if (
            meleeMaiming.includes(data.job.toLowerCase()) ||
            meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.wrists.name = wrists.Melee.Slaying.tome;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.Melee.Aiming.tome;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.PhysRange.tome;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.Tank.raid;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.Heals.raid;
          } else if (
            meleeMaiming.includes(data.job.toLowerCase()) ||
            meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.wrists.name = wrists.Melee.Slaying.raid;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.Melee.Aiming.raid;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.PhysRange.raid;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.wrists.name = wrists.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Ring0 choice
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring0.Tank.tome}
          2. ${ring0.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring0.Heals.tome}
          2. ${ring0.Heals.raid}`);
        } else if (
          meleeMaiming.includes(data.job.toLowerCase()) ||
          meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${questions[counter]}
          1. ${ring0.Melee.Slaying.tome}
          2. ${ring0.Melee.Slaying.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring0.Melee.Aiming.tome}
          2. ${ring0.Melee.Aiming.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring0.PhysRange.tome}
          2. ${ring0.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring0.MagRange.tome}
          2. ${ring0.MagRange.raid}`);
        }
      } else if (counter === 11) {
        // Store Ring0 choice
        if (message.content === "1") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.Tank.tome;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.Heals.tome;
          } else if (
            meleeMaiming.includes(data.job.toLowerCase()) ||
            meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.ring0.name = ring0.Melee.Slaying.tome;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.Melee.Aiming.tome;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.PhysRange.tome;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.MagRange.tome;
          }
        } else if (message.content === "2") {
          if (tanks.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.Tank.raid;
          } else if (heals.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.Heals.raid;
          } else if (
            meleeMaiming.includes(data.job.toLowerCase()) ||
            meleeStriking.includes(data.job.toLowerCase())
          ) {
            data.ring0.name = ring0.Melee.Slaying.raid;
          } else if (meleeScouting.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.Melee.Aiming.raid;
          } else if (physRange.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.PhysRange.raid;
          } else if (magRange.includes(data.job.toLowerCase())) {
            data.ring0.name = ring0.MagRange.raid;
          }
        }
        console.log(data);

        // Begin Ring1 choice
        if (tanks.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring1.Tank.tome}
          2. ${ring1.Tank.raid}`);
        } else if (heals.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring1.Heals.tome}
          2. ${ring1.Heals.raid}`);
        } else if (
          meleeMaiming.includes(data.job.toLowerCase()) ||
          meleeStriking.includes(data.job.toLowerCase())
        ) {
          message.reply(`${questions[counter]}
          1. ${ring1.Melee.Slaying.tome}
          2. ${ring1.Melee.Slaying.raid}`);
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring1.Melee.Aiming.tome}
          2. ${ring1.Melee.Aiming.raid}`);
        } else if (physRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring1.PhysRange.tome}
          2. ${ring1.PhysRange.raid}`);
        } else if (magRange.includes(data.job.toLowerCase())) {
          message.reply(`${questions[counter]}
          1. ${ring1.MagRange.tome}
          2. ${ring1.MagRange.raid}`);
        }
      }
    });

    collector.on("end", (collected) => {
      const answers = [];
      collected.forEach((value) => answers.push(value.content));
      // store Ring1 choice
      if (answers[answers.length - 1] === "1") {
        if (tanks.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.Tank.tome;
        } else if (heals.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.Heals.tome;
        } else if (
          meleeMaiming.includes(data.job.toLowerCase()) ||
          meleeStriking.includes(data.job.toLowerCase())
        ) {
          data.ring1.name = ring1.Melee.Slaying.tome;
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.Melee.Aiming.tome;
        } else if (physRange.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.PhysRange.tome;
        } else if (magRange.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.MagRange.tome;
        }
      } else if (answers[answers.length - 1] === "2") {
        if (tanks.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.Tank.raid;
        } else if (heals.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.Heals.raid;
        } else if (
          meleeMaiming.includes(data.job.toLowerCase()) ||
          meleeStriking.includes(data.job.toLowerCase())
        ) {
          data.ring1.name = ring1.Melee.Slaying.raid;
        } else if (meleeScouting.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.Melee.Aiming.raid;
        } else if (physRange.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.PhysRange.raid;
        } else if (magRange.includes(data.job.toLowerCase())) {
          data.ring1.name = ring1.MagRange.raid;
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

    // response.data.forEach((entry) => {
    //   if (message.author.username === entry.user) {
    //     gearSet.push(entry);
    //   }
    // });
    const reply = (msg) => {
      message.reply(msg);
    };
    // const currentChannel = message.channel;
    const currentUser = [];

    let userID;
    const gearsets = await axios.get(
      `https://dry-depths-80800.herokuapp.com/gearsets/`
    );
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

  if (message.content.toLowerCase() === `!loot`) {
    const username = message.author.username;
    let gearSet;
    const p1sloot = [];
    // index 0 is amount of Radiant Coating's needed
    const p2sloot = [0];
    // index 0 is amount of Radiant Roborant, index 1 is amount of Radiant Twine
    const p3sloot = [0, 0];
    const p4sloot = [];
    const response = await axios.get(
      "https://dry-depths-80800.herokuapp.com/gearsets"
    );
    response.data.forEach((set) => {
      if (set.user === username) {
        gearSet = set;
      }
    });
    console.log(gearSet);
    // the following logic applies to accessory drops
    if (gearSet.ring1.doesHave === false) {
      if (gearSet.ring1.name.includes(`Asphodelos`)) {
        p1sloot.push(dataArrays.loot.p1s[3]);
        console.log(p1sloot);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    if (gearSet.ring0.doesHave === false) {
      if (gearSet.ring0.name.includes(`Asphodelos`)) {
        p1sloot.push(dataArrays.loot.p1s[3]);
        console.log(p1sloot);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    if (gearSet.wrists.doesHave === false) {
      if (gearSet.wrists.name.includes(`Asphodelos`)) {
        p1sloot.push(dataArrays.loot.p1s[2]);
        console.log(p1sloot);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    if (gearSet.neck.doesHave === false) {
      if (gearSet.neck.name.includes(`Asphodelos`)) {
        p1sloot.push(dataArrays.loot.p1s[1]);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    if (gearSet.ears.doesHave === false) {
      if (gearSet.ears.name.includes(`Asphodelos`)) {
        p1sloot.push(dataArrays.loot.p1s[0]);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    // the following logic applies to Head, Hands and Feet slots
    if (gearSet.feet.doesHave === false) {
      if (gearSet.feet.name.includes(`Asphodelos`)) {
        p2sloot.push(dataArrays.loot.p2s[2]);
        p3sloot.push(dataArrays.loot.p3s[2]);
        console.log(p2sloot);
        console.log(p3sloot);
      } else {
        p3sloot[1]++;
        console.log(p3sloot);
      }
    }
    if (gearSet.hands.doesHave === false) {
      if (gearSet.hands.name.includes(`Asphodelos`)) {
        p2sloot.push(dataArrays.loot.p2s[1]);
        p3sloot.push(dataArrays.loot.p3s[1]);
        console.log(p2sloot);
        console.log(p3sloot);
      } else {
        p3sloot[1]++;
        console.log(p3sloot);
      }
    }
    if (gearSet.head.doesHave === false) {
      if (gearSet.head.name.includes(`Asphodelos`)) {
        p2sloot.push(dataArrays.loot.p2s[0]);
        p3sloot.push(dataArrays.loot.p3s[0]);
        console.log(p2sloot);
        console.log(p3sloot);
      } else {
        p3sloot[1]++;
        console.log(p3sloot);
      }
    }
    // the following logic applies to Legs and Chest slot
    if (gearSet.legs.doesHave === false) {
      if (gearSet.legs.name.includes(`Asphodelos`)) {
        p3sloot.push(dataArrays.loot.p3s[3]);
        console.log(p3sloot);
      } else {
        p3sloot[1]++;
        console.log(p3sloot);
      }
    }
    if (gearSet.body.doesHave === false) {
      if (gearSet.body.name.includes(`Asphodelos`)) {
        p4sloot.push(dataArrays.loot.p4s[2]);
        console.log(p4sloot);
      } else {
        p3sloot[1]++;
        console.log(p3sloot);
      }
    }
    // the following logic applies to the weapon
    if (gearSet.weapon.doesHave === false) {
      if (gearSet.weapon.name.includes(`Asphodelos`)) {
        p4sloot.push(dataArrays.loot.p4s[1]);
        p4sloot.push(dataArrays.loot.p4s[0]);
        console.log(p4sloot);
      } else {
        p2sloot.push(dataArrays.loot.p2s[3]);
        p3sloot.push(dataArrays.loot.p3s[4]);
        console.log(p2sloot);
        console.log(p3sloot);
      }
    }

    const p1sLT = dataArrays.loot.p1s;
    const p2sLT = dataArrays.loot.p2s;
    const p3sLT = dataArrays.loot.p3s;
    const p4sLT = dataArrays.loot.p4s;
    let p1s = `P1S: `;
    let p2s = `P2S: `;
    let p3s = `P3S: `;
    let p4s = `P4S: `;

    // P1S loot phrase creator
    // No need for anything
    if (p1sloot.length === 0) {
      p1s = `You don't need anything from P1S!`;
      // Need 1 thing
    } else if (p1sloot.length === 1) {
      p1s += `${p1sloot[0]}`;
      // Need more than 1 thing
    } else {
      let counter = 0;
      while (counter < p1sloot.length - 1) {
        p1s += `${p1sloot[counter]}, `;
        counter++;
      }
      p1s += p1sloot[p1sloot.length - 1];
    }
    console.log(p1s);

    // P2S loot phrase creator
    // At least 2 items beyond coating
    if (p2sloot.length > 2) {
      // At least 2 coatings
      if (p2sloot[0] > 1) {
        p2s += `${p2sloot[0]} ${p2sLT[4]}s, `;
        let counter = 1;
        while (counter < p2sloot.length - 1) {
          p2s += `${p2sloot[counter]}, `;
          counter++;
        }
        p2s += `${p2sloot[p2sloot.length - 1]}`;
        // Only one coating needed
      } else if (p2sloot[0] === 1) {
        p2s += `1 ${p2sLT[4]}, `;
        let counter = 1;
        while (counter < p2sloot.length - 1) {
          p2s += `${p2sloot[counter]}, `;
          counter++;
        }
        p2s += `${p2sloot[p2sloot.length - 1]}`;
        // No coatings needed
      } else {
        let counter = 1;
        while (counter < p2sloot.length - 1) {
          p2s += `${p2sloot[counter]}, `;
          counter++;
        }
        p2s += `${p2sloot[p2sloot.length - 1]}`;
      }
      // Only 1 item past coating
    } else if (p2sloot.length === 2) {
      // At least 2 coatings
      if (p2sloot[0] > 1) {
        p2s += `${p2sloot[0]} ${p2sLT[4]}s and an ${p2sloot[1]}`;
        // Only one coating
      } else if (p2sloot[0] === 1) {
        p2s += `1 ${p2sLT[4]} and an ${p2sloot[1]}`;
        // No coatings needed
      } else {
        p2s += `${p2sloot[1]}`;
      }
      // Only coatings needed
    } else {
      // At least 2 coatings
      if (p2sloot[0] > 1) {
        p2s += `${p2sloot[0]} ${p2sLT[4]}s`;
        // Only one coating needed
      } else if (p2sloot[0] === 1) {
        p2s += `1 ${p2sLT}`;
        // Don't need anything
      } else {
        p2s = `You don't need anything from P2S!`;
      }
    }
    console.log(p2s);

    // P3S loot phrase creator
    // Needs augmented weapon
    if (p3sloot[0] === 1) {
      if (p3sloot.length > 2) {
        p3s += `1 ${p3sLT[4]}, `;
      } else {
        p3s += `${p3sLT[4]}`;
      }
    }
    // At least 2 items beyond twine
    if (p3sloot.length > 3) {
      // At least 2 twine
      if (p3sloot[1] > 1) {
        p3s += `${p3sloot[1]} ${p3sLT[5]}s, `;
        let counter = 2;
        while (counter < p3sloot.length - 1) {
          p3s += `${p3sloot[counter]}, `;
          counter++;
        }
        p3s += `${p3sloot[counter]}`;
        // Only one twine needed
      } else if (p3sloot[1] === 1) {
        p3s += `1 ${p3sLT[5]}, `;
        let counter = 2;
        while (counter < p3sloot.length - 1) {
          p3s += `${p3sloot[counter]}, `;
          counter++;
        }
        p3s += `${p3sloot[counter]}`;
        // No twine needed
      } else {
        let counter = 2;
        while (counter < p3sloot.length - 1) {
          p3s += `${p3sloot[counter]}, `;
          counter++;
        }
        p3s += `${p3sloot[counter]}`;
      }
      // Only 1 item beyond twine
    } else if (p3sloot.length === 3) {
      // More than 1 twine
      if (p3sloot[1] > 1) {
        p3s += `${p3sloot[1]} ${p3sLT[5]}s and an ${p3sloot[2]}`;
        // Only 1 twine needed
      } else if (p3sloot[1] === 1) {
        p3s += `1 ${p3sLT[5]} and an ${p3sloot[2]}`;
        // No twines needed
      } else {
        p3s += `${p3sloot[2]}`;
      }
      // Only need twine
    } else {
      // more than 1 twine needed
      if (p3sloot[1] > 1) {
        p3s += `${p3sloot[1]} ${p3sLT[5]}s`;
        // only need one twine
      } else if (p3sloot[1] === 1) {
        p3s += `1 ${p3sLT[5]}`;
      } else {
        p3s = `You don't need anything from P3S!`;
      }
    }
    console.log(p3s);

    // P4S loot phrase creator
    // No need for anything
    if (p4sloot.length === 0) {
      p4s = `You don't need anything from P4S`;
    } else if (p4sloot.length === 1) {
      p4s += `${p4sloot[0]}`;
    } else {
      p4s += `${p4sLT[0]} and an ${p4sLT[1]}`;
    }
    console.log(p4s);

    message.reply({
      content: `Hello, ${gearSet.user}! Here's what you need from this raid tier!
      ${p1s}
      ${p2s}
      ${p3s}
      ${p4s}`,
    });
  }
};
