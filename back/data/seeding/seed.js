const {liveData} = require ('../livedata/getLiveData');
const {testData} = require ('../testdata/getTestData');
const db = require('../../connection');

if (process.env.NODE_ENV === 'test') {
  testData.seedDrivers();
  testData.seedRaces();
} else {
  console.log('beans')
  liveData.seedDrivers();
  liveData.seedRaces();
}