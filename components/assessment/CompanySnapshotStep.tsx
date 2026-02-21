import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssessmentSubmission } from '@/lib/types/assessment';
import { countries } from '@/lib/data/countries';

interface CompanySnapshotStepProps {
  formData: Partial<AssessmentSubmission>;
  errors: Record<string, string>;
  updateField: (field: string, value: any) => void;
}

export function CompanySnapshotStep({ formData, errors, updateField }: CompanySnapshotStepProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name *</Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => updateField('companyName', e.target.value)}
          placeholder="Enter your company name"
        />
        {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry *</Label>
        <Select value={formData.industry} onValueChange={(value) => updateField('industry', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Retail / eCommerce">Retail / eCommerce</SelectItem>
            <SelectItem value="Professional Services">Professional Services</SelectItem>
            <SelectItem value="Trades & Construction">Trades & Construction</SelectItem>
            <SelectItem value="Hospitality">Hospitality</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            <SelectItem value="Logistics">Logistics</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.industry && <p className="text-sm text-destructive">{errors.industry}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Number of Employees *</Label>
        <RadioGroup value={formData.employees} onValueChange={(value) => updateField('employees', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="emp1" />
            <Label htmlFor="emp1" className="text-sm sm:text-base font-normal cursor-pointer">1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2–5" id="emp2" />
            <Label htmlFor="emp2" className="text-sm sm:text-base font-normal cursor-pointer">2–5</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="6–15" id="emp3" />
            <Label htmlFor="emp3" className="text-sm sm:text-base font-normal cursor-pointer">6–15</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="16–50" id="emp4" />
            <Label htmlFor="emp4" className="text-sm sm:text-base font-normal cursor-pointer">16–50</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="51–200" id="emp5" />
            <Label htmlFor="emp5" className="text-sm sm:text-base font-normal cursor-pointer">51–200</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="200+" id="emp6" />
            <Label htmlFor="emp6" className="text-sm sm:text-base font-normal cursor-pointer">200+</Label>
          </div>
        </RadioGroup>
        {errors.employees && <p className="text-sm text-destructive">{errors.employees}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Your Role *</Label>
        <RadioGroup value={formData.role} onValueChange={(value) => updateField('role', value)}>
          {['Owner', 'Managing Director', 'Operations', 'Sales', 'Marketing', 'IT', 'Finance', 'Other'].map(role => (
            <div key={role} className="flex items-center space-x-2">
              <RadioGroupItem value={role} id={`role-${role}`} />
              <Label htmlFor={`role-${role}`} className="text-sm sm:text-base font-normal cursor-pointer">{role}</Label>
            </div>
          ))}
        </RadioGroup>
        {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country *</Label>
        <Select value={formData.country} onValueChange={(value) => updateField('country', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
      </div>
    </>
  );
}
