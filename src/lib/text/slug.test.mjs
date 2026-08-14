import assert from "node:assert/strict";
import test from "node:test";

import { resolveSlug, slugifyText } from "./slug.ts";

const ukrainianSlugCases = [
  ["Пристрої", "prystroyi"],
  ["Комплектуючі", "komplektuyuchi"],
  ["Рукоділля", "rukodillya"],
  ["Вишивання", "vyshyvannya"],
  ["Одяг", "odyag"],
  ["Тканини та фурнітура", "tkanyny-ta-furnitura"],
  ["Аксесуари для рукоділля", "aksesuari-dlya-rukodillya"],
  ["Матеріали для рукоділля", "materialy-dlya-rukodillya"],
];

test("transliterates Ukrainian category names into normalized slugs", () => {
  for (const [name, expectedSlug] of ukrainianSlugCases) {
    assert.equal(slugifyText(name), expectedSlug);
  }

  assert.equal(
    slugifyText("  Тканини, та фурнітура!!!  "),
    "tkanyny-ta-furnitura",
  );
});

test("preserves a non-empty manual slug", () => {
  assert.equal(resolveSlug("  accessories  ", "Комплектуючі"), "accessories");
});

test("generates a slug only when the manual value is blank", () => {
  assert.equal(
    resolveSlug("   ", "Набори для вишивання"),
    "nabory-dlya-vyshyvannya",
  );
});

test("regenerates the category slug from the resulting name", () => {
  assert.equal(slugifyText("Матеріали"), "materialy");
});
