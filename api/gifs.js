const Boom = require('boom');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const BPromise = require('bluebird');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = BPromise.promisifyAll(new AWS.S3({ apiVersion: '2006-03-01' }));

module.exports.createGifSignedUrl = (request, reply) => {
  const fileName = `${uuid.v4()}.gif`;

  const params = {
    Bucket: process.env.AWS_S3_GIF_BUCKET,
    Key: fileName,
    Expires: 600,
    ContentType: 'image/gif',
  };

  return s3.getSignedUrlAsync('putObject', params)
    .then(data => ({
      signedUrl: data,
      publicUrl: `https://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_GIF_BUCKET}/${fileName}`,
      fileName,
    }))
    .then(reply)
    .catch(err => reply(Boom.badImplementation('Gif creation failed', err)));
};
