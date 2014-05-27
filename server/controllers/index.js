var DrugController   = require('./drug.js');
var TweetController  = require('./tweet.js');
var EffectController = require('./effect.js');
var Models           = require('../models');
var controllerUtils  = require('./controllerUtils.js');

module.exports = {
  getDrugs: controllerUtils.robustQuery(Models.Drug, {
    matching: {},
    fields: "name company handle",
    options: {}
  }),

  getEffects: controllerUtils.robustQuery(Models.Effect, {
    matching: {},
    fields: "name",
    options: {}
  }),

  getTweets: controllerUtils.robustQuery(Models.Tweet, {
    matching: {},
    fields: "tweet link",
    options: {}
  }),

  getEmoji: controllerUtils.robustQuery(Models.Emoji, {
    matching: {},
    fields: "symptom link",
    options: {}
  }),

  postDrug: controllerUtils.robustPost(Models.Drug, {
    name: "name",
    company: "company",
    handle: "handle"
  }),

  postEffect: controllerUtils.robustPost(Models.Effect, {
    name: "name"
  }),

  postTweet: controllerUtils.robustPost(Models.Tweet, {
    link: 'link',
    tweet: 'tweet'
  }),

  postEmoji: controllerUtils.robustPost(Models.Emoji, {
    symptom: "symptom",
    link: "link"
  }),

  postEffectToDrug: EffectController.postEffectToDrug,
  getEffectsFromDrug: EffectController.getEffectsFromDrug,
};
