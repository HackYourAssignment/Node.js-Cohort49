/**
 * Inserts a certain character until a has the desired length
 * e.g. padLeft('foo', 5, '_') -> '__foo'
 * e.g. padLeft(  '2', 2, '0')   -> '02'
 */
function padLeft(val, num, str) {
  if (val.length >= num) {
    return val;
  }
  return str.repeat(num - val.length) + val;
}

module.exports = padLeft;
