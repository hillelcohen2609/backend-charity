const expresss = require("express");
const {
  about,
  test,
  testJwtCookie,
  getCreds,
} = require("../controllers/testController");

const router = expresss.Router();

// Define routes and associate them with controller functions
router.get("/test", async (req, res) => {
  const t = await test();
  res.send(t);
});
router.get("/about", async (req, res) => {
  const verify = await about();
  res.send(verify);
});

router.post("/test", async (req, res) => {
  const token = await testJwtCookie(req, res);
  res.send(token);
});
router.get("/test-token", async (req, res) => {
  const creds = await getCreds(req, res);
  res.send(creds);
});

module.exports = router;
