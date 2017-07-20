/* global describe, it */

var expect = require('chai').expect;
var toRAML = require('../');

describe('raml object to raml', function () {
  var RAML_PREFIX = '#%RAML 0.8';
  var RAML_PREFIX10 = '#%RAML 1.0';

  describe('base parameters', function () {
    it('title', function () {
      var str = toRAML({
        title: 'Example API'
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'title: Example API'
      ].join('\n'));
    });

    it('base uri', function () {
      var str = toRAML({
        baseUri: 'http://example.com'
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'baseUri: http://example.com'
      ].join('\n'));
    });

    it('media type', function () {
      var str = toRAML({
        mediaType: 'application/json'
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'mediaType: application/json'
      ].join('\n'));
    });

    it('version', function () {
      var str = toRAML({
        version: 'v1.0'
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'version: v1.0'
      ].join('\n'));
    });

    it('base uri parameters', function () {
      var str = toRAML({
        baseUriParameters: {
          domain: {
            type: 'string',
            default: 'api'
          }
        }
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'baseUriParameters:',
        '  domain:',
        '    type: string',
        '    default: api'
      ].join('\n'));
    });

    it('protocols', function () {
      var str = toRAML({
        protocols: ["HTTP", "HTTPS"]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'protocols: [ HTTP, HTTPS ]'
      ].join('\n'));
    });

    it('protocols is case-insensitive and accepts only HTTP and/or HTTPS', function () {
      var str = toRAML({
        protocols: ["HTTP", "https", "WSS"]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'protocols: [ HTTP ]'
      ].join('\n'));
    });

    it('security schemes', function () {
      var str = toRAML({
        securitySchemes: [{
          oauth_2_0: {
            type: 'OAuth 2.0',
            settings: {
              authorizationUri: 'https://github.com/login/oauth/authorize',
              accessTokenUri: 'https://github.com/login/oauth/access_token',
              authorizationGrants: [
                'code'
              ],
              scopes: [
                'user',
                'user:email',
                'user:follow',
                'public_repo',
                'repo',
                'repo:status',
                'delete_repo',
                'notifications',
                'gist'
              ]
            }
          }
        }]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'securitySchemes:',
        '  - oauth_2_0:',
        '      type: OAuth 2.0',
        '      settings:',
        '        authorizationUri: https://github.com/login/oauth/authorize',
        '        accessTokenUri: https://github.com/login/oauth/access_token',
        '        authorizationGrants: [ code ]',
        '        scopes:',
        '          - user',
        '          - "user:email"',
        '          - "user:follow"',
        '          - public_repo',
        '          - repo',
        '          - "repo:status"',
        '          - delete_repo',
        '          - notifications',
        '          - gist'
      ].join('\n'));
    });

    it('schemas', function () {
      var str = toRAML({
        schemas: [
          {
            labels: '{\n    \"$schema\": \"http://json-schema.org/draft-03/schema\",\n    \"type\": \"array\",\n    \"list\": [\n      {\n        \"properties\": {\n          \"url\": {\n            \"type\": \"string\"\n          },\n          \"name\": {\n            \"type\": \"string\"\n          },\n          \"color\": {\n            \"type\": \"string\",\n            \"maxLength\": 6,\n            \"minLength\": 6\n          }\n        },\n        \"type\": \"object\"\n      }\n    ]\n}'
          },
          {
            labelsBody: '{\n  \"required\": true,\n  \"$schema\": \"http://json-schema.org/draft-03/schema\",\n  \"type\": \"array\",\n  \"items\": [\n    {\n      \"type\": \"string\"\n    }\n  ]\n}'
          }
        ]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'schemas:',
        '  - labels: |',
        '      {',
        '          "$schema": "http://json-schema.org/draft-03/schema",',
        '          "type": "array",',
        '          "list": [',
        '            {',
        '              "properties": {',
        '                "url": {',
        '                  "type": "string"',
        '                },',
        '                "name": {',
        '                  "type": "string"',
        '                },',
        '                "color": {',
        '                  "type": "string",',
        '                  "maxLength": 6,',
        '                  "minLength": 6',
        '                }',
        '              },',
        '              "type": "object"',
        '            }',
        '          ]',
        '      }',
        '  - labelsBody: |',
        '      {',
        '        "required": true,',
        '        "$schema": "http://json-schema.org/draft-03/schema",',
        '        "type": "array",',
        '        "items": [',
        '          {',
        '            "type": "string"',
        '          }',
        '        ]',
        '      }'
      ].join('\n'));
    });

    it('documentation', function () {
      var str = toRAML({
        documentation: [
          {
            title: 'Home',
            content: 'Welcome to the _Zencoder API_ Documentation. The _Zencoder API_ allows you to connect your application to our encoding service and encode videos without going through the web  interface. You may also benefit from one of our [integration libraries](https://app.zencoder.com/docs/faq/basics/libraries) for different languages.'
          }
        ]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'documentation:',
        '  - title: Home',
        '    content: |',
        '      Welcome to the _Zencoder API_ Documentation. The _Zencoder API_ allows you to connect your application to our encoding service and encode videos without going through the web  interface. You may also benefit from one of our [integration libraries](https://app.zencoder.com/docs/faq/basics/libraries) for different languages.'
      ].join('\n'));
    });

    it('resource types', function () {
      var str = toRAML({
        resourceTypes: [{
          item: {
            'delete?': {
              responses: {
                '204': {
                  description: 'Item removed.'
                }
              }
            },
            'post?':  null,
            'put?':   null,
            'get?':   null,
            'patch?': null,
            type:     'base'
          }
        }]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'resourceTypes:',
        '  - item:',
        '      delete?:',
        '        responses:',
        '          204:',
        '            description: Item removed.',
        '      post?:',
        '      put?:',
        '      get?:',
        '      patch?:',
        '      type: base'
      ].join('\n'));
    });

    it('traits', function () {
      var str = toRAML({
        traits: [{
          state: {
            queryParameters: {
              state: {
                description: 'String to filter by state.',
                enum: [
                  'open',
                  'closed'
                ],
                default: 'open',
                displayName: 'state',
                type: 'string'
              }
            }
          }
        }]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'traits:',
        '  - state:',
        '      queryParameters:',
        '        state:',
        '          type: string',
        '          description: String to filter by state.',
        '          enum: [ open, closed ]',
        '          default: open'
      ].join('\n'));
    });

    it('Data types', function(){
      var str = toRAML({
        types: [{isObject: "!include /types/isObject.yaml"}, {"name":"Objecis","description":"Object description","example":"example Object","type":"object","properties":{"Property1":{"description":"property DEscription","maxLength":1,"minLength":1,"default":"1","example":"1","pattern":"1","type":"string","enum":["1Enum"]},"prop2":{"description":"description Prop2","minItems":88,"maxItems":88,"example":"example array","type":"array","unique":true,"items":{"minItems":99,"maxItems":99,"example":"examplearr2","type":"array","unique":false,"items":{"maximum":4,"minimum":4,"default":"numDefault","example":"nestedObjectExample","type":"object","format":"int64","enum":["enum1"],"properties":{"my1":{"description":"description","maxLength":1,"minLength":1,"default":"1","example":"1","pattern":"1","type":"string","enum":["enum1"]}}}}}}}]

      }, {version: '1.0'});

      expect(str).to.equal([
        RAML_PREFIX10,
        'types:',
        '  isObject: !include /types/isObject.yaml',
        '  Objecis:',
        '    description: Object description',
        '    example: example Object',
        '    type: object',
        '    properties:',
        '      Property1:',
        '        description: property DEscription',
        '        maxLength: 1',
        '        minLength: 1',
        '        default: "1"',
        '        example: "1"',
        '        pattern: "1"',
        '        type: string',
        '        enum: [ 1Enum ]',
        '      prop2:',
        '        description: description Prop2',
        '        minItems: 88',
        '        maxItems: 88',
        '        example: example array',
        '        type: array',
        '        unique: true',
        '        items:',
        '          minItems: 99',
        '          maxItems: 99',
        '          example: examplearr2',
        '          type: array',
        '          unique: false',
        '          items:',
        '            maximum: 4',
        '            minimum: 4',
        '            default: numDefault',
        '            example: nestedObjectExample',
        '            type: object',
        '            format: int64',
        '            enum: [ enum1 ]',
        '            properties:',
        '              my1:',
        '                description: description',
        '                maxLength: 1',
        '                minLength: 1',
        '                default: "1"',
        '                example: "1"',
        '                pattern: "1"',
        '                type: string',
        '                enum: [ enum1 ]',


      ].join('\n'))
    });

    it('API selected Annotation Types', function(){
      var str = toRAML({
        selectedAnnotations : [{"CoolStaff":{"1":"hola1","2":"hola2"}},{"Small":"Small Value"}]
      }, {version: '1.0'});
      expect(str).to.equal([
        RAML_PREFIX10,
        '(CoolStaff):',
        '  1: hola1',
        '  2: hola2',
        '(Small): Small Value'
      ].join('\n'));
    });

    it('resources', function () {
      var str = toRAML({
        resources: [{
          type: 'collection',
          relativeUri: '/users',
          methods: [{
            headers: {
              Accept: {
                description: 'Used to set the specified media type.',
                displayName: 'Accept'
              }
            },
            method: 'get',
            responses: {
              '200': {
                body: {
                  'application/json': {
                    schema: 'search-users'
                  }
                }
              }
            },
            queryParameters: {
              sort: {
                description: 'If not provided, results are sorted by best match.',
                enum: ['followers', 'repositories', 'joined']
              }
            }
          }],
          resources: [{
            type: 'base',
            relativeUri: '/{userId}',
            methods: [{
              method: 'get'
            }]
          }]
        }]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        '/users:',
        '  type: collection',
        '  get:',
        '    headers:',
        '      Accept:',
        '        description: Used to set the specified media type.',
        '    queryParameters:',
        '      sort:',
        '        description: If not provided, results are sorted by best match.',
        '        enum: [ followers, repositories, joined ]',
        '    responses:',
        '      200:',
        '        body:',
        '          application/json:',
        '            schema: search-users',
        '  /{userId}:',
        '    type: base',
        '    get: {}'
      ].join('\n'));
    });

    it('uri parameters', function () {
      var str = toRAML({
        resources: [{
          relativeUri: '/{parameter}',
          uriParameters: {
            parameter: {
              type: 'string'
            }
          },
          methods: [{
            method: 'get'
          }]
        }]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        '/{parameter}:',
        '  uriParameters:',
        '    parameter:',
        '      type: string',
        '  get: {}'
      ].join('\n'));
    });

    it('secured by', function () {
      var str = toRAML({
        resources: [{
          relativeUri: '/',
          methods: [{
            method: 'get',
            securedBy: [null, 'oauth_1_0', { oauth_2_0: { scopes: ['ADMINISTRATOR'] } }]
          }]
        }]
      })

      expect(str).to.equal([
        RAML_PREFIX,
        '/:',
        '  get:',
        '    securedBy:',
        '      - null',
        '      - oauth_1_0',
        '      - oauth_2_0:',
        '          scopes: [ ADMINISTRATOR ]'
      ].join('\n'))
    });

    it('root secured by', function () {
      var str = toRAML({
        securedBy: [null, 'oauth_1_0', 'oauth_2_0']
      })

      expect(str).to.equal([
        RAML_PREFIX,
        'securedBy: [ null, oauth_1_0, oauth_2_0 ]'
      ].join('\n'))
    });

    it('resource trait', function () {
      var str = toRAML({
        resources: [{
          relativeUri: '/users',
          description: 'Hello world',
          is: ['test'],
          methods: [{
            method: 'get'
          }]
        }]
      })

      expect(str).to.equal([
        '#%RAML 0.8',
        '/users:',
        '  is: [ test ]',
        '  description: Hello world',
        '  get: {}'
      ].join('\n'))
    });

    it('extends', function(){
      var str = toRAML({
        extends : "path/to/api.raml"
      }, {version: '1.0'});
      expect(str).to.equal([
        RAML_PREFIX10,
        'extends: path/to/api.raml'
      ].join('\n'));
    });
  });
});
