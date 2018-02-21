const utils = {

  getName({ name = '' }, onlyFirstName) {
    return onlyFirstName
      ? name.trim().split(' ')[0]
      : name;
  },

};

export default utils;
