const auth = (req, res, next) => {
  const cookieName = req.cookies.name;
  if (!cookieName) {
    return res.status(401)
      .json({ success: false, msg: `Unauthorized` });
  } else {
    req.user = cookieName;
    next();
  };
};

module.exports = { auth };
