// Lightweight jest-compatible mock for bcryptjs used in tests.
// Exports `hash` and `compare` as jest mock functions so tests can call
// `.mockResolvedValue()` / `.mockResolvedValueOnce()` on them.
const makeMockFn = () => {
  if (typeof jest !== 'undefined' && typeof jest.fn === 'function') {
    return jest.fn();
  }

  const fn = (...args) => fn._impl ? fn._impl(...args) : Promise.resolve();
  fn._impl = null;
  fn.mockResolvedValue = (val) => {
    fn._impl = () => Promise.resolve(val);
    return fn;
  };
  fn.mockResolvedValueOnce = (val) => {
    let called = false;
    fn._impl = () => {
      if (called) return Promise.resolve();
      called = true;
      return Promise.resolve(val);
    };
    return fn;
  };
  return fn;
};

const hash = makeMockFn();
const compare = makeMockFn();

// Provide both CommonJS and ESModule shapes so `import bcrypt from 'bcryptjs'`
// and `const { hash } = require('bcryptjs')` both work in tests.
module.exports = {
  hash,
  compare,
  default: { hash, compare },
};

// Also set exports.default for environments that read the default property
module.exports.default = module.exports.default || { hash, compare };
