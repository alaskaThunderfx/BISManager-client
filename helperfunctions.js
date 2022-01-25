const {
  roles,
  jobicons,
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
} = require(`./dataArrays`);

const embedColorPicker = (job) => {
  let role;
  for (const [key, value] of Object.entries(roles)) {
    if (value.includes(job)) {
      role = key;
    }
  }
  switch (role) {
    case `tanks`:
      return `#000f85`;
    case `heals`:
      return `#005406`;
    default:
      return `#540000`;
  }
};

const embedIconPicker = (job) => {
  let icon;
  for (const [key, value] of Object.entries(jobicons)) {
    if (key === job.value.toUpperCase()) {
      icon = value;
    }
  }
  return icon;
};

const weaponPicker = (job) => {
  let option1;
  let option2;
  for (const [key, value] of Object.entries(weapons)) {
    if (key === job.toUpperCase()) {
      option1 = value.raid;
      option2 = value.tome;
    }
  }
  return;
};

const gearHandler = (job, slotIndex) => {
  let rFilter;
  let mFilter;
  let aFilter
  let option1;
  let option2;

  for (const [key, value] of Object.entries(roles)) {
    if (value.includes(job)) {
      switch (key) {
        case `tanks`:
          rFilter = `Tank`;
          break;
        case `heals`:
          rFilter = `Heals`;
          break;
        case `meleeMaiming`:
          rFilter = `Melee`;
          mFilter = `Maiming`;
          break;
        case `meleeStriking`:
          rFilter = `Melee`;
          mFilter = `Striking`;
          break;
        case `meleeScouting`:
          rFilter = `Melee`;
          mFilter = `Scouting`;
          break;
        case `physRange`:
          rFilter = `PhysRange`;
          break;
        case `magRange`:
          rFilter = `MagRange`;
          break;
        default:
          break;
      }
    }
  }
  // console.log(`rFilter:\n${rFilter}`);
  console.log(`mFilter:\n${mFilter}`)

  if (rFilter !== `Melee`) {
    console.log(`slotIndex:\n${slotIndex}`);
    switch (slotIndex + 1) {
      case 1:
        console.log(`in case 1`);
        option1 = head[rFilter].raid;
        option2 = head[rFilter].tome;
        break;
      case 2:
        console.log(`in case 2`);
        option1 = body[rFilter].raid;
        option2 = body[rFilter].tome;
        // [option1, option2];
        break
      case 3:
        option1 = hands[rFilter].raid;
        option2 = hands[rFilter].tome;
        // [option1, option2];
        break
      case 4:
        option1 = legs[rFilter].raid;
        option2 = legs[rFilter].tome;
        // [option1, option2];
        break
      case 5:
        option1 = feet[rFilter].raid;
        option2 = feet[rFilter].tome;
        // [option1, option2];
        break
      case 6:
        option1 = ears[rFilter].raid;
        option2 = ears[rFilter].tome;
        // [option1, option2];
        break
      case 7:
        option1 = neck[rFilter].raid;
        option2 = neck[rFilter].tome;
        // [option1, option2];
        break
      case 8:
        option1 = wrists[rFilter].raid;
        option2 = wrists[rFilter].tome;
        // [option1, option2];
        break
      case 9:
        option1 = ring0[rFilter].raid;
        option2 = ring0[rFilter].tome;
        // [option1, option2];
        break
      case 10:
        option1 = ring1[rFilter].raid;
        option2 = ring1[rFilter].tome;
        // [option1, option2];
        break
      default:
        break;
    }
  // Questions for melee DPS
  } else {
    if (mFilter === `Maiming` || mFilter === `Striking`) {
      aFilter = `Slaying`
    } else {
      aFilter = `Aiming`
    }
    console.log(`aFilter:\n${aFilter}`)
    switch (slotIndex + 1) {
      case 1:
        option1 = head[rFilter][mFilter].raid;
        option2 = head[rFilter][mFilter].tome;
        // [option1, option2];
        break
      case 2:
        option1 = body[rFilter][mFilter].raid;
        option2 = body[rFilter][mFilter].tome;
        // [option1, option2];
        break
      case 3:
        option1 = hands[rFilter][mFilter].raid;
        option2 = hands[rFilter][mFilter].tome;
        // [option1, option2];
        break
      case 4:
        option1 = legs[rFilter][mFilter].raid;
        option2 = legs[rFilter][mFilter].tome;
        // [option1, option2];
        break
      case 5:
        option1 = feet[rFilter][mFilter].raid;
        option2 = feet[rFilter][mFilter].tome;
        // [option1, option2];
        break
      case 6:
        option1 = ears[rFilter][aFilter].raid;
        option2 = ears[rFilter][aFilter].tome;
        // [option1, option2];
        break
      case 7:
        option1 = neck[rFilter][aFilter].raid;
        option2 = neck[rFilter][aFilter].tome;
        // [option1, option2];
        break
      case 8:
        option1 = wrists[rFilter][aFilter].raid;
        option2 = wrists[rFilter][aFilter].tome;
        // [option1, option2];
        break
      case 9:
        option1 = ring0[rFilter][aFilter].raid;
        option2 = ring0[rFilter][aFilter].tome;
        // [option1, option2];
        break
      case 10:
        option1 = ring1[rFilter][aFilter].raid;
        option2 = ring1[rFilter][aFilter].tome;
        // [option1, option2];
        break
      default:
        break;
    }
  }
  console.log(`option1:\n${option1}\noption2:\n${option2}`);
  // const options = [option1, option2]
  return [ option1, option2 ]
};

module.exports = {
  embedColorPicker,
  embedIconPicker,
  weaponPicker,
  gearHandler,
};
