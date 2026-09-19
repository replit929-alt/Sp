'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const file = path.resolve(__dirname, '..', 'builder-projects.html');
const html = fs.readFileSync(file, 'utf8');

test('Residential filters include BHK, carpet, super built-up, price, builder and location controls', () => {
  assert.match(html, /1 BHK/);
  assert.match(html, /BHK/);
  assert.match(html, /Carpet Area/);
  assert.match(html, /Super Built-up/);
  assert.match(html, /Price/);
  assert.match(html, /Builder/);
  assert.match(html, /Location/);
});

test('Commercial, Industrial, Land / Plot and Agriculture filters expose category-specific fields', () => {
  assert.match(html, /Frontage/);
  assert.match(html, /Floor/);
  assert.match(html, /Road Width/);
  assert.match(html, /Power Load/);
  assert.match(html, /Height/);
  assert.match(html, /Land Type/);
  assert.match(html, /Plot \/ Land Area/);
  assert.match(html, /Water/);
  assert.match(html, /Borewell/);
  assert.match(html, /Electricity/);
  assert.match(html, /Road Access/);
  assert.match(html, /Zone/);
});

test('Builder Projects search matches ProjectID and SourceProjectID values', () => {
  assert.match(html, /ProjectID/);
  assert.match(html, /SourceProjectID/);
  assert.match(html, /projectSearchMatches|haystacks\.some\(v => v\.includes\(q\)\)/);
});
