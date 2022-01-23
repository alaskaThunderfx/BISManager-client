const { roles, jobicons, weapons } = require(`./dataArrays`);

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

module.exports = {
  embedColorPicker,
  embedIconPicker,
  weaponPicker
};
