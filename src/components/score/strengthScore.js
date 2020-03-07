/* System to calculate strength score
 * Credit: https://symmetricstrength.com/
 */

var wilksToStrengthScore = function(expectedWilks, age) {
  var ageModifier=1;
  if(typeof age == "number" && age < 23) {
    ageModifier = (0.0038961 * Math.pow(age,2)) - 0.166926 * age + 2.80303;
  }
  if(typeof age == "number" && age > 40) {
    ageModifier = 467683e-9 * Math.pow(age,2) - 0.0299717*age + 1.45454;
  }
  return expectedWilks*ageModifier/4;
};

var wilksCoefficient = function(sex, bodyweight){
  var a=594.31747775582,
      b=-27.23842536447,
      c=0.82112226871,
      d=-0.00930733913,
      e=4731582e-11,
      f=-9.054e-8;
  if(sex === "Male"){
    a=-216.0475144;
    b=16.2606339;
    c=-0.002388645;
    d=-0.00113732;
    e=701863e-11;
    f=-1.291e-8;
  }
  return 500/(a + b*bodyweight + c*Math.pow(bodyweight,2) + d*Math.pow(bodyweight,3) + e*Math.pow(bodyweight,4) + f*Math.pow(bodyweight,5));
};

var percentOfPLTotal = function(unitSystem, sex, bodyweight, exerciseName, oneRep){
  var deadliftMale = 0.396825,
      deadliftFemale = 0.414938;
  switch(exerciseName){
    case "sumoDeadlift":
    case "deadlift": return (sex === "Male")? deadliftMale : deadliftFemale;
    case "backSquat": return (sex === "Male")? 0.87*deadliftMale : 0.84*deadliftFemale;
    case "benchPress": return (sex === "Male")? 0.65*deadliftMale : 0.57*deadliftFemale;
    case "powerClean": return (sex === "Male")? 0.56*deadliftMale : 0.56*deadliftFemale;
    case "frontSquat": return (sex === "Male")? 0.8*0.87*deadliftMale : 0.8*0.84*deadliftFemale;
    case "inclineBenchPress": return (sex === "Male")? 0.82*0.65*deadliftMale : 0.82*0.57*deadliftFemale;
    case "overheadPress": return (sex === "Male")? 0.65*0.65*deadliftMale : 0.65*0.57*deadliftFemale;
    case "pushPress": return (sex === "Male")? 1.33*0.65*0.65*deadliftMale : 1.33*0.65*0.57*deadliftFemale;
    case "snatchPress": return (sex === "Male")? 0.8*0.65*0.65*deadliftMale : 0.8*0.65*0.57*deadliftFemale;
    case "pendlayRow": return (sex === "Male")? 0.53*deadliftMale : 0.53*deadliftFemale;
  }

  let l="Imperial"===unitSystem?oneRep-bodyweight: 2.20462*(oneRep-bodyweight);
  if("dip"===exerciseName) {
      if(sex === "Male"){
        return 1.68064e-10*Math.pow(l,4)-1.2946e-7*Math.pow(l,3)+371905e-10*Math.pow(l,2)-0.00499168*l+0.566576;
      }
      return 8.249e-10*Math.pow(l,4)-4.01956e-7*Math.pow(l,3)+622122e-10*Math.pow(l,2)-0.00431442*l+0.37562;
    }

  var chinUpPercent = 1.66589e-9*Math.pow(l,4)-5.1621e-7*Math.pow(l,3)+54088e-9*Math.pow(l,2)-0.00281674*l+0.302005;
  if(sex === "Male"){
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

var expectedPLTotal = function(unitSystem, sex, bodyweight, exercise, oneRM){
  return oneRM/percentOfPLTotal(unitSystem, sex, bodyweight, exercise, oneRM);
};

var singleLiftStrengthScore = function(sex, age, bodyweight, exerciseName, oneRM) {
  var expectedWilks = wilksCoefficient(sex, bodyweight) * expectedPLTotal("Kilogram", sex, bodyweight, exercise, oneRM);
  return wilksToStrengthScore(expectedWilks, age);
};

var getSingleExerciseStrengthScore = function(sex, age, bodyweight, exerciseName, oneRM) {
  return Math.round(singleLiftStrengthScore(sex, age, bodyweight, exerciseName, oneRM) * 10) / 10;
};
