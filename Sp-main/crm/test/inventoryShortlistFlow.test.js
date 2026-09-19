'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.resolve(__dirname, '..', 'inventory.html'), 'utf8');

test('Inventory cards expose the requirement-based shortlist action for Builder and Own listings', () => {
  assert.match(html, /Shortlist/);
  assert.match(html, /openShortlistModal|loadRequirementsForShortlist/);
  assert.match(html, /\/api\/v2\/shortlist\/\$\{encodeURIComponent\(requirementId\)\}\/add/);
  assert.match(html, /data-testid="shortlist-button/);
});
