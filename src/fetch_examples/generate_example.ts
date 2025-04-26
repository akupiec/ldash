import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

const TMP_PATH = "./tmp";
fs.rmSync(TMP_PATH, { recursive: true, force: true });
execSync(
  "git clone --depth 1 https://github.com/linuxserver/Heimdall-Apps.git tmp",
);

const stuff = fs
  .readdirSync(TMP_PATH)
  .filter(
    (f) =>
      !f.startsWith(".") && fs.existsSync(path.join(TMP_PATH, f, "app.json")),
  )
  .map((f) => {
    const appJson = JSON.parse(
      fs.readFileSync(path.join(TMP_PATH, f, "app.json")).toString(),
    );
    return {
      ...appJson,
      icon: path.join(TMP_PATH, f, appJson.icon),
    };
  })
  .map((data) => {
    const fileName = path.basename(data.icon);
    const newFilePath = path.join("../public/assets/example/", fileName);
    fs.copyFileSync(data.icon, newFilePath);
    delete data.appid;
    delete data.config;
    delete data.enhanced;
    data.color = data.tile_background === "light" ? "#fafbfc" : "#16161f";
    delete data.tile_background;
    return {
      ...data,
      icon: "./assets/example/" + fileName,
      href: `https://${data.name}.example.com`,
    };
  });

fs.writeFileSync(
  "../public/config.example.json",
  JSON.stringify(stuff, undefined, 2),
);
