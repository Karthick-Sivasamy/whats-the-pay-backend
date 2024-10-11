const AppError = require('./appError');

exports.getRandomFourDigit = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
};

exports.validateParamsIfNot = (objectCombinedByComma, req, next) => {
  let splitedArr = objectCombinedByComma.split(',');

  let error = '';
  for (let i = 0; i < splitedArr.length; i++) {
    let ele = splitedArr[i].trim();
    if (!req.body[ele]) {
      if (error && i == splitedArr.length - 1) {
        error += ` and ${ele}`;
      } else {
        error += `${error ? ',' : ''} ${ele}`;
      }
    }
  }

  if (error) return next(new AppError(`Please provide${error}`, 404));
};
