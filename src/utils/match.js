export const match = (key, lookupObj, ...args) => {
  if (key in lookupObj) {
    const value = lookupObj[key];
    return typeof value === "function" ? value(...args) : value;
  }

  const error = new Error(
    `Could not handle match for key: ${key.toString()}. Only valid keys are: ${Object.keys(
      lookupObj
    ).join(", ")}`
  );
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (Error.captureStackTrace) Error.captureStackTrace(error, match);
  throw error;
};

export default match;
