const utils = {

  getDisplayName({ name = '' }, onlyFirstName) {
    // Remove any trailing annotation (e.g. "(Actor)").
    const realName = name.replace(/ \(.*/, '').trim();

    return onlyFirstName
      ? realName.split(' ')[0]
      : realName;
  },

};

export default utils;
