import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { createTicketApplication } from "../../server/app.js";

test("GET /api/tickets returns the seeded dashboard tickets", async (t) => {
  const baseUrl = await startApplication(t);
  const response = await fetch(`${baseUrl}/api/tickets`);
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.tickets.length, 6);
  assert.equal(payload.tickets[0].id, "TCK-1088");
  assert.equal(
    payload.tickets[0].summary,
    "Verifica immediata e contatto con il cliente"
  );
});

async function startApplication(t) {
  const directory = mkdtempSync(join(tmpdir(), "aicu-l29-"));
  const application = createTicketApplication({
    databasePath: join(directory, "tickets.sqlite"),
    summaryDelayMs: 0
  });

  await new Promise((resolveListen) => {
    application.server.listen(0, "127.0.0.1", resolveListen);
  });

  t.after(() => application.close());
  const address = application.server.address();
  return `http://127.0.0.1:${address.port}`;
}
