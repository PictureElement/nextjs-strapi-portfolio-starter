'use strict';

/**
 * not-found service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::not-found.not-found');
