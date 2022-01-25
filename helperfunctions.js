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
  let option1;
  let option2;

  console.log(`job = ${job}\nslotIndex = ${slotIndex}`);
  for (const [key, value] of Object.entries(roles)) {
    if (value.includes(job)) {
      console.log(`in role switch statement`);
      switch (key) {
        case `tanks`:
          console.log(`in tanks`);
          rFilter = `Tank`;
          break;
        case `heals`:
          return (rFilter = `Heals`);
        case `meleeMaiming`:
          rFilter = `Melee`;
          return (mFilter = `Maiming`);
        case `meleeStriking`:
          rFilter = `Melee`;
          return (mFilter = `Striking`);
        case `meleeScouting`:
          rFilter = `Melee`;
          return (mFilter = `Scouting`);
        case `physRange`:
          return (rFilter = `PhysRange`);
        case `magRange`:
          return (rFilter = `MagRange`);
        default:
          break;
      }
    }
  }
  console.log(`rFilter:\n${rFilter}`);

  if (rFilter !== `Melee`) {
    console.log(`slotIndex:\n${slotIndex}`);
    switch (slotIndex + 1) {
      case 1:
        console.log(`in case 1`)
        option1 = head[rFilter].raid;
        option2 = head[rFilter].tome;
        break;
      case 2:
        option1 = body.rFilter.raid;
        option2 = body.rFilter.tome;
        return [option1, option2];
      case 3:
        option1 = hands.rFilter.raid;
        option2 = hands.rFilter.tome;
        return [option1, option2];
      case 4:
        option1 = legs.rFilter.raid;
        option2 = legs.rFilter.tome;
        return [option1, option2];
      case 5:
        option1 = feet.rFilter.raid;
        option2 = feet.rFilter.tome;
        return [option1, option2];
      case 6:
        option1 = ears.rFilter.raid;
        option2 = ears.rFilter.tome;
        return [option1, option2];
      case 7:
        option1 = neck.rFilter.raid;
        option2 = neck.rFilter.tome;
        return [option1, option2];
      case 8:
        option1 = wrists.rFilter.raid;
        option2 = wrists.rFilter.tome;
        return [option1, option2];
      case 9:
        option1 = ring0.rFilter.raid;
        option2 = ring0.rFilter.tome;
        return [option1, option2];
      case 10:
        option1 = ring1.rFilter.raid;
        option2 = ring1.rFilter.tome;
        return [option1, option2];
      default:
        break;
    }
  } else {
    switch (slotIndex) {
      case 1:
        option1 = head.rFilter.mFilter.raid;
        option2 = head.rFilter.mFilter.tome;
        return [option1, option2];
      case 2:
        option1 = body.rFilter.mFilter.raid;
        option2 = body.rFilter.mFilter.tome;
        return [option1, option2];
      case 3:
        option1 = hands.rFilter.mFilter.raid;
        option2 = hands.rFilter.mFilter.tome;
        return [option1, option2];
      case 4:
        option1 = legs.rFilter.mFilter.raid;
        option2 = legs.rFilter.mFilter.tome;
        return [option1, option2];
      case 5:
        option1 = feet.rFilter.mFilter.raid;
        option2 = feet.rFilter.mFilter.tome;
        return [option1, option2];
      case 6:
        option1 = ears.rFilter.mFilter.raid;
        option2 = ears.rFilter.mFilter.tome;
        return [option1, option2];
      case 7:
        option1 = neck.rFilter.mFilter.raid;
        option2 = neck.rFilter.mFilter.tome;
        return [option1, option2];
      case 8:
        option1 = wrists.rFilter.mFilter.raid;
        option2 = wrists.rFilter.mFilter.tome;
        return [option1, option2];
      case 9:
        option1 = ring0.rFilter.mFilter.raid;
        option2 = ring0.rFilter.mFilter.tome;
        return [option1, option2];
      case 10:
        option1 = ring1.rFilter.mFilter.raid;
        option2 = ring1.rFilter.mFilter.tome;
        return [option1, option2];
      default:
        break;
    }
  }
  console.log(`option1:\n${option1}\noption2:\n${option2}`);
  return [option1, option2];
};

module.exports = {
  embedColorPicker,
  embedIconPicker,
  weaponPicker,
  gearHandler,
};
