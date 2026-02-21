import { describe, it, expect } from 'vitest';
import { normaliseGermanNumber, evaluateAnswer, safeEval } from '@/lib/exercise/evaluator';
// evaluateAnswer now accepts full AnswerType union

describe('normaliseGermanNumber', () => {
  it('handles simple German decimal comma', () => {
    expect(normaliseGermanNumber('3,14')).toBe('3.14');
    expect(normaliseGermanNumber('2,5')).toBe('2.5');
    expect(normaliseGermanNumber('-7,5')).toBe('-7.5');
  });

  it('handles German thousands separator + decimal comma', () => {
    expect(normaliseGermanNumber('1.000,50')).toBe('1000.50');
    expect(normaliseGermanNumber('10.000,00')).toBe('10000.00');
  });

  it('keeps plain integers unchanged', () => {
    expect(normaliseGermanNumber('42')).toBe('42');
    expect(normaliseGermanNumber('1000')).toBe('1000');
  });

  it('keeps English decimal notation unchanged', () => {
    expect(normaliseGermanNumber('3.14')).toBe('3.14');
  });

  it('trims whitespace', () => {
    expect(normaliseGermanNumber('  3,14  ')).toBe('3.14');
  });
});

describe('evaluateAnswer — number type', () => {
  it('correct integer answer', () => {
    expect(evaluateAnswer('5', 5, 'number')).toBe(true);
  });

  it('wrong integer answer', () => {
    expect(evaluateAnswer('6', 5, 'number')).toBe(false);
  });

  it('correct decimal with German comma', () => {
    expect(evaluateAnswer('3,14', 3.14, 'number')).toBe(true);
  });

  it('wrong decimal', () => {
    expect(evaluateAnswer('3,15', 3.14, 'number')).toBe(false);
  });

  it('handles floating point tolerance', () => {
    expect(evaluateAnswer('0,1', 0.1, 'number')).toBe(true);
  });

  it('rejects non-numeric input', () => {
    expect(evaluateAnswer('abc', 5, 'number')).toBe(false);
  });

  it('handles negative numbers', () => {
    expect(evaluateAnswer('-7,5', -7.5, 'number')).toBe(true);
  });
});

describe('evaluateAnswer — fraction type', () => {
  it('correct fraction "3/4"', () => {
    expect(evaluateAnswer('3/4', '3/4', 'fraction')).toBe(true);
  });

  it('equivalent fractions', () => {
    expect(evaluateAnswer('6/8', '3/4', 'fraction')).toBe(true);
  });

  it('decimal for fraction', () => {
    expect(evaluateAnswer('0,75', '3/4', 'fraction')).toBe(true);
  });

  it('wrong fraction', () => {
    expect(evaluateAnswer('1/4', '3/4', 'fraction')).toBe(false);
  });
});

describe('evaluateAnswer — text/MC type', () => {
  it('correct text answer (case insensitive)', () => {
    expect(evaluateAnswer('Kreis', 'kreis', 'text')).toBe(true);
  });

  it('multiple choice correct', () => {
    expect(evaluateAnswer('true', 'true', 'multiple-choice')).toBe(true);
  });
});

describe('safeEval', () => {
  it('evaluates simple addition', () => {
    expect(safeEval('2 + 3')).toBe(5);
  });

  it('evaluates expression with German decimal', () => {
    expect(safeEval('2,5 + 1,5')).toBe(4);
  });

  it('rejects dangerous input', () => {
    expect(safeEval('alert(1)')).toBeNull();
    expect(safeEval('process.exit()')).toBeNull();
  });

  it('returns null for invalid expressions', () => {
    expect(safeEval('abc + def')).toBeNull();
  });

  it('handles division', () => {
    expect(safeEval('10 / 4')).toBe(2.5);
  });
});
