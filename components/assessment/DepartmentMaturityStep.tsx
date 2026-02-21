import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AssessmentSubmission } from '@/lib/types/assessment';

interface DepartmentMaturityStepProps {
  formData: Partial<AssessmentSubmission>;
  updateDepartmentScore: (dept: keyof AssessmentSubmission['departmentScores'], score: number) => void;
  toggleArrayItem: (field: string, value: string, maxItems?: number) => void;
  showAutomatedProcesses: boolean;
}

export function DepartmentMaturityStep({ 
  formData, 
  updateDepartmentScore, 
  toggleArrayItem,
  showAutomatedProcesses 
}: DepartmentMaturityStepProps) {
  return (
    <>
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Rate each department: 0 = Not using, 1 = Experimenting, 2 = Implemented, 3 = Embedded
        </p>

        {[
          { key: 'customerService', label: 'Customer Service' },
          { key: 'sales', label: 'Sales' },
          { key: 'marketing', label: 'Marketing' },
          { key: 'operations', label: 'Operations / Delivery' },
          { key: 'finance', label: 'Finance / Admin' },
          { key: 'hr', label: 'HR / People' },
        ].map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <Label className="text-sm sm:text-base">{label}</Label>
            <RadioGroup
              value={formData.departmentScores?.[key as keyof typeof formData.departmentScores]?.toString()}
              onValueChange={(value) => updateDepartmentScore(key as keyof AssessmentSubmission['departmentScores'], parseInt(value))}
            >
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {[0, 1, 2, 3].map(score => (
                  <div key={score} className="flex items-center space-x-2">
                    <RadioGroupItem value={score.toString()} id={`${key}-${score}`} />
                    <Label htmlFor={`${key}-${score}`} className="text-sm sm:text-base font-normal cursor-pointer">{score}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>

      {showAutomatedProcesses && (
        <div className="space-y-2 pt-4 border-t">
          <Label className="text-sm sm:text-base">Which processes are already automated or integrated?</Label>
          <div className="space-y-2">
            {['Website chat', 'Lead capture to CRM', 'Auto follow-ups', 'Meeting booking', 'Proposal generation',
              'Reporting dashboards', 'Invoice reminders', 'Document processing', 'Internal knowledge base / SOP assistant', 'Other'].map(process => (
              <div key={process} className="flex items-center space-x-2">
                <Checkbox
                  id={`process-${process}`}
                  checked={formData.automatedProcesses?.includes(process)}
                  onCheckedChange={() => toggleArrayItem('automatedProcesses', process)}
                />
                <Label htmlFor={`process-${process}`} className="text-sm sm:text-base font-normal cursor-pointer">{process}</Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
