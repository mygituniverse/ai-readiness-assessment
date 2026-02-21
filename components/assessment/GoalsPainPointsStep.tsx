import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AssessmentSubmission } from '@/lib/types/assessment';

interface GoalsPainPointsStepProps {
  formData: Partial<AssessmentSubmission>;
  errors: Record<string, string>;
  toggleArrayItem: (field: string, value: string, maxItems?: number) => void;
}

export function GoalsPainPointsStep({ formData, errors, toggleArrayItem }: GoalsPainPointsStepProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Top 2 goals for next 6 months * (Select up to 2)</Label>
        <div className="space-y-2">
          {['More leads', 'Better conversion', 'Faster delivery', 'Reduce admin', 'Improve customer support', 
            'Reduce costs', 'Better reporting', 'Hiring & retention', 'Compliance', 'Other'].map(goal => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={`goal-${goal}`}
                checked={formData.goals?.includes(goal)}
                onCheckedChange={() => toggleArrayItem('goals', goal, 2)}
                disabled={!formData.goals?.includes(goal) && formData.goals?.length === 2}
              />
              <Label htmlFor={`goal-${goal}`} className="text-sm sm:text-base font-normal cursor-pointer">{goal}</Label>
            </div>
          ))}
        </div>
        {errors.goals && <p className="text-sm text-destructive">{errors.goals}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Biggest time-wasters * (Select up to 3)</Label>
        <div className="space-y-2">
          {['Emails & follow-ups', 'Scheduling', 'Data entry', 'Quoting & proposals', 'Customer enquiries',
            'Invoicing & chasing payments', 'Social content', 'Internal reporting', 'Hiring admin', 'Other'].map(waster => (
            <div key={waster} className="flex items-center space-x-2">
              <Checkbox
                id={`waster-${waster}`}
                checked={formData.timeWasters?.includes(waster)}
                onCheckedChange={() => toggleArrayItem('timeWasters', waster, 3)}
                disabled={!formData.timeWasters?.includes(waster) && formData.timeWasters?.length === 3}
              />
              <Label htmlFor={`waster-${waster}`} className="text-sm sm:text-base font-normal cursor-pointer">{waster}</Label>
            </div>
          ))}
        </div>
        {errors.timeWasters && <p className="text-sm text-destructive">{errors.timeWasters}</p>}
      </div>
    </>
  );
}
