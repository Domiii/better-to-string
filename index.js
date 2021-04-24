const DefaultCfg = {
  defaultIndent: '  ',
  maxDepth: 15
};

export function setOptions(options) {
  Object.assign(DefaultCfg, options);
}

export default function betterToString(val, cfg, depth, indent) {
  const str = '';

  const {
    maxDepth
  } = cfg || DefaultCfg;

  // Un-comment this to trace down possible infinite loops
  // if (!layer && !maxDepth) {
  //     console.trace();
  // }

  if (maxDepth && depth >= maxDepth) {
    return '...';
  }
  else if (!maxDepth && depth > 20) {
    console.trace('Object is too complex for string conversion: ' + val);
    return '...';
  }

  depth = depth || 0;

  // fix up indent (if not given)
  if (!indent) {
    indent = '';
    for (const i = 0; i < depth; ++i) {
      indent += DefaultCfg.defaultIndent;
    }
  }

  // let's go!
  if (val === null) {
    str += 'null';
  }
  else if (val === undefined) {
    str += 'undefined';
  }
  else if (typeof val === 'string' || val instanceof String) {
    str += JSON.stringify(val);
  }
  else if (val && val.toJSON) {
    // custom JSON serialization
    // (e.g. for Date type etc)
    str += JSON.stringify(val);
  }
  else {
    // array
    const isArray = Array.isArray(val);

    // object
    // see https://github.com/lodash/lodash/blob/master/isObjectLike.js#L23
    const isObject = typeof (val) === 'object' && val !== null;

    // strong typed object
    const ctor = val?.constructor;
    if (isArray || isObject) {
      const outerIndent = indent;
      indent += '  ';

      if (isArray) {
        // array
        str += '[\n';
        for (const i = 0; i < val.length; ++i) {
          const valueStr = betterToString(val[i], cfg, depth + 1, indent);
          str += indent + valueStr;
          if (i < val.length - 1) {
            // append comma
            str += ',\n';
          }
        }
      }
      else {
        str += '{\n';
        for (const prop in val) {
          if (val.hasOwnProperty && !val.hasOwnProperty(prop)) continue;
          const valueStr = betterToString(val[prop], cfg, depth + 1, indent);
          str += indent + '\'' + prop + '\'' + ' : ' + valueStr;

          // append comma
          str += ',\n';
        }

        // remove dangling comma
        if (str.endsWith(',\n')) {
          str = str.substring(0, str.length - 2);
        }
      }

      // close array or object definition
      str += '\n' + outerIndent;
      str += isArray ? ']' : '}';
    }
    else {
      str += val.toString();
    }
  }
  return str;
}
