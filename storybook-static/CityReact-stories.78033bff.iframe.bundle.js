'use strict';
(self.webpackChunkformstates = self.webpackChunkformstates || []).push([
  [95],
  {
    './node_modules/@babel/runtime/helpers/esm/defineProperty.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      function _typeof(obj) {
        return (
          (_typeof =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (obj) {
                  return typeof obj;
                }
              : function (obj) {
                  return obj &&
                    'function' == typeof Symbol &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
                }),
          _typeof(obj)
        );
      }
      function _toPropertyKey(arg) {
        var key = (function _toPrimitive(input, hint) {
          if ('object' !== _typeof(input) || null === input) return input;
          var prim = input[Symbol.toPrimitive];
          if (void 0 !== prim) {
            var res = prim.call(input, hint || 'default');
            if ('object' !== _typeof(res)) return res;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return ('string' === hint ? String : Number)(input);
        })(arg, 'string');
        return 'symbol' === _typeof(key) ? key : String(key);
      }
      function _defineProperty(obj, key, value) {
        return (
          (key = _toPropertyKey(key)) in obj
            ? Object.defineProperty(obj, key, {
                value,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (obj[key] = value),
          obj
        );
      }
      __webpack_require__.d(__webpack_exports__, { Z: () => _defineProperty });
    },
    './components/CityReact.stories.tsx': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          FirstStory: () => FirstStory,
          default: () => CityReact_stories,
        });
      var defineProperty = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/defineProperty.js'
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        injectStylesIntoStyleTag = __webpack_require__(
          './node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js'
        ),
        injectStylesIntoStyleTag_default = __webpack_require__.n(
          injectStylesIntoStyleTag
        ),
        styleDomAPI = __webpack_require__(
          './node_modules/style-loader/dist/runtime/styleDomAPI.js'
        ),
        styleDomAPI_default = __webpack_require__.n(styleDomAPI),
        insertBySelector = __webpack_require__(
          './node_modules/style-loader/dist/runtime/insertBySelector.js'
        ),
        insertBySelector_default = __webpack_require__.n(insertBySelector),
        setAttributesWithoutAttributes = __webpack_require__(
          './node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js'
        ),
        setAttributesWithoutAttributes_default = __webpack_require__.n(
          setAttributesWithoutAttributes
        ),
        insertStyleElement = __webpack_require__(
          './node_modules/style-loader/dist/runtime/insertStyleElement.js'
        ),
        insertStyleElement_default = __webpack_require__.n(insertStyleElement),
        styleTagTransform = __webpack_require__(
          './node_modules/style-loader/dist/runtime/styleTagTransform.js'
        ),
        styleTagTransform_default = __webpack_require__.n(styleTagTransform),
        CityReact_module = __webpack_require__(
          './node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./components/CityReact.module.scss'
        ),
        options = {};
      (options.styleTagTransform = styleTagTransform_default()),
        (options.setAttributes = setAttributesWithoutAttributes_default()),
        (options.insert = insertBySelector_default().bind(null, 'head')),
        (options.domAPI = styleDomAPI_default()),
        (options.insertStyleElement = insertStyleElement_default());
      injectStylesIntoStyleTag_default()(CityReact_module.Z, options);
      const components_CityReact_module =
        CityReact_module.Z && CityReact_module.Z.locals
          ? CityReact_module.Z.locals
          : void 0;
      function r(e) {
        var t,
          f,
          n = '';
        if ('string' == typeof e || 'number' == typeof e) n += e;
        else if ('object' == typeof e)
          if (Array.isArray(e))
            for (t = 0; t < e.length; t++)
              e[t] && (f = r(e[t])) && (n && (n += ' '), (n += f));
          else for (t in e) e[t] && (n && (n += ' '), (n += t));
        return n;
      }
      function clsx() {
        for (var e, t, f = 0, n = ''; f < arguments.length; )
          (e = arguments[f++]) && (t = r(e)) && (n && (n += ' '), (n += t));
        return n;
      }
      var _FirstStory$parameter,
        _FirstStory$parameter2,
        _FirstStory$parameter3,
        __jsx = react.createElement,
        uiStates = (function (uiStates) {
          return (
            (uiStates.unsubmitted_noinput = 'noinput'),
            (uiStates.unsubmitted_someinput = 'someinput'),
            (uiStates.loading = 'loading'),
            (uiStates.wrongAnswer_noinput = 'wrongAnswer_noinput'),
            (uiStates.wrongAnswer_someinput = 'wrongAnswer_someinput'),
            (uiStates.rightAnswer = 'rightAnswer'),
            uiStates
          );
        })({}),
        CityReact = function CityReact(_ref) {
          var uiState = _ref.uiState,
            onSubmit = _ref.onSubmit,
            onCityChange = _ref.onCityChange,
            _useState = (0, react.useState)(''),
            city = _useState[0],
            setCity = _useState[1];
          return __jsx(
            react.Fragment,
            null,
            __jsx(
              'section',
              {
                className: clsx(
                  uiState === uiStates.rightAnswer &&
                    components_CityReact_module.invisible
                ),
              },
              __jsx('h1', null, 'City quiz'),
              __jsx('p', null, 'What city is located between two continents?'),
              __jsx(
                'div',
                null,
                __jsx('textarea', {
                  onChange: function onChange(e) {
                    setCity(e.currentTarget.value),
                      onCityChange && onCityChange(e.currentTarget.value);
                  },
                  cols: 20,
                  rows: 2,
                  disabled: uiState === uiStates.loading,
                })
              ),
              __jsx(
                'button',
                {
                  onClick: function onClick(e) {
                    onSubmit && onSubmit(city);
                  },
                  disabled: ![
                    uiStates.unsubmitted_someinput,
                    uiStates.wrongAnswer_someinput,
                  ].includes(uiState),
                },
                'Submit'
              ),
              __jsx(
                'p',
                {
                  className: clsx(
                    uiState !== uiStates.wrongAnswer_noinput &&
                      uiState !== uiStates.wrongAnswer_someinput &&
                      components_CityReact_module.invisible,
                    components_CityReact_module.panel - quiz__wrongAnswer
                  ),
                },
                'Good guess but a wrong answer. Try again!'
              ),
              __jsx(
                'p',
                {
                  className: clsx(
                    uiState !== uiStates.loading &&
                      components_CityReact_module.invisible
                  ),
                },
                'Loading...'
              )
            ),
            __jsx(
              'section',
              {
                className: clsx(
                  uiState !== uiStates.rightAnswer &&
                    components_CityReact_module.invisible
                ),
              },
              __jsx('h1', null, 'That s right!')
            )
          );
        };
      CityReact.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'CityReact',
        props: {
          uiState: {
            required: !0,
            tsType: { name: 'uiStates' },
            description: '',
          },
          onSubmit: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(city: string) => void',
              signature: {
                arguments: [{ name: 'city', type: { name: 'string' } }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onCityChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(city: string) => void',
              signature: {
                arguments: [{ name: 'city', type: { name: 'string' } }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
      try {
        (CityReact.displayName = 'CityReact'),
          (CityReact.__docgenInfo = {
            description: '',
            displayName: 'CityReact',
            props: {
              uiState: {
                defaultValue: null,
                description: '',
                name: 'uiState',
                required: !0,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"noinput"' },
                    { value: '"someinput"' },
                    { value: '"loading"' },
                    { value: '"wrongAnswer_noinput"' },
                    { value: '"wrongAnswer_someinput"' },
                    { value: '"rightAnswer"' },
                  ],
                },
              },
              onSubmit: {
                defaultValue: null,
                description: '',
                name: 'onSubmit',
                required: !1,
                type: { name: '((city: string) => void)' },
              },
              onCityChange: {
                defaultValue: null,
                description: '',
                name: 'onCityChange',
                required: !1,
                type: { name: '((city: string) => void)' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['components/CityReact.tsx#CityReact'] = {
              docgenInfo: CityReact.__docgenInfo,
              name: 'CityReact',
              path: 'components/CityReact.tsx#CityReact',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly &&
            (symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            })),
            keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2
            ? ownKeys(Object(source), !0).forEach(function (key) {
                (0, defineProperty.Z)(target, key, source[key]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(
                target,
                Object.getOwnPropertyDescriptors(source)
              )
            : ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(
                  target,
                  key,
                  Object.getOwnPropertyDescriptor(source, key)
                );
              });
        }
        return target;
      }
      const CityReact_stories = {
        parameters: {
          storySource: {
            source:
              'import type { Meta, StoryObj } from "@storybook/react";\nimport { CityReact, uiStates } from "./CityReact";\nconst meta: Meta<typeof CityReact> = {\n  title: "City/City - as per React docs",\n  component: CityReact,\n  tags: ["autodocs"]\n};\nexport default meta;\ntype Story = StoryObj<typeof CityReact>;\nexport const FirstStory: Story = {\n  name: "No Input (initial state)",\n  args: {\n    uiState: uiStates.unsubmitted_noinput\n  }\n};\nFirstStory.parameters = {\n  ...FirstStory.parameters,\n  docs: {\n    ...FirstStory.parameters?.docs,\n    source: {\n      originalSource: "{\\n  name: \\"No Input (initial state)\\",\\n  args: {\\n    uiState: uiStates.unsubmitted_noinput\\n  }\\n}",\n      ...FirstStory.parameters?.docs?.source\n    }\n  }\n};',
            locationsMap: {
              'first-story': {
                startLoc: { col: 33, line: 10 },
                endLoc: { col: 1, line: 15 },
                startBody: { col: 33, line: 10 },
                endBody: { col: 1, line: 15 },
              },
            },
          },
        },
        title: 'City/City - as per React docs',
        component: CityReact,
        tags: ['autodocs'],
      };
      var FirstStory = {
        name: 'No Input (initial state)',
        args: { uiState: uiStates.unsubmitted_noinput },
      };
      FirstStory.parameters = _objectSpread(
        _objectSpread({}, FirstStory.parameters),
        {},
        {
          docs: _objectSpread(
            _objectSpread(
              {},
              null === (_FirstStory$parameter = FirstStory.parameters) ||
                void 0 === _FirstStory$parameter
                ? void 0
                : _FirstStory$parameter.docs
            ),
            {},
            {
              source: _objectSpread(
                {
                  originalSource:
                    '{\n  name: "No Input (initial state)",\n  args: {\n    uiState: uiStates.unsubmitted_noinput\n  }\n}',
                },
                null === (_FirstStory$parameter2 = FirstStory.parameters) ||
                  void 0 === _FirstStory$parameter2 ||
                  null ===
                    (_FirstStory$parameter3 = _FirstStory$parameter2.docs) ||
                  void 0 === _FirstStory$parameter3
                  ? void 0
                  : _FirstStory$parameter3.source
              ),
            }
          ),
        }
      );
    },
    './node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./components/CityReact.module.scss':
      (module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, {
          Z: () => __WEBPACK_DEFAULT_EXPORT__,
        });
        var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              './node_modules/css-loader/dist/runtime/sourceMaps.js'
            ),
          _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default =
            __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__
            ),
          _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              './node_modules/css-loader/dist/runtime/api.js'
            ),
          ___CSS_LOADER_EXPORT___ = __webpack_require__.n(
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__
          )()(
            _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()
          );
        ___CSS_LOADER_EXPORT___.push([
          module.id,
          '.CityReact_invisible__fS860{display:none}.CityReact_panelQuiz__wrongAnswer__AQ3ir{color:red}',
          '',
          {
            version: 3,
            sources: ['webpack://./components/CityReact.module.scss'],
            names: [],
            mappings: 'AAAA,4BACE,YAAA,CAKA,yCACA,SAAA',
            sourcesContent: [
              '.invisible{display:none}.panelQuiz__wrongAnswer{color:red}',
            ],
            sourceRoot: '',
          },
        ]),
          (___CSS_LOADER_EXPORT___.locals = {
            invisible: 'CityReact_invisible__fS860',
            panelQuiz__wrongAnswer: 'CityReact_panelQuiz__wrongAnswer__AQ3ir',
          });
        const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
      },
    './node_modules/css-loader/dist/runtime/api.js': (module) => {
      module.exports = function (cssWithMappingToString) {
        var list = [];
        return (
          (list.toString = function toString() {
            return this.map(function (item) {
              var content = '',
                needLayer = void 0 !== item[5];
              return (
                item[4] && (content += '@supports ('.concat(item[4], ') {')),
                item[2] && (content += '@media '.concat(item[2], ' {')),
                needLayer &&
                  (content += '@layer'.concat(
                    item[5].length > 0 ? ' '.concat(item[5]) : '',
                    ' {'
                  )),
                (content += cssWithMappingToString(item)),
                needLayer && (content += '}'),
                item[2] && (content += '}'),
                item[4] && (content += '}'),
                content
              );
            }).join('');
          }),
          (list.i = function i(modules, media, dedupe, supports, layer) {
            'string' == typeof modules && (modules = [[null, modules, void 0]]);
            var alreadyImportedModules = {};
            if (dedupe)
              for (var k = 0; k < this.length; k++) {
                var id = this[k][0];
                null != id && (alreadyImportedModules[id] = !0);
              }
            for (var _k = 0; _k < modules.length; _k++) {
              var item = [].concat(modules[_k]);
              (dedupe && alreadyImportedModules[item[0]]) ||
                (void 0 !== layer &&
                  (void 0 === item[5] ||
                    (item[1] = '@layer'
                      .concat(
                        item[5].length > 0 ? ' '.concat(item[5]) : '',
                        ' {'
                      )
                      .concat(item[1], '}')),
                  (item[5] = layer)),
                media &&
                  (item[2]
                    ? ((item[1] = '@media '
                        .concat(item[2], ' {')
                        .concat(item[1], '}')),
                      (item[2] = media))
                    : (item[2] = media)),
                supports &&
                  (item[4]
                    ? ((item[1] = '@supports ('
                        .concat(item[4], ') {')
                        .concat(item[1], '}')),
                      (item[4] = supports))
                    : (item[4] = ''.concat(supports))),
                list.push(item));
            }
          }),
          list
        );
      };
    },
    './node_modules/css-loader/dist/runtime/sourceMaps.js': (module) => {
      module.exports = function (item) {
        var content = item[1],
          cssMapping = item[3];
        if (!cssMapping) return content;
        if ('function' == typeof btoa) {
          var base64 = btoa(
              unescape(encodeURIComponent(JSON.stringify(cssMapping)))
            ),
            data =
              'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(
                base64
              ),
            sourceMapping = '/*# '.concat(data, ' */');
          return [content].concat([sourceMapping]).join('\n');
        }
        return [content].join('\n');
      };
    },
    './node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js': (
      module
    ) => {
      var stylesInDOM = [];
      function getIndexByIdentifier(identifier) {
        for (var result = -1, i = 0; i < stylesInDOM.length; i++)
          if (stylesInDOM[i].identifier === identifier) {
            result = i;
            break;
          }
        return result;
      }
      function modulesToDom(list, options) {
        for (
          var idCountMap = {}, identifiers = [], i = 0;
          i < list.length;
          i++
        ) {
          var item = list[i],
            id = options.base ? item[0] + options.base : item[0],
            count = idCountMap[id] || 0,
            identifier = ''.concat(id, ' ').concat(count);
          idCountMap[id] = count + 1;
          var indexByIdentifier = getIndexByIdentifier(identifier),
            obj = {
              css: item[1],
              media: item[2],
              sourceMap: item[3],
              supports: item[4],
              layer: item[5],
            };
          if (-1 !== indexByIdentifier)
            stylesInDOM[indexByIdentifier].references++,
              stylesInDOM[indexByIdentifier].updater(obj);
          else {
            var updater = addElementStyle(obj, options);
            (options.byIndex = i),
              stylesInDOM.splice(i, 0, { identifier, updater, references: 1 });
          }
          identifiers.push(identifier);
        }
        return identifiers;
      }
      function addElementStyle(obj, options) {
        var api = options.domAPI(options);
        api.update(obj);
        return function updater(newObj) {
          if (newObj) {
            if (
              newObj.css === obj.css &&
              newObj.media === obj.media &&
              newObj.sourceMap === obj.sourceMap &&
              newObj.supports === obj.supports &&
              newObj.layer === obj.layer
            )
              return;
            api.update((obj = newObj));
          } else api.remove();
        };
      }
      module.exports = function (list, options) {
        var lastIdentifiers = modulesToDom(
          (list = list || []),
          (options = options || {})
        );
        return function update(newList) {
          newList = newList || [];
          for (var i = 0; i < lastIdentifiers.length; i++) {
            var index = getIndexByIdentifier(lastIdentifiers[i]);
            stylesInDOM[index].references--;
          }
          for (
            var newLastIdentifiers = modulesToDom(newList, options), _i = 0;
            _i < lastIdentifiers.length;
            _i++
          ) {
            var _index = getIndexByIdentifier(lastIdentifiers[_i]);
            0 === stylesInDOM[_index].references &&
              (stylesInDOM[_index].updater(), stylesInDOM.splice(_index, 1));
          }
          lastIdentifiers = newLastIdentifiers;
        };
      };
    },
    './node_modules/style-loader/dist/runtime/insertBySelector.js': (
      module
    ) => {
      var memo = {};
      module.exports = function insertBySelector(insert, style) {
        var target = (function getTarget(target) {
          if (void 0 === memo[target]) {
            var styleTarget = document.querySelector(target);
            if (
              window.HTMLIFrameElement &&
              styleTarget instanceof window.HTMLIFrameElement
            )
              try {
                styleTarget = styleTarget.contentDocument.head;
              } catch (e) {
                styleTarget = null;
              }
            memo[target] = styleTarget;
          }
          return memo[target];
        })(insert);
        if (!target)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
          );
        target.appendChild(style);
      };
    },
    './node_modules/style-loader/dist/runtime/insertStyleElement.js': (
      module
    ) => {
      module.exports = function insertStyleElement(options) {
        var element = document.createElement('style');
        return (
          options.setAttributes(element, options.attributes),
          options.insert(element, options.options),
          element
        );
      };
    },
    './node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js':
      (module, __unused_webpack_exports, __webpack_require__) => {
        module.exports = function setAttributesWithoutAttributes(styleElement) {
          var nonce = __webpack_require__.nc;
          nonce && styleElement.setAttribute('nonce', nonce);
        };
      },
    './node_modules/style-loader/dist/runtime/styleDomAPI.js': (module) => {
      module.exports = function domAPI(options) {
        if ('undefined' == typeof document)
          return { update: function update() {}, remove: function remove() {} };
        var styleElement = options.insertStyleElement(options);
        return {
          update: function update(obj) {
            !(function apply(styleElement, options, obj) {
              var css = '';
              obj.supports &&
                (css += '@supports ('.concat(obj.supports, ') {')),
                obj.media && (css += '@media '.concat(obj.media, ' {'));
              var needLayer = void 0 !== obj.layer;
              needLayer &&
                (css += '@layer'.concat(
                  obj.layer.length > 0 ? ' '.concat(obj.layer) : '',
                  ' {'
                )),
                (css += obj.css),
                needLayer && (css += '}'),
                obj.media && (css += '}'),
                obj.supports && (css += '}');
              var sourceMap = obj.sourceMap;
              sourceMap &&
                'undefined' != typeof btoa &&
                (css +=
                  '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
                    btoa(
                      unescape(encodeURIComponent(JSON.stringify(sourceMap)))
                    ),
                    ' */'
                  )),
                options.styleTagTransform(css, styleElement, options.options);
            })(styleElement, options, obj);
          },
          remove: function remove() {
            !(function removeStyleElement(styleElement) {
              if (null === styleElement.parentNode) return !1;
              styleElement.parentNode.removeChild(styleElement);
            })(styleElement);
          },
        };
      };
    },
    './node_modules/style-loader/dist/runtime/styleTagTransform.js': (
      module
    ) => {
      module.exports = function styleTagTransform(css, styleElement) {
        if (styleElement.styleSheet) styleElement.styleSheet.cssText = css;
        else {
          for (; styleElement.firstChild; )
            styleElement.removeChild(styleElement.firstChild);
          styleElement.appendChild(document.createTextNode(css));
        }
      };
    },
  },
]);
