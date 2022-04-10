import * as math from 'mathjs';
import {chain} from 'mathjs';

// layout: 12 bits; from least significant:
// start at top left side; clockwise
// then start at top; clockwise
// then the dot at the bottom

export enum BINARY {
  SIDE_TOP_LEFT = 0b0_000000_000001,
  SIDE_TOP_RIGHT = 0b0_000000_000010,
  // SIDE_RIGHT = 0b0_000000_000100,
  SIDE_BOTTOM_RIGHT = 0b0_000000_001000,
  SIDE_BOTTOM_LEFT = 0b0_000000_010000,
  SIDE_LEFT = 0b0_000000_100000,
  CORNER_TOP = 0b0_000001_000000,
  CORNER_TOP_RIGHT = 0b0_000010_000000,
  CORNER_BOTTOM_RIGHT = 0b0_000100_000000,
  CORNER_BOTTOM = 0b0_001000_000000,
  CORNER_BOTTOM_LEFT = 0b0_010000_000000,
  CORNER_TOP_LEFT = 0b0_100000_000000,
  BOTTOM_CIRCLE = 0b1_000000_000000,
}

export enum TEXT {
  SIDE_TOP_LEFT = 'a',
  SIDE_TOP_RIGHT = 'b',
  // SIDE_RIGHT = 'c',
  SIDE_BOTTOM_RIGHT = 'd',
  SIDE_BOTTOM_LEFT = 'e',
  SIDE_LEFT = 'f',
  CORNER_TOP = 'g',
  CORNER_TOP_RIGHT = 'h',
  CORNER_BOTTOM_RIGHT = 'i',
  CORNER_BOTTOM = 'j',
  CORNER_BOTTOM_LEFT = 'k',
  CORNER_TOP_LEFT = 'l',
  BOTTOM_CIRCLE = 'm',
}

export const TEXT_LOOKUP = new Map([
  ['a', BINARY.SIDE_TOP_LEFT],
  ['b', BINARY.SIDE_TOP_RIGHT],
  // ['c', BINARY.SIDE_RIGHT],
  ['d', BINARY.SIDE_BOTTOM_RIGHT],
  ['e', BINARY.SIDE_BOTTOM_LEFT],
  ['f', BINARY.SIDE_LEFT],
  ['g', BINARY.CORNER_TOP],
  ['h', BINARY.CORNER_TOP_RIGHT],
  ['i', BINARY.CORNER_BOTTOM_RIGHT],
  ['j', BINARY.CORNER_BOTTOM],
  ['k', BINARY.CORNER_BOTTOM_LEFT],
  ['l', BINARY.CORNER_TOP_LEFT],
  ['m', BINARY.BOTTOM_CIRCLE],
]);

export type TunicChar = number;
export type TunicWord = TunicChar[];
export type TunicPhrase = TunicWord[];

export const TEST_PHRASE = [
  [
    0b1_111111_111111
  ],
  [ // word 1
    BINARY.SIDE_LEFT | BINARY.SIDE_TOP_LEFT | BINARY.SIDE_TOP_RIGHT | BINARY.CORNER_TOP_LEFT | BINARY.CORNER_TOP |
    BINARY.SIDE_BOTTOM_LEFT | BINARY.CORNER_BOTTOM,
  ],
  [ // word 2
    BINARY.CORNER_TOP_LEFT | BINARY.CORNER_TOP_RIGHT |
    BINARY.SIDE_BOTTOM_LEFT | BINARY.SIDE_BOTTOM_RIGHT,
    BINARY.CORNER_TOP |
    BINARY.CORNER_BOTTOM
  ],
  [ // word 3
    BINARY.SIDE_LEFT | BINARY.SIDE_TOP_LEFT | BINARY.CORNER_TOP_LEFT |
    BINARY.SIDE_BOTTOM_LEFT | BINARY.SIDE_BOTTOM_RIGHT | BINARY.CORNER_BOTTOM_LEFT | BINARY.CORNER_BOTTOM_RIGHT,
    BINARY.CORNER_TOP |
    BINARY.CORNER_BOTTOM_LEFT | BINARY.CORNER_BOTTOM_RIGHT
  ],
  [ // word 4
    BINARY.SIDE_TOP_LEFT | BINARY.SIDE_TOP_RIGHT
  ],
  [ // word 5
    BINARY.SIDE_LEFT | BINARY.SIDE_TOP_LEFT | BINARY.CORNER_TOP | BINARY.CORNER_TOP_RIGHT |
    BINARY.SIDE_BOTTOM_LEFT | BINARY.SIDE_BOTTOM_RIGHT | BINARY.CORNER_BOTTOM_RIGHT,
  ]
];

// export function main() {
//     const canvas = document.getElementById("render-canvas") as HTMLCanvasElement;
//     const ctx = canvas.getContext("2d")!;
//     // Draw a hexagon
//
//     const letter_size = 20;
//     const x = letter_size * 2;
//     let y = letter_size * 2;
//
//     const words = TEST_PHRASE;
//
//     drawPhrase(ctx, words, {letter_size, x, y, mode: 'hex'});
//     y += letter_size * 3;
//     drawPhrase(ctx, words, {letter_size, x, y, mode: 'tunic'});
//
//     const lines: number[][] = [];
//     for (let i = 0; i < 12; i++) {
//         lines.push([1 << i]);
//     }
//     y += letter_size * 3;
//     drawPhrase(ctx, lines, {letter_size, x, y, mode: 'hex'});
//     y += letter_size * 3;
//     drawPhrase(ctx, lines, {letter_size, x, y, mode: 'tunic'});
// }

function textToChar(char: string): TunicChar {
  let res = 0;
  for (const c of char) {
    const lookup = TEXT_LOOKUP.get(c);
    if (lookup) {
      res |= lookup;
    }
  }
  return res;
}

export function textToPhrase(text: string): TunicPhrase {
  const res: TunicPhrase = [];
  for (const word of text.split(/,/)) {
    const tunicWord: TunicWord = [];
    for (const char of word.split(/ /)) {
      tunicWord.push(textToChar(char))
    }
    res.push(tunicWord);
  }
  return res;
}

export function textClean(text: string): string {
  return phraseToText(textToPhrase(text));
}

export function phraseToText(phrase: TunicPhrase): string {
  const phraseText = [];
  for (const word of phrase) {
    const wordText = [];
    for (const letter of word) {
      let letterStr = '';
      for (const segment in BINARY) {
        if (!isNaN(Number(segment))) {
          if (letter & Number(segment)) {
            // @ts-ignore
            letterStr += TEXT[BINARY[segment]];
          }
        }
      }
      wordText.push(letterStr);
    }
    phraseText.push(wordText.join(' '));
  }
  return phraseText.join(',');
}

export interface DrawConfig {
  x: number;
  y: number;
  /** Default 20 */
  letterSize?: number;
  /** default 'tunic' */
  mode?: 'tunic' | 'hex';
  /** default: black */
  color?: string;
  /** default: 2 */
  width?: number;
}

export function phraseSize(phrase: TunicPhrase, letterSize = 20, mode: 'tunic' | 'hex' = 'tunic'): [number, number] {
  const letter_spacing = letterSize * (Math.sqrt(3) / 2) * 2;
  const word_spacing = letter_spacing / 2;
  let height = letterSize * 3.2;
  if (mode == 'hex') {
    height = letterSize * 2.6;
  }

  let x = 0;
  for (const word of phrase) {
    for (const char of word) {
      x += letter_spacing;
    }
    x += word_spacing;
  }
  return [x, height];
}

export function drawPhrase(ctx: CanvasRenderingContext2D, phrase: TunicPhrase, config: DrawConfig) {
  const letter_size = config.letterSize ?? 20;
  const letter_spacing = letter_size * (Math.sqrt(3) / 2) * 2;
  const word_spacing = letter_spacing / 2;

  let {x} = config;
  for (const word of phrase) {
    ctx.beginPath();
    for (const char of word) {
      drawChar(ctx, char, {...config, x}, false);
      x += letter_spacing;
    }
    ctx.stroke();
    x += word_spacing;
  }
  return x;
}

export function drawChar(ctx: CanvasRenderingContext2D, char: TunicChar, config: DrawConfig, stroke = true) {
  const size = config?.letterSize ?? 20;
  const {mode, x, y} = config;
  ctx.lineWidth = config.width ?? size / 10;
  ctx.fillStyle = config.color ?? 'black';
  ctx.strokeStyle = config.color ?? 'black';
  ctx.lineCap = 'round';
  ///    *
  /// *     *
  ///
  /// *     *
  ///    *
  let gap = [0, 0.3 * size];
  if (mode == 'hex') {
    gap = [0, 0];
  }
  const pos = chain([x, y]).add([size, size]).add(gap).add([0, size * 0.1]).done();

  const top = chain([0, -1]).multiply(size).add(pos).subtract(gap).done();
  const bottom = chain([0, 1]).multiply(size).add(pos).add(gap).done();

  const top_left = chain([-Math.sqrt(3) / 2, -1 / 2]).multiply(size).add(pos).subtract(gap).done();
  const top_right = chain([Math.sqrt(3) / 2, -1 / 2]).multiply(size).add(pos).subtract(gap).done();

  const bottom_left = chain([-Math.sqrt(3) / 2, 1 / 2]).multiply(size).add(pos).add(gap).done();
  const bottom_right = chain([Math.sqrt(3) / 2, 1 / 2]).multiply(size).add(pos).add(gap).done();

  const center = chain([0, 0]).multiply(size).add(pos).done();
  const center_top = math.subtract(center, gap);
  const center_bottom = math.add(center, gap);

  const center_left = chain([-Math.sqrt(3) / 2, 0]).multiply(size).add(pos).done();
  const center_right = chain([Math.sqrt(3) / 2, 0]).multiply(size).add(pos).done();

  const center_left_bottom = math.add(center_left, gap);
  const center_right_bottom = math.add(center_right, gap);

  const circle_radius = size * 0.2;

  if (stroke) {
    ctx.beginPath();
  }

  function line(start: [number, number], end: [number, number]) {
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
  }

  // WORD LINE
  if (mode != 'hex') {
    line(center_left, center_right);
  }

  // OUTLINE
  if (char & BINARY.SIDE_TOP_LEFT) {
    line(top_left, top);
  }
  if (char & BINARY.SIDE_TOP_RIGHT) {
    line(top_right, top);
  }
  // if (char & BINARY.SIDE_RIGHT) {
  //   line(top_right, center_right);
  //   line(center_right_bottom, bottom_right);
  // }
  if (char & BINARY.SIDE_BOTTOM_RIGHT) {
    line(bottom_right, bottom);
  }
  if (char & BINARY.SIDE_BOTTOM_LEFT) {
    line(bottom_left, bottom);
  }
  if (char & BINARY.SIDE_LEFT) {
    line(top_left, center_left);
    line(bottom_left, center_left_bottom);
  }


  // CENTER LINES
  if (char & BINARY.CORNER_TOP) {
    line(top, center);
  }
  if (char & BINARY.CORNER_TOP_RIGHT) {
    line(top_right, center_top);
  }
  if (char & BINARY.CORNER_BOTTOM_RIGHT) {
    line(bottom_right, center_bottom);
  }
  if (char & BINARY.CORNER_BOTTOM) {
    line(bottom, center_bottom);
    line(center, center_top);
  }
  if (char & BINARY.CORNER_BOTTOM_LEFT) {
    line(bottom_left, center_bottom);
  }
  if (char & BINARY.CORNER_TOP_LEFT) {
    line(top_left, center_top);
  }

  // bottom circle
  if (char & BINARY.BOTTOM_CIRCLE) {
    ctx.moveTo(bottom[0], bottom[1]);
    ctx.ellipse(bottom[0], bottom[1] + circle_radius, circle_radius, circle_radius, 0, 3*math.pi/2, 7*math.pi/2);
  }

  if (stroke) {
    ctx.stroke();
  }
}