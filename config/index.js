module.export = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secretssecretsarenofunsecretssecretshurtsomeone'
};
