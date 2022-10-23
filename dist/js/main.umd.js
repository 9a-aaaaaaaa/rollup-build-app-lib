(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.sdk = factory());
})(this, (function () { 'use strict';

  var name = "rollup-build-typescript";
  var version = "1.0.1";

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeJoin = arrayProto.join;

  /**
   * Converts all elements in `array` into a string separated by `separator`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to convert.
   * @param {string} [separator=','] The element separator.
   * @returns {string} Returns the joined string.
   * @example
   *
   * _.join(['a', 'b', 'c'], '~');
   * // => 'a~b~c'
   */
  function join(array, separator) {
    return array == null ? '' : nativeJoin.call(array, separator);
  }

  var cjs = {
      name:"yach",
      getVersion: function(){
          return this.name;
      }
  };

  var fetchApi = endpoint =>{
      return fetch(`https://jsonplaceholder.typicode.com/todos/${endpoint}`)
      .then(response => response.json())
      .then(json => console.log(json))
  };

  const log = (message)=>{
      console.log(message);
  };

  const skd ={
      name,
      version,
      val: join([1,2,3,4,5],'@'),
      data: [1],
      getVersion: ()=>{
          console.log("哈哈哈 ");
          cjs.getVersion();
          log("Hello world rollup build");
          {
              log(8888);
          }
      },
      request: async ()=>{
          const getData = await fetchApi(1);
          return getData;
      }
  };

  // import("./logger").then(({log})=>{
  //     log("This is dynamic import infomation!");
  // })


  // import { info,log } from "./logger/index";

  // fetchApi(1).then( data=>{
  //     log(data)
  // })

  return skd;

}));
//# sourceMappingURL=main.umd.js.map
