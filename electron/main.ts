import { app, BrowserWindow, systemPreferences } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

// 프로덕션 빌드에서는 app.getAppPath()를 사용
const getRendererPath = () => {
  if (VITE_DEV_SERVER_URL) {
    return null; // 개발 모드에서는 URL 사용
  }
  if (app.isPackaged) {
    // asarUnpack을 사용하여 dist 폴더를 app.asar.unpacked에 둠
    return path.join(process.resourcesPath, "app.asar.unpacked", "dist");
  }
  // 개발 빌드
  return RENDERER_DIST;
};

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  const isDev = !!VITE_DEV_SERVER_URL;

  win = new BrowserWindow({
    fullscreen: !isDev, // 개발 모드에서는 fullscreen 해제
    frame: !isDev, // 개발 모드에서는 frame 표시
    autoHideMenuBar: true,
    alwaysOnTop: !isDev, // 개발 모드에서는 alwaysOnTop 해제
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.maximize();

  // 개발 모드에서만 개발자 도구 자동 열기
  if (isDev) {
    win.webContents.openDevTools();
  }

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    const rendererPath = getRendererPath();
    if (rendererPath) {
      const indexPath = path.join(rendererPath, "index.html");
      // file:// 프로토콜을 사용하여 URL로 로드
      const indexUrl = new URL(`file://${indexPath}`).href;
      win.loadURL(indexUrl);
    }
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
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
