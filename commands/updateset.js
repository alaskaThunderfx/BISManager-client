const axios = require('axios')

module.exports = {
  name: "updateset",
  description: `allows user to update when they've gotten a set piece`,
  async execute(message, args) {
    const userNames = [];
    const gearSet = [];
    const reply = (msg) => {
      message.reply(msg);
    };
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
        const intro = `Hey, ${message.member.displayName}, if you've obtained any of these, please type "got (item slot)". (An example would be "got ring 1" or "got weapon"):`;
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
  },
};
