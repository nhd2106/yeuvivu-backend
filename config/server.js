module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1447),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'a8f3b564ffbb06be667c00aca8aa32af'),
    },
  },
});
