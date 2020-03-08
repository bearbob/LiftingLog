/* System to calculate strength score
 * Credit: https://symmetricstrength.com/
 */

 /**
  * @private
  */
var wilksToStrengthScore = function(expectedWilks, age) {
  "use strict";
  var ageModifier=1;
  if(typeof age == "number" && age < 23) {
    ageModifier = (0.0038961 * Math.pow(age,2)) - 0.166926 * age + 2.80303;
  }
  if(typeof age == "number" && age > 40) {
    ageModifier = 467683e-9 * Math.pow(age,2) - 0.0299717*age + 1.45454;
  }
  return expectedWilks*ageModifier/4;
};

/**
 * @private
 * @param {integer} age - The age of the lifter in years
 * @param {integer} bodyweight - The bodyweight of the lifter in kilogram
 */
var wilksCoefficient = function(isMale, bodyweight) {
  "use strict";
  var a=594.31747775582,
      b=-27.23842536447,
      c=0.82112226871,
      d=-0.00930733913,
      e=4731582e-11,
      f=-9.054e-8;
  if(isMale){
    a=-216.0475144;
    b=16.2606339;
    c=-0.002388645;
    d=-0.00113732;
    e=701863e-11;
    f=-1.291e-8;
  }
  return 500/(a + b*bodyweight + c*Math.pow(bodyweight,2) + d*Math.pow(bodyweight,3) + e*Math.pow(bodyweight,4) + f*Math.pow(bodyweight,5));
};

/**
 * @private
 */
var percentOfPLTotal = function(isMale, bodyweight, exerciseName, oneRep) {
  "use strict";

  var deadliftMale = 0.396825,
      deadliftFemale = 0.414938;
  switch(exerciseName){
    case "sumoDeadlift":
    case "deadlift": return isMale? deadliftMale : deadliftFemale;
    case "backSquat": return isMale? 0.87*deadliftMale : 0.84*deadliftFemale;
    case "benchPress": return isMale? 0.65*deadliftMale : 0.57*deadliftFemale;
    case "powerClean": return isMale? 0.56*deadliftMale : 0.56*deadliftFemale;
    case "frontSquat": return isMale? 0.8*0.87*deadliftMale : 0.8*0.84*deadliftFemale;
    case "inclineBenchPress": return isMale? 0.82*0.65*deadliftMale : 0.82*0.57*deadliftFemale;
    case "overheadPress": return isMale? 0.65*0.65*deadliftMale : 0.65*0.57*deadliftFemale;
    case "pushPress": return isMale? 1.33*0.65*0.65*deadliftMale : 1.33*0.65*0.57*deadliftFemale;
    case "snatchPress": return isMale? 0.8*0.65*0.65*deadliftMale : 0.8*0.65*0.57*deadliftFemale;
    case "pendlayRow": return isMale? 0.53*deadliftMale : 0.53*deadliftFemale;
  }

  let l = 2.20462*(oneRep-bodyweight);
  if("dip"===exerciseName) {
      if(isMale){
        return 1.68064e-10*Math.pow(l,4)-1.2946e-7*Math.pow(l,3)+371905e-10*Math.pow(l,2)-0.00499168*l+0.566576;
      }
      return 8.249e-10*Math.pow(l,4)-4.01956e-7*Math.pow(l,3)+622122e-10*Math.pow(l,2)-0.00431442*l+0.37562;
    }

  var chinUpPercent = 1.66589e-9*Math.pow(l,4)-5.1621e-7*Math.pow(l,3)+54088e-9*Math.pow(l,2)-0.00281674*l+0.302005;
  if(isMale){
      chinUpPercent = 4.01897e-10*Math.pow(l,4)-2.34536e-7*Math.pow(l,3)+502252e-10*Math.pow(l,2)-0.00502633*l+0.459545;
  }

  if("chinup"===exerciseName) {
    return chinUpPercent;
  }
  if("pullup"===exerciseName) {
    return 0.95*chinUpPercent;
  }

  return 1;
};

/**
 * @private
 */
var expectedPLTotal = function(isMale, bodyweight, exerciseName, oneRM){
  "use strict";
  return oneRM/percentOfPLTotal(isMale, bodyweight, exerciseName, oneRM);
};

/**
 * @private
 */
var singleLiftStrengthScore = function(isMale, age, bodyweight, exerciseName, oneRM) {
  "use strict";
  var expectedWilks = wilksCoefficient(isMale, bodyweight) * expectedPLTotal(isMale, bodyweight, exerciseName, oneRM);
  return wilksToStrengthScore(expectedWilks, age);
};

/**
 * @public
 * Calculates the strength score for a single exercise
 * @param {boolean} isMale - True, if the value is calculated for a male lifter, false otherwise
 * @param {integer} age - The age of the lifter in years
 * @param {integer} bodyweight - The bodyweight of the lifter in kilogram
 * @param {string} exerciseName - The name of the exercise in lowerCamelCase (e.g. "backSquat")
 * @param {double} oneRM - The one repitition maximum for the given lift
 * @return {double}
 */
export const getSingleExerciseStrengthScore = (isMale, age, bodyweight, exerciseName, oneRM) => {
  "use strict";
  return Math.round(singleLiftStrengthScore(isMale, age, bodyweight, exerciseName, oneRM) * 10) / 10;
};
