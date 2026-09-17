// Test storage safety and migration logic
import assert from 'assert';

console.log('Testing storage safety scenarios...');

// Scenario 1: Empty storage
const emptyStorage = {};
const testSafeParse = (raw, fallback) => {
  try {
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? { ...fallback, ...parsed } : fallback;
  } catch {
    return fallback;
  }
};

const fallbackProfile = { name: "Alex Mercer", weight: 68.2, isOnboarded: false };
assert.deepStrictEqual(testSafeParse(emptyStorage['profile'], fallbackProfile), fallbackProfile);
console.log('✔ Scenario 1 Passed: Empty storage returns safe defaults');

// Scenario 2: Corrupted JSON string
const corruptedJSON = "{ invalid_json: ... [";
assert.deepStrictEqual(testSafeParse(corruptedJSON, fallbackProfile), fallbackProfile);
console.log('✔ Scenario 2 Passed: Malformed JSON recovers gracefully without throwing');

// Scenario 3: Partial or outdated state
const outdatedJSON = JSON.stringify({ name: "Alex" });
const merged = testSafeParse(outdatedJSON, fallbackProfile);
assert.strictEqual(merged.name, "Alex");
assert.strictEqual(merged.weight, 68.2);
console.log('✔ Scenario 3 Passed: Outdated state preserves new schema defaults');

// Scenario 4: Hero arc math checks
const calcProgress = (consumed, target) => Math.min(1, Math.max(0, consumed / Math.max(1, target)));
assert.strictEqual(calcProgress(0, 2100), 0);
assert.strictEqual(calcProgress(1050, 2100), 0.5);
assert.strictEqual(calcProgress(2100, 2100), 1);
assert.strictEqual(calcProgress(3000, 2100), 1); // clamped
assert.strictEqual(calcProgress(50, 0), 1); // safe divide by zero
console.log('✔ Scenario 4 Passed: Hero arc calculation safely clamps between 0 and 1');

console.log('\nAll offline safety and calculation tests PASSED successfully!');
