import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AssessmentSubmission } from '@/lib/types/assessment';

interface RiskReadinessStepProps {
  formData: Partial<AssessmentSubmission>;
  updateField: (field: string, value: any) => void;
  toggleArrayItem: (field: string, value: string, maxItems?: number) => void;
}

export function RiskReadinessStep({ formData, updateField, toggleArrayItem }: RiskReadinessStepProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Do you have AI usage rules for staff?</Label>
        <RadioGroup value={formData.aiPolicy} onValueChange={(value) => updateField('aiPolicy', value)}>
          {['No', 'Informal', 'Basic guidelines', 'Clear policy + training'].map(policy => (
            <div key={policy} className="flex items-center space-x-2">
              <RadioGroupItem value={policy} id={`policy-${policy}`} />
              <Label htmlFor={`policy-${policy}`} className="text-sm sm:text-base font-normal cursor-pointer">{policy}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base">What data types do you handle?</Label>
        <div className="space-y-2">
          {['Personal customer data', 'Payment data', 'Health data', 'Legal / confidential client data', 'None', 'Not sure'].map(dataType => (
            <div key={dataType} className="flex items-center space-x-2">
              <Checkbox
                id={`dataType-${dataType}`}
                checked={formData.dataTypes?.includes(dataType)}
                onCheckedChange={() => toggleArrayItem('dataTypes', dataType)}
              />
              <Label htmlFor={`dataType-${dataType}`} className="text-sm sm:text-base font-normal cursor-pointer">{dataType}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Biggest concern about AI?</Label>
        <RadioGroup value={formData.biggestConcern} onValueChange={(value) => updateField('biggestConcern', value)}>
          {['Data privacy', 'Wrong answers', 'Reputation risk', 'Cost', 'Complexity', 'Staff adoption', "Don't know where to start"].map(concern => (
            <div key={concern} className="flex items-center space-x-2">
              <RadioGroupItem value={concern} id={`concern-${concern}`} />
              <Label htmlFor={`concern-${concern}`} className="text-sm sm:text-base font-normal cursor-pointer">{concern}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
}
