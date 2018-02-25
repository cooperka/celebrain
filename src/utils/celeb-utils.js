const utils = {

  getDisplayName({ title = '' }, onlyFirstName) {
    // Remove any trailing annotation (e.g. "(Actor)").
    const realName = title.replace(/ \(.*/, '').trim();

    return onlyFirstName
      ? realName.split(' ')[0]
      : realName;
  },

};

export default utils;
