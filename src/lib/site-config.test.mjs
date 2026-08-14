import assert from "node:assert/strict";
import test from "node:test";

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SUPPORT_EMAIL,
  buildDefaultSeoDescription,
  buildDefaultSeoTitle,
} from "./site-config.ts";

test("exposes HobbyLovKa as the canonical site brand", () => {
  assert.equal(SITE_NAME, "HobbyLovKa");
  assert.match(SITE_DESCRIPTION, /рукоділля/);
  assert.equal(SITE_SUPPORT_EMAIL, "support@hobbylovka.local");
});

test("builds canonical HobbyLovKa SEO defaults", () => {
  assert.equal(
    buildDefaultSeoTitle("Нитки"),
    "Нитки: купити в інтернет-магазині HobbyLovKa",
  );
  assert.match(buildDefaultSeoDescription("Нитки"), /HobbyLovKa/);
});
