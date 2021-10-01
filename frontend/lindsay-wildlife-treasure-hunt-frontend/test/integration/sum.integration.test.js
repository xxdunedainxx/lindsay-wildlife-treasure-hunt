// import Setup from '../../src/src/util/Setup';
// import Configuration from '../../src/src/conf/Configuration';
// import Logger from '../../src/src/util/Logger';
// import TestClient from '../../src/src/http/clients/TestClient';

// import fetchMock from "jest-fetch-mock";

// // var testClient = new TestClient(Configuration.remoteEndpoint)
// // testClient.testRequest()
// global.fetch = require('jest-fetch-mock');

// beforeEach(() => {
//   fetch.resetMocks();
// });

// fetchMock.enableMocks();


// test('Execute a basic HTTP request', () => {
//   Setup.Run()
//   Logger.info("START REACT APP")
//   Logger.info(Configuration)

//   fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));
//   var testClient = new TestClient(Configuration.remoteEndpoint)
//   testClient.testRequest()
// });