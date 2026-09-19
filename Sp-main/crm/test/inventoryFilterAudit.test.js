'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const file = path.resolve(__dirname, '..', 'inventory.html');
const html = fs.readFileSync(file, 'utf8');

test('Inventory filters expose category-specific controls for Residential and Commercial categories', () => {
  assert.match(html, /BHK/);
  assert.match(html, /Carpet Area/);
  assert.match(html, /Super Built-up/);
  assert.match(html, /Frontage/);
  assert.match(html, /Plot \/ Land Area/);
  assert.match(html, /Property Type/);
  assert.match(html, /Configuration/);
});

test('Inventory filter logic includes category-aware matching for selected category values', () => {
  assert.match(html, /function inventoryMatchesFilters|inventoryMatchesFilters\(/);
  assert.match(html, /FILTERS\.category|currentFilter/);
  assert.match(html, /renderFilterControls\(/);
  assert.match(html, /buildFilterOptionsForCategory\(/);
});

test('Residential filters include Built-up area and Possession controls', () => {
  assert.match(html, /Built-up Area/);
  assert.match(html, /Possession/);
  assert.match(html, /Fields\.BuiltUpArea|BuiltUpAreaComm/);
});

test('Commercial filters include Rent, total floors, parking, main road and corner controls', () => {
  assert.match(html, /Rent/);
  assert.match(html, /Total Floors/);
  assert.match(html, /Parking/);
  assert.match(html, /Main Road/);
  assert.match(html, /Corner/);
  assert.match(html, /Fields\.MainRoad|Fields\.Corner|Fields\.ParkingCarSlots|Fields\.ParkingSlots/);
});

test('Industrial filters include shed area, crane, docking, parking and GIDC/Zone controls', () => {
  assert.match(html, /Shed Area/);
  assert.match(html, /Crane/);
  assert.match(html, /Docking/);
  assert.match(html, /GIDC|Zone/);
  assert.match(html, /Fields\.ShedArea|Fields\.GIDCApproval|Fields\.IndustryZone/);
});

test('Land and Agriculture filters include area, unit, water, borewell, irrigation and fencing fields', () => {
  assert.match(html, /Area Unit/);
  assert.match(html, /Land Type/);
  assert.match(html, /Water/);
  assert.match(html, /Borewell/);
  assert.match(html, /Irrigation/);
  assert.match(html, /Fencing/);
  assert.match(html, /Fields\.WaterSource|Fields\.IrrigationAvailable|Fields\.Fencing/);
});

test('Builder source is wired into inventory filtering', () => {
  assert.match(html, /currentSource|deriveSource\(/);
  assert.match(html, /Builder.*Inventory|data-source="Builder"/);
  assert.match(html, /FILTERS\.builder|FILTERS\.project/);
});
