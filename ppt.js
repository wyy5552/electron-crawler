const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function downloadPage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 监听所有网络请求
  page.on("response", async (response) => {
    const url = response.url();
    const status = response.status();

    if (status >= 200 && status < 300) {
      const filePath = response.url().split("/").pop().split("?")[0]; // 简化的路径提取，可能需要调整
      const buffer = await response.buffer();
      const filePath2 = path.join(__dirname, "web", filePath);
      console.log(filePath2);
      // 如果filePath2不存在，则创建文件

      if (!fs.existsSync(filePath2)) {
        // 如果路径不存在，创建它
        if (filePath2.endsWith("/") || !path.extname(filePath2)) {
          // 如果路径以斜杠结尾，或者路径没有文件扩展名，那么它是一个文件夹
          fs.mkdirSync(filePath2, { recursive: true });
        } else {
          // 否则，它是一个文件
          fs.mkdirSync(path.dirname(filePath2), { recursive: true });
          fs.writeFileSync(filePath2, "");
        }
      }

      fs.writeFileSync(filePath2, buffer, "binary");
      console.log(`Downloaded: ${url}`);
    }
  });

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  await browser.close();
}
const homeIndex =
  "https://6602.play.gamezop.com/game-files/SyfxJ3a75Cr/index.html?msstart_sdk_init=eyJwYXJlbnRPcmlnaW4iOiJodHRwczovL3d3dy5tc24uY29tIiwiY2xpZW50SWQiOiIxRTYyQzgwQjk5ODA2NEJFMzI1OERDNEI5ODEyNjU2MiIsImxvY2FsZSI6ImVuLXVzIiwiZW50cnlQb2ludElkIjoiY2diaW5naHAifQ&id=6602&nonce=1.40.91";
downloadPage(homeIndex);
