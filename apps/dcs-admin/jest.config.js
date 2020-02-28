module.exports = {
  name: 'dcs-admin',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dcs-admin',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
