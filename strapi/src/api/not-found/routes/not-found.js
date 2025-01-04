'use strict';

/**
 * not-found router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::not-found.not-found');
