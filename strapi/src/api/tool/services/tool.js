'use strict';

/**
 * tool service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tool.tool');
