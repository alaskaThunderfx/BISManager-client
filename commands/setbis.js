const axios = require("axios");
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
} = require("../dataArrays");

module.exports = {
  name: "setbis",
  description: "allows user to set their gear set",
  async execute(message, args) {
    let rollingMessage;
    await message
      .reply(
        "Retrieving that information for you... I know I left it around here somewhere..."
      )
      .then((msg) => (rollingMessage = msg));
    const userNames = [];
    const response = await axios.get(
      "https://dry-depths-80800.herokuapp.com/users"
    );
    response.data.forEach((entry) => userNames.push(entry.user));
    if (!userNames.includes(message.author.username)) {
      rollingMessage.edit({
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
    rollingMessage.edit(questions[counter]);

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
  },
};
