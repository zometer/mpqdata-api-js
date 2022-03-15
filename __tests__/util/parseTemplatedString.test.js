const parseTemplatedString = require('../../src/util/parseTemplatedString');

test('value should be subsituted in string.', () => {
  expect(parseTemplatedString('foo: ${foo}', { foo: 'bar' })).toBe('foo: bar');
});
