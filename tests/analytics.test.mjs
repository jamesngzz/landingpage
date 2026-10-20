import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {composeProductionLanding, composeProductionDemo} from '../scripts/production-landing.mjs';
import {composeLanding} from '../scripts/build-landing-preview.mjs';

const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const script = read('analytics.js').replace(/^import .*;\n/, '');

function load(url, {embedded = false} = {}) {
  const calls = [];
  const frame = {};
  runInNewContext(script, {
    inject: options => calls.push(options),
    window: {self: frame, top: embedded ? {} : frame},
    location: new URL(url), URL, Set
  });
  return calls;
}

test('only the production homepage includes analytics, not the embedded demo or isolated preview', () => {
  const base = read('index.html');
  const home = composeProductionLanding(base);
  assert.equal([...home.matchAll(/src="\/analytics.js"/g)].length, 1);
  assert.doesNotMatch(composeProductionDemo(read('public/prototype/cases-demo.html')), /src="\/analytics.js"/);
  assert.doesNotMatch(composeLanding(base), /src="\/analytics.js"/);
});

test('real top-level visits initialize analytics; iframe, local and file visits do not', () => {
  assert.equal(load('https://landing.example/').length, 1);
  assert.equal(load('https://landing.example/')[0].mode, 'production');
  for (const url of ['http://localhost:3000/', 'https://localhost/', 'http://127.0.0.1:3000/', 'https://[::1]/', 'file:///index.html']) {
    assert.equal(load(url).length, 0, url);
  }
  assert.equal(load('https://landing.example/', {embedded: true}).length, 0);
});

test('page-view URLs lose query strings and fragments without changing their path', () => {
  const {beforeSend} = load('https://landing.example/')[0];
  const event = {type: 'pageview', url: 'https://landing.example/index.html?email=private@example.com&utm_source=facebook#private'};
  const result = beforeSend(event);
  assert.equal(result.url, 'https://landing.example/index.html');
  assert.equal(result.type, 'pageview');
  assert.equal(event.url.includes('private@example.com'), true);
});
