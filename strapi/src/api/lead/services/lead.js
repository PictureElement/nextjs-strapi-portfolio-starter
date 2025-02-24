'use strict';

/**
 * lead service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lead.lead');
