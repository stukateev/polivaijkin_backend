const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
        article: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        sale: {
          type: Number,
        },
        availability: {
          type: Boolean,
          required: true,
        },
        description: {
          type: String,
        },
          manufactured:{
          type: String,
        },
        diameter1: {
          type: String,
        },
        diameter2: {
          type: String,
        },
        diameter3: {
          type: String,
        },
        carving1: {
          type: String,
          },
        carving2: {
          type: String,
        },
        carving3: {
          type: String,
        },
        carvingInt1: {
          type: String,
        },
        carvingInt2: {
          type: String,
        },
        carvingInt3: {
          type: String,
        },
        carvingSprinkler: {
          type: String,
        },
        typeSprinkler: {
          type: String,
        },
        typeNozzle: {
          type: String,
        },
        radius: {
          type: String,
        },
        controllerWifi: {
          type: Boolean,
        },
        controllerOutdoor: {
          type: Boolean,
        },
        controllerValve: {
          type: Number,
        },
        controllerAutonomous: {
          type: Boolean,
        },

        image: {
          type: String,
          validate: [
            {
              validator: (url) => validator.isURL(url),
              message: 'Некорректный URL',
            },
          ],
        },
        instructionLink: {
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
