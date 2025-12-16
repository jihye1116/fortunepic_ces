import { app, BrowserWindow, systemPreferences } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
const getRendererPath = () => {
  if (VITE_DEV_SERVER_URL) {
    return null;
  }
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "app.asar.unpacked", "dist");
  }
  return RENDERER_DIST;
};
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  const isDev = !!VITE_DEV_SERVER_URL;
  win = new BrowserWindow({
    fullscreen: !isDev,
    // 개발 모드에서는 fullscreen 해제
    frame: !isDev,
    // 개발 모드에서는 frame 표시
    autoHideMenuBar: true,
    alwaysOnTop: !isDev,
    // 개발 모드에서는 alwaysOnTop 해제
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.maximize();
  if (isDev) {
    win.webContents.openDevTools();
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    const rendererPath = getRendererPath();
    if (rendererPath) {
      const indexPath = path.join(rendererPath, "index.html");
      const indexUrl = new URL(`file://${indexPath}`).href;
      win.loadURL(indexUrl);
    }
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(async () => {
  if (process.platform === "darwin") {
    await systemPreferences.askForMediaAccess("camera");
  }
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
