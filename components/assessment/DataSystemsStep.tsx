import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AssessmentSubmission } from '@/lib/types/assessment';

interface DataSystemsStepProps {
  formData: Partial<AssessmentSubmission>;
  updateField: (field: string, value: any) => void;
  toggleArrayItem: (field: string, value: string, maxItems?: number) => void;
}

export function DataSystemsStep({ formData, updateField, toggleArrayItem }: DataSystemsStepProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Where is your customer data mainly stored?</Label>
        <RadioGroup value={formData.dataStorage} onValueChange={(value) => updateField('dataStorage', value)}>
          {['Spreadsheet', 'CRM', 'Accounting system', 'eCommerce platform', 'Email inbox', 'Multiple places', 'Not sure'].map(storage => (
            <div key={storage} className="flex items-center space-x-2">
              <RadioGroupItem value={storage} id={`storage-${storage}`} />
              <Label htmlFor={`storage-${storage}`} className="text-sm sm:text-base font-normal cursor-pointer">{storage}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Core systems used (Select up to 6)</Label>
        <div className="space-y-2">
          {['Google Workspace', 'Microsoft 365', 'HubSpot', 'Salesforce', 'Pipedrive', 'Zoho', 'Shopify', 'WooCommerce',
            'Wix', 'Squarespace', 'Xero', 'QuickBooks', 'Sage', 'Slack', 'Teams', 'Asana', 'Trello', 'Monday', 'Other'].map(system => (
            <div key={system} className="flex items-center space-x-2">
              <Checkbox
                id={`system-${system}`}
                checked={formData.coreSystems?.includes(system)}
                onCheckedChange={() => toggleArrayItem('coreSystems', system, 6)}
                disabled={!formData.coreSystems?.includes(system) && formData.coreSystems?.length === 6}
              />
              <Label htmlFor={`system-${system}`} className="text-sm sm:text-base font-normal cursor-pointer">{system}</Label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
