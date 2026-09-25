module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
          },
          region: env('AWS_REGION'),
          endpoint: env('AWS_ENDPOINT'),
          forcePathStyle: env.bool('AWS_FORCE_PATH_STYLE', true),
          params: {
            Bucket: env('AWS_BUCKET'),
            ACL: env('AWS_ACL', 'public-read'), // Ensures portfolio images are publicly viewable
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
