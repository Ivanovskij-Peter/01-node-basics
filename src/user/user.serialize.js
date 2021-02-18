exports.serializeUser = (user) => {
  return {
    id: user.id,
    email: user.email,
    subscription: user.subscription,
  };
};
