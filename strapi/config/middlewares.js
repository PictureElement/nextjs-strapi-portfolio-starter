module.exports = ({ env }) => {
  const endpoint = env('AWS_ENDPOINT');

  // Only attempt to parse if a protocol is included. Otherwise, fallback to a wildcard.
  const storageHost =
    endpoint && endpoint.startsWith('http') ? new URL(endpoint).hostname : '*.amazonaws.com';

  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', storageHost],
            'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', storageHost],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
    'global::rate-limit',
  ];
};
