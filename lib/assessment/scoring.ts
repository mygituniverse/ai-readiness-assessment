import { AssessmentSubmission, Segment } from '@/lib/types/assessment';

export function calculateMaturityScore(submission: AssessmentSubmission): number {
  const { departmentScores } = submission;
  return (
    departmentScores.customerService +
    departmentScores.sales +
    departmentScores.marketing +
    departmentScores.operations +
    departmentScores.finance +
    departmentScores.hr
  );
}

export function determineSegment(score: number): Segment {
  if (score >= 15) return 'Scaler';
  if (score >= 10) return 'Implementer';
  if (score >= 5) return 'Explorer';
  return 'Starter';
}

export function getLowestScoringDepartments(
  departmentScores: AssessmentSubmission['departmentScores']
): string[] {
  const departments = [
    { name: 'customerService', score: departmentScores.customerService },
    { name: 'sales', score: departmentScores.sales },
    { name: 'marketing', score: departmentScores.marketing },
    { name: 'operations', score: departmentScores.operations },
    { name: 'finance', score: departmentScores.finance },
    { name: 'hr', score: departmentScores.hr },
  ];

  departments.sort((a, b) => a.score - b.score);
  return [departments[0].name, departments[1].name];
}
