// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file The feel dials, press and hover: one wash for the whole theme that
 * every part paints over its own fill in that moment; a part whose moment
 * the theme sets keeps the base wash; and how reads "darker on press" as
 * the dial.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest';
import {themeEditHow, themeEditNew, themeEditSet} from './theme-edit.mjs';
import {feelWash} from './_settings.mjs';
import {
  makeLinkedFixture,
  removeLinkedFixture,
} from '../../test-utils/linked-fixture.mjs';
import {
  FIXTURE_PACKAGES,
  writeFixtureBaseTheme,
} from '../../test-utils/base-theme-fixture.mjs';

vi.mock('./_preview.mjs', async importOriginal =>
  (await import('../../test-utils/theme-render-stub.mjs')).stubRenders(
    /** @type {any} */ (await importOriginal()),
  ),
);

const T = 240_000;

/** @type {string} */
let cwd;

beforeAll(async () => {
  cwd = makeLinkedFixture('astryx-theme-feel-dials-', FIXTURE_PACKAGES);
  writeFixtureBaseTheme(cwd, 'neutral');
}, T);

afterAll(() => {
  if (cwd) removeLinkedFixture(cwd);
});

/** @param {string} slug */
const css = slug =>
  fs
    .readdirSync(path.join(cwd, 'themes', slug))
    .filter(f => f.endsWith('.css'))
    .map(f => fs.readFileSync(path.join(cwd, 'themes', slug, f), 'utf8'))
    .join('\n');

/** @param {string} slug @param {string} q */
const writes = async (slug, q) =>
  /** @type {any} */ ((await themeEditHow(q, {cwd, theme: slug})).data).results
    .flatMap((/** @type {any} */ r) => r.commands)
    .filter((/** @type {string} */ c) => / editor set /.test(c))
    .map((/** @type {string} */ c) => c.replace(/^.* editor /, ''));

describe('the press and hover dials', () => {
  it(
    'set one wash for every part, in each mode',
    async () => {
      await themeEditNew('fd', {cwd, like: 'neutral'});
      await themeEditSet('fd', 'press', 'darker', {cwd});
      await themeEditSet('fd', 'hover', '8%', {cwd});
      const out = css('fd');
      expect(out).toMatch(/--color-overlay-pressed:\s*rgb\(0 0 0 \/ 12%\)/);
      // (A percent is the base wash's own color in each mode at that
      // strength.)
      expect(out).toMatch(
        /--color-overlay-hover:\s*light-dark\(rgb\([\d ]+\/ 8%\), rgb\([\d ]+\/ 8%\)\)/,
      );
    },
    T,
  );

  it('give darker, lighter, stronger, none and a percent their washes', () => {
    const base = {light: {}, dark: {}};
    const tokens = {
      '--color-overlay-pressed': 'rgb(0 0 0 / 10%)',
      '--color-overlay-hover': 'rgb(0 0 0 / 5%)',
    };
    expect(feelWash('press', 'darker', base, tokens)[0]).toBe(
      'rgb(0 0 0 / 12%)',
    );
    expect(feelWash('press', 'lighter', base, tokens)[1]).toBe(
      'rgb(255 255 255 / 16%)',
    );
    expect(feelWash('hover', 'stronger', base, tokens)[0]).toMatch(
      /currentColor 12%/,
    );
    expect(feelWash('press', 'none', base, tokens)).toEqual([
      'transparent',
      'transparent',
    ]);
    expect(feelWash('press', '20%', base, tokens)[0]).toBe('rgb(0 0 0 / 20%)');
  });

  it(
    'keep the base wash on a part whose moment the theme sets',
    async () => {
      await themeEditNew('fk', {cwd, like: 'neutral'});
      await themeEditSet('fk', 'press', 'lighter', {cwd});
      await themeEditSet('fk', 'background-color', '#cc0000', {
        cwd,
        on: 'button',
        state: 'pressed',
      });
      const out = css('fk');
      expect(out).toMatch(
        /--color-overlay-pressed:\s*rgb\(255 255 255 \/ 16%\)/,
      );
      expect(out).toMatch(
        /\.astryx-button[^{]*\{[^}]*--color-overlay-pressed:\s*light-dark\(/,
      );
    },
    T,
  );

  it(
    'refuse a scope and a value they do not take',
    async () => {
      await themeEditNew('fr', {cwd, like: 'neutral'});
      await expect(
        themeEditSet('fr', 'press', 'darker', {cwd, on: 'button'}),
      ).rejects.toThrow(/drop the scope/);
      await expect(themeEditSet('fr', 'hover', 'darkr', {cwd})).rejects.toThrow(
        /hover takes darker, lighter, stronger, none or a percent/,
      );
      await expect(themeEditSet('fr', 'press', '80%', {cwd})).rejects.toThrow();
    },
    T,
  );
});

describe('how', () => {
  it(
    'reads a feel said with its moment as the dial',
    async () => {
      await themeEditNew('fh', {cwd, like: 'neutral'});
      expect(await writes('fh', 'darker on press')).toEqual([
        'set fh press darker',
      ]);
      expect(await writes('fh', 'lighter on hover')).toEqual([
        'set fh hover lighter',
      ]);
      expect(await writes('fh', '8% tint on hover')).toEqual([
        "set fh hover '8%'",
      ]);
      // (A design system's feel line, its press half the dial.)
      expect(
        await writes('fh', 'Feel: light gray fill on hover, darker on press.'),
      ).toContain('set fh press darker');
    },
    T,
  );
});
