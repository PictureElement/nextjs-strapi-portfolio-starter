'use strict';

/**
 * privacy-policy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::privacy-policy.privacy-policy');
