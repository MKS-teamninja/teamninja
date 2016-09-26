var Config = module.exports;

Config.getCgApiKey = function() {
  return process.env.CAMPGROUND_KEY; // Return the API key
};

Config.getOtherKey = function() {
  return ''
};
