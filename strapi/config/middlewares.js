module.exports = ({ env }) => {
  // Dynamically whitelist the storage endpoint for the Strapi admin dashboard
  const storageEndpoint = env('AWS_ENDPOINT');
  const storageHost = storageEndpoint ? new URL(storageEndpoint).hostname : '*.amazonaws.com';

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
