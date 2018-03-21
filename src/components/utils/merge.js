/* eslint no-restricted-syntax: ["error", "BinaryExpression[operator='in']"] */
export default function (target, ...args) {
  const t = target;
  for (let i = 0; i < args.length; i += 1) {
    const source = args[i] || {};
    for (const prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        const value = source[prop];
        if (value !== undefined) {
          t[prop] = value;
        }
      }
    }
  }

  return t;
}
