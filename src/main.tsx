
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ErrorBoundary } from "./app/components/ErrorBoundary.tsx";
import "./styles/index.css";

function showStartupError(message: string) {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#F7F4F1;color:#2D2A26;font-family:Arial,sans-serif;">
      <div style="max-width:860px;width:100%;background:#fff;border:1px solid #eadfce;border-radius:12px;padding:20px;">
        <h1 style="margin:0 0 12px;font-size:20px;">Startup error</h1>
        <pre style="white-space:pre-wrap;word-break:break-word;margin:0;font-size:13px;line-height:1.4;">${message}</pre>
      </div>
    </div>
  `;
}

window.addEventListener("error", (event) => {
  showStartupError(event.error?.stack || event.message || "Unknown runtime error");
});

window.addEventListener("unhandledrejection", (event) => {
  const reason = (event.reason && (event.reason.stack || event.reason.message)) || String(event.reason);
  showStartupError(reason || "Unhandled promise rejection");
});

try {
  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
  );
} catch (error) {
  const message = error instanceof Error ? (error.stack || error.message) : String(error);
  showStartupError(message);
}
  
