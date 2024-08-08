function ConvertHandler() {

  this.getNum = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const numString = input.split(unitRegex)[0].trim();

    if (!numString) {
      return 1;
    }

    const numRegex = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)$/;
    const match = numString.match(numRegex);

    if (!match) {
      return 'invalid number';
    }

    if (numString.includes('/')) {
      const nums = numString.split('/');
      if (nums.length !== 2) {
        return 'invalid number';
      }
      const numerator = parseFloat(nums[0]);
      const denominator = parseFloat(nums[1]);
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }
      return parseFloat((numerator / denominator).toFixed(5));
    } else {
      const number = parseFloat(numString);
      if (isNaN(number)) {
        return 'invalid number';
      }
      return parseFloat(number.toFixed(5));
    }
  };

  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);

    if (match) {
      const unit = match[0].toLowerCase();
      const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      if (validUnits.includes(unit)) {
        return unit === 'l' ? 'L' : unit;
      }
    }
    return 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const unitPairs = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitPairs[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellOut = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return spellOut[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return 'invalid unit';
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };

}

module.exports = ConvertHandler;
