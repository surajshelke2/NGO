export const determinePassOrFail = (score) => {
    return score >= 40 ? 'Pass' : 'Fail';
  };

  export const calculateScore = (subjects) => {
    return subjects.reduce((total, subject) => total + subject.marksObtained, 0);
  };