import isequal from '../index.min';
import tests from './tests';
import testsEs6 from './tests.es6';

const testCases = (equalFunc, suiteName, suiteTests) => {
  describe(suiteName, () => {
    suiteTests.forEach(suite => {
      describe(suite.description, () => {
        suite.tests.forEach(item => {
          const test = item.skip ? it.skip : it;
          test(item.description, () => {
            expect(equalFunc(item.value1, item.value2)).toStrictEqual(item.equal);
          });
          test(`${item.description} (reverse arguments)`, () => {
            expect(equalFunc(item.value2, item.value1)).toStrictEqual(item.equal);
          });
        });
      });
    });
  });
};

testCases(isequal, 'es6+ is equal - standard tests', tests);
testCases(isequal, 'es6+ is equal - es6 tests', testsEs6);
