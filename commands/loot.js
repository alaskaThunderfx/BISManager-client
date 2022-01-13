const axios = require("axios");
const { loot } = require("../dataArrays");

module.exports = {
  name: "loot",
  description: "informs user of what they needs from each fight",
  async execute(message, args) {
    let rollingMessage;
    await message
      .reply(
        "Retrieving that information for you... I know I left it around here somewhere..."
      )
      .then((msg) => (rollingMessage = msg));
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
        p1sloot.push(loot.p1s[3]);
        console.log(p1sloot);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    if (gearSet.ring0.doesHave === false) {
      if (gearSet.ring0.name.includes(`Asphodelos`)) {
        p1sloot.push(loot.p1s[3]);
        console.log(p1sloot);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    if (gearSet.wrists.doesHave === false) {
      if (gearSet.wrists.name.includes(`Asphodelos`)) {
        p1sloot.push(loot.p1s[2]);
        console.log(p1sloot);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    if (gearSet.neck.doesHave === false) {
      if (gearSet.neck.name.includes(`Asphodelos`)) {
        p1sloot.push(loot.p1s[1]);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    if (gearSet.ears.doesHave === false) {
      if (gearSet.ears.name.includes(`Asphodelos`)) {
        p1sloot.push(loot.p1s[0]);
      } else {
        p2sloot[0]++;
        console.log(p2sloot);
      }
    }
    // the following logic applies to Head, Hands and Feet slots
    if (gearSet.feet.doesHave === false) {
      if (gearSet.feet.name.includes(`Asphodelos`)) {
        p2sloot.push(loot.p2s[2]);
        p3sloot.push(loot.p3s[2]);
        console.log(p2sloot);
        console.log(p3sloot);
      } else {
        p3sloot[1]++;
        console.log(p3sloot);
      }
    }
    if (gearSet.hands.doesHave === false) {
      if (gearSet.hands.name.includes(`Asphodelos`)) {
        p2sloot.push(loot.p2s[1]);
        p3sloot.push(loot.p3s[1]);
        console.log(p2sloot);
        console.log(p3sloot);
      } else {
        p3sloot[1]++;
        console.log(p3sloot);
      }
    }
    if (gearSet.head.doesHave === false) {
      if (gearSet.head.name.includes(`Asphodelos`)) {
        p2sloot.push(loot.p2s[0]);
        p3sloot.push(loot.p3s[0]);
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
        p3sloot.push(loot.p3s[3]);
        console.log(p3sloot);
      } else {
        p3sloot[1]++;
        console.log(p3sloot);
      }
    }
    if (gearSet.body.doesHave === false) {
      if (gearSet.body.name.includes(`Asphodelos`)) {
        p4sloot.push(loot.p4s[1]);
        console.log(p4sloot);
      } else {
        p3sloot[1]++;
        console.log(p3sloot);
      }
    }
    // the following logic applies to the weapon
    if (gearSet.weapon.doesHave === false) {
      if (gearSet.weapon.name.includes(`Asphodelos`)) {
        p4sloot.push(loot.p4s[0]);
        console.log(p4sloot);
      } else {
        p2sloot.push(loot.p2s[3]);
        p3sloot.push(loot.p3s[4]);
        console.log(p2sloot);
        console.log(p3sloot);
      }
    }

    const p1sLT = loot.p1s;
    const p2sLT = loot.p2s;
    const p3sLT = loot.p3s;
    const p4sLT = loot.p4s;
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

    rollingMessage.edit({
      content: `Hello, ${gearSet.user}! Here's what you need from this raid tier!
          ${p1s}
          ${p2s}
          ${p3s}
          ${p4s}`,
    });
  },
};
