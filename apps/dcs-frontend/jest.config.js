module.exports = {
  name: 'dcs-frontend',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dcs-frontend',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
