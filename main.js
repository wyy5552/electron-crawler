// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const { request } = require("node:http");
const https = require("https");
const path = require("path");
const urlModule = require("url");
const { session } = require("electron");
const fetch = require("node-fetch");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const homeIndex =
    "https://6602.play.gamezop.com/game-files/SyfxJ3a75Cr/index.html?msstart_sdk_init=eyJwYXJlbnRPcmlnaW4iOiJodHRwczovL3d3dy5tc24uY29tIiwiY2xpZW50SWQiOiIxRTYyQzgwQjk5ODA2NEJFMzI1OERDNEI5ODEyNjU2MiIsImxvY2FsZSI6ImVuLXVzIiwiZW50cnlQb2ludElkIjoiY2diaW5naHAifQ&id=6602&nonce=1.40.91";
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // Attach the debugger
  try {
    mainWindow.webContents.debugger.attach("1.1");
  } catch (err) {
    console.log("Debugger attach failed : ", err);
  }

  // Enable the Network
  // Skip all pauses
  mainWindow.webContents.debugger.sendCommand("Debugger.enable").then(() => {
    mainWindow.webContents.debugger.sendCommand("Debugger.setSkipAllPauses", {
      skip: true,
    });
    // Disable all breakpoints
    mainWindow.webContents.debugger.sendCommand(
      "Debugger.setBreakpointsActive",
      {
        active: true,
      }
    );
  });

  mainWindow.webContents.debugger.on(
    "Network.responseReceived",
    (event, info) => {
      mainWindow.webContents.debugger
        .sendCommand("Network.getResponseBody", {
          requestId: info.requestId,
        })
        .then((response) => {
          const url = info.response.url;
          console.log(url);
          const parsedUrl = urlModule.parse(url);
          const filePath = path.join(
            __dirname,
            "web",
            parsedUrl.hostname,
            parsedUrl.pathname
          );
          console.log(JSON.stringify(parsedUrl));
          fs.mkdirSync(path.dirname(filePath), { recursive: true });

          const file = fs.createWriteStream(filePath);
          file.write(response.body);
          file.end();
        });
    }
  );

  // Load the URL
  mainWindow.loadURL(homeIndex);

  //   session.defaultSession.webRequest.onBeforeRequest(
  //     { urls: ["<all_urls>"] },
  //     (details, callback) => {
  //       if (
  //         details.resourceType === "script" &&
  //         details.url.includes("gamezop.js")
  //       ) {
  //         fetch(details.url)
  //           .then((response) => response.text())
  //           .then((body) => {
  //             console.log(details.url);
  //             const bodyString = JSON.stringify(body);
  //             mainWindow.webContents.executeJavaScript(`
  //               var newBody = ${bodyString}.replace(/debugger/g, "console.log(0)");
  //               var scriptElement = document.createElement('script');
  //               scriptElement.textContent = (newBody);
  //               document.body.appendChild(scriptElement);
  //             `);
  //             callback({ cancel: true });
  //           })
  //           .catch((err) => {
  //             console.error(err);
  //             callback({ cancel: false });
  //           });
  //       } else {
  //         callback({ cancel: false });
  //       }
  //     }
  //   );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
