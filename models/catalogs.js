const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
        Article: {
          type: String,

        },
        Title: {
          type: String,
          required: true,
        },
        Price: {
          type: Number,
          required: true,
        },
        PriceUSD: {
          type: Number,
        },
        Sale: {
          type: Number,
        },
        StockOpt: {
          type: Boolean,
          required: true,
        },
        StockKrd1: {
          type: Boolean,
          required: true,
        },
        StockKrd2: {
          type: Boolean,
          required: true,
        },
        CategoryTranslit: {
          type: String,
        },
        Category: {
          type: String,
        },
        MainCategory: {
          type: String,
        },
        MainCategoryTranslit: {
          type: String,
        },
        Description: {
          type: String,
        },
        Manufactured:{
          type: String,
        },
        Diameter1: {
          type: String,
        },
        Diameter2: {
          type: String,
        },
        Diameter3: {
          type: String,
        },
        Carving1: {
          type: String,
          },
        Carving2: {
          type: String,
        },
        Carving3: {
          type: String,
        },
        CarvingInt1: {
          type: String,
        },
        CarvingInt2: {
          type: String,
        },
        CarvingInt3: {
          type: String,
        },
        CarvingSprinkler: {
          type: String,
        },
        TypeSprinkler: {
          type: String,
        },
        TypeNozzle: {
          type: String,
        },
        Radius: {
          type: String,
        },
        ControllerWifi: {
          type: Boolean,
        },
        ControllerOutdoor: {
          type: Boolean,
        },
        ControllerValve: {
          type: Number,
        },
        ControllerAutonomous: {
          type: Boolean,
        },
        ImageLink: {
          type: String,
          validate: [
            {
              validator: (url) => validator.isURL(url),
              message: 'Некорректный URL',
            },
          ],
        },
        ImageAlt: {
          type: String,
      },
        InstructionLink: {
          type: String,
          validate: [
            {
              validator: (url) => validator.isURL(url),
              message: 'Некорректный URL',
            },
          ],
        },


      },
      { versionKey: false },
);

module.exports = mongoose.model('catalog', productSchema);
