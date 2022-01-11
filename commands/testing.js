const { default: axios } = require("axios");

async function getUsers() {
  try {
    const response = await axios.get("http://localhost:4741/users");
    console.log(response.data);
    if (response.data.includes(message.author.username)) {
      console.log(true);
    } else {
      console.log(false);
    }
  } catch (err) {
    console.error(err);
  }
}

async function addUser() {
    await axios.post
}

module.exports = {
  getUsers,
};
