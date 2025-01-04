'use strict';

/**
 * not-found controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::not-found.not-found');
