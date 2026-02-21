import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AssessmentSubmission } from '@/lib/types/assessment';

interface ContactStepProps {
  formData: Partial<AssessmentSubmission>;
  errors: Record<string, string>;
  updateField: (field: string, value: any) => void;
}

export function ContactStep({ formData, errors, updateField }: ContactStepProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Interested in a free 15-minute AI opportunity call?</Label>
        <RadioGroup 
          value={formData.wantsCall ? 'Yes' : 'No'} 
          onValueChange={(value) => updateField('wantsCall', value === 'Yes')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="call-yes" />
            <Label htmlFor="call-yes" className="text-sm sm:text-base font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="call-no" />
            <Label htmlFor="call-no" className="text-sm sm:text-base font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comments">Additional comments (optional, max 200 chars)</Label>
        <Textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => updateField('comments', e.target.value.slice(0, 200))}
          placeholder="Any additional information you'd like to share..."
          maxLength={200}
          rows={4}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.comments?.length || 0}/200
        </p>
      </div>
    </>
  );
}
