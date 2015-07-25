function checkDep(obj, propName) {
  if (!obj) {
    throw new Error('Object cannot be undefined');
  }

  if (!obj[propName]) {
    throw new Error(propName + ' cannot be undefined');
  }

  return obj[propName];
};

module.exports.checkDep = checkDep;
