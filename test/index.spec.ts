// test/index.spec.ts
import { SELF } from "cloudflare:test";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("worker", () => {
  it("responds text/plain C# DateTime.Ticks time", async () => {
    const now = new Date();
    vi.setSystemTime(now);
    const response = await SELF.fetch("https://example.com");
    expect(await response.text()).toEqual(`${now.getTime() * 10000}`);
  });
});
