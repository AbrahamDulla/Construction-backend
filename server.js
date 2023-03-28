const app = require("./src/api/index");

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express Crud is running on port http://localhost:${PORT}`);
});
