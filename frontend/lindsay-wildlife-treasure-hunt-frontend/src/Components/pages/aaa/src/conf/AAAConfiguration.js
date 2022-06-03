import Logger from '../../../../../src/util/Logger';
import MockAAAData from './MockData';

export class AAAConfiguration {
  static mockData = true // Toggle to true to test 
  static aaaData = null

  static Init() {
    if(AAAConfiguration.mockData == false){
      AAAConfiguration.__fetchLiveData()
    } else {
      AAAConfiguration.__setMockData()
    }

    console.log(AAAConfiguration.aaaData)
  }

  static __fetchLiveData(){
    Logger.info("[AAA]: Fetching live configuration data")
  }

  static __setMockData(){
    Logger.warn("[AAA]: Using mock data")
    AAAConfiguration.aaaData = MockAAAData.data
  }
}

export default AAAConfiguration;