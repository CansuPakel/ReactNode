const generateMessage = (username, text) => {
  return {
    username,
    text,
    date: new Date().getTime()
  };
};

const generateLocationMessage = (username, url) => {
  return {
    username,
    url,
    date: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
