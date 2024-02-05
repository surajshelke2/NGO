export const determinePassOrFail = (score) => {
    return score >= 40 ? 'Pass' : 'Fail';
  };

  export const calculateScore = (subjects) => {
    const totalMarks = subjects.reduce((total, subject) => total + subject.totalMarks, 0);
    if (totalMarks === 0) return 0; 
    const totalObtainedMarks = subjects.reduce((total, subject) => total + subject.marksObtained, 0);
    const averagePercentage = (totalObtainedMarks / totalMarks) * 100;
    return averagePercentage;
  };
  