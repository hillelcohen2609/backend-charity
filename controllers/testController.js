const testController = {};
testController.index = (req, res) => {
  console.log("in test controller");
  res.send("hello from sample");
};
testController.about = (req, res) => {
  console.log("in test controller");
  res.json({ hillel: 90 });
};

module.exports = testController;
