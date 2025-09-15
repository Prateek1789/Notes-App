let worker;

export function initDBWorker() {
  if (!worker) {
    worker = new Worker(new URL("./db-worker.js", import.meta.url), {
      type: "module",
    });
  }
  return worker;
}

export function dbWorkerCall(action, payload) {
  return new Promise((resolve, reject) => {
    const dbWorker = initDBWorker();

    const handleMessage = (e) => {
      const { action: resAction, result, error } = e.data;
      if (resAction === action) {
        dbWorker.removeEventListener("message", handleMessage);
        error ? reject(new Error(error)) : resolve(result);
      }
    };

    dbWorker.addEventListener("message", handleMessage);
    dbWorker.postMessage({ action, payload });
  });
}