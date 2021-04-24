NOTE: I am using https://github.com/yahoo/serialize-javascript for now. It is not perfect, but gets much of the job done.


Converting objects to strings is a rather complex affair. Let's consider some of the default options:

# JSON.stringify()

JSON.stringify is a great tool for rudimentary string conversion, however it ignores a lot of important information:

| Issue | Example input | Example output |
| --- | --- | --- |
| function | `{ f() {} }` | `'{}'` |
| class information | | |
| `undefined` | | |
| `Date` | | |
| `Regex` | | |
| `Map` | | |
| `Set` | | |
| `Infinite` | | |
| `NaN` | | |
| [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) | | |

# util.inspect

-> Node only

# console.log(obj)

-> Only works well in browsers (for now). Does not allow us to easily add to a string/message.