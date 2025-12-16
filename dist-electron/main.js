import { app as s, BrowserWindow as i, systemPreferences as f } from "electron";
import { fileURLToPath as m } from "node:url";
import n from "node:path";
const a = n.dirname(m(import.meta.url));
process.env.APP_ROOT = n.join(a, "..");
const o = process.env.VITE_DEV_SERVER_URL, u = n.join(process.env.APP_ROOT, "dist-electron"), c = n.join(process.env.APP_ROOT, "dist"), R = () => o ? null : s.isPackaged ? n.join(process.resourcesPath, "app.asar.unpacked", "dist") : c;
process.env.VITE_PUBLIC = o ? n.join(process.env.APP_ROOT, "public") : c;
let e;
function l() {
  const r = !!o;
  if (e = new i({
    fullscreen: !r,
    // 개발 모드에서는 fullscreen 해제
    frame: !r,
    // 개발 모드에서는 frame 표시
    autoHideMenuBar: !0,
    alwaysOnTop: !r,
    // 개발 모드에서는 alwaysOnTop 해제
    icon: n.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: n.join(a, "preload.mjs")
    }
  }), e.maximize(), r && e.webContents.openDevTools(), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), o)
    e.loadURL(o);
  else {
    const t = R();
    if (t) {
      const d = n.join(t, "index.html"), p = new URL(`file://${d}`).href;
      e.loadURL(p);
    }
  }
}
s.on("window-all-closed", () => {
  process.platform !== "darwin" && (s.quit(), e = null);
});
s.on("activate", () => {
  i.getAllWindows().length === 0 && l();
});
s.whenReady().then(async () => {
  process.platform === "darwin" && await f.askForMediaAccess("camera"), l();
});
export {
  u as MAIN_DIST,
  c as RENDERER_DIST,
  o as VITE_DEV_SERVER_URL
};
