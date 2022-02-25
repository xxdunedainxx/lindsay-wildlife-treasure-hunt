import HttpArgParser from '../../../src/src/util/HttpArgParser';


test('Test Debug Blank', () => 
  {
    expect(HttpArgParser.DEBUG_MODE).toBe('false');
  }
)


test('Test no debug in URL', () => 
  {
    var selfReferenceURL = new URL('http://test.com?nothing=true');
    HttpArgParser.ParseDebugMode(selfReferenceURL)
    expect(HttpArgParser.DEBUG_MODE).toBe('false');
  }
)

test('Test Debug URL', () => 
  {
    var selfReferenceURL = new URL('http://test.com?debug=true');
    HttpArgParser.ParseDebugMode(selfReferenceURL)
    expect(HttpArgParser.DEBUG_MODE).toBe('true');
  }
)