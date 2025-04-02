const fs = require("fs-extra");

(async () => {
  try {
    await fs.copy("dist/my-vue-component.js", "../react-app/public/my-vue-component.js");
    console.log("✅ Dist copied to another-output successfully!");
  } catch (err) {
    console.error("❌ Error copying dist:", err);
  }
})();