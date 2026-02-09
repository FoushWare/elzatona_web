import { setupWorker } from "msw/browser";
import handlers from "./msw-handlers";
import { beforeAll, afterAll, afterEach } from "vitest";

export const worker = setupWorker(...handlers);

beforeAll(async () => {
  await worker.start({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  worker.resetHandlers();
});

afterAll(() => {
  worker.stop();
});

export default worker;
