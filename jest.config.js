const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: getJestProjects(),
};

// module.exports = {
//   testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
//   transform: {
//     '^.+\\.(ts|js|html)$': 'ts-jest'
//   },
//   resolver: '@nrwl/jest/plugins/resolver',
//   moduleFileExtensions: ['ts', 'js', 'html'],
//   coverageReporters: ['html', 'lcov'],
//   preset: "jest-preset-angular",
//   // setupFilesAfterEnv: ['<rootDir>test-setup.ts']
// };
