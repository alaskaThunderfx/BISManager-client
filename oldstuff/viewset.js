const axios = require("axios");

module.exports = {
  name: "viewset",
  description: "allows users to see their current set",
  async execute(message, args) {
    let rollingMessage;
    await message
      .reply(
        "Retrieving that information for you... I know I left it around here somewhere..."
      )
      .then((msg) => (rollingMessage = msg));
    const userNames = [];
    const gearSets = [];
    try {
      const response = await axios.get(
        "https://dry-depths-80800.herokuapp.com/users"
      );
      response.data.forEach((entry) => userNames.push(entry.user));
      if (userNames.includes(message.author.username)) {
        const gearsets = await axios.get(
          "https://dry-depths-80800.herokuapp.com/gearsets"
        );
        gearsets.data.forEach((entry) => {
          if (entry.user === message.author.username) {
            console.log(entry);
            gearSets.push(entry);
            const intro = `Here's your gear set, ${message.member.displayName}:`;
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
            rollingMessage.edit({ content: statement });
          }
        });
      } else {
        rollingMessage.edit({
          content: `Hello ${message.member.displayName}! Nice to meet you! You've been added to the BISManager users! Please type !bismanager to see a list of commands!`,
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
  },
};
