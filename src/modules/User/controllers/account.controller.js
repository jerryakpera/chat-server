module.exports = async (req, res, next) => {
  return res.json({
    data: { user: req.user },
    message: 'Logged in',
  });
};
