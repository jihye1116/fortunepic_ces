import "./global.css";
import "./i18n";

import {
  createBrowserHistory,
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import { routeTree } from "./routeTree.gen.ts";

// Electron 환경 감지
const isElectron =
  !!window.Electron || navigator.userAgent.toLowerCase().includes("electron");

// Electron에서는 file:// 프로토콜 때문에 메모리 히스토리 사용
// 웹에서는 브라우저 히스토리 사용
const history = isElectron
  ? createMemoryHistory({ initialEntries: ["/"] })
  : createBrowserHistory();

const router = createRouter({
  routeTree,
  history,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
