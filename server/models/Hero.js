const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  avatar: { type: String },
  banner: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number }, //难度
    skill: { type: Number }, //技能
    attack: { type: Number }, //攻击
    survive: { type: Number } //生存
  },
  //皮肤
  skins: [{ name: { type: String }, image: { type: String } }],
  //技能
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      delay: { type: String },
      cost: { type: String },
      description: { type: String },
      tips: { type: String }
    }
  ],
  //介绍视频
  video: {
    title: { type: String, default: '' },
    video: { type: String, default: '' },
    submit: { type: Number, default: 0 },
    fan: { type: Number, default: 0 },
    view: { type: Number, default: 0 }
  },
  //顺风出装
  downWind: {
    equipment: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    tips: { type: String }
  },
  //逆风出装
  upWind: {
    equipment: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    tips: { type: String }
  },
  // 使用技巧
  usageTips: { type: String },
  // 对抗技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 最佳搭档
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      description: { type: String }
    }
  ],
  //被谁克制
  restrained: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      desc: { type: String }
    }
  ],
  //克制谁
  restraint: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      desc: { type: String }
    }
  ]
})

module.exports = mongoose.model('Hero', schema, 'heroes')
