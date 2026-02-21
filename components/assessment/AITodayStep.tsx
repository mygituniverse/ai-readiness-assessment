import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AssessmentSubmission } from '@/lib/types/assessment';

interface AITodayStepProps {
  formData: Partial<AssessmentSubmission>;
  errors: Record<string, string>;
  updateField: (field: string, value: any) => void;
  toggleArrayItem: (field: string, value: string, maxItems?: number) => void;
}

export function AITodayStep({ formData, errors, updateField, toggleArrayItem }: AITodayStepProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Are you using AI in the business today? *</Label>
        <RadioGroup value={formData.aiUsageLevel} onValueChange={(value) => updateField('aiUsageLevel', value)}>
          {['Not at all', 'Tried it', 'Using weekly', 'Using daily', 'Built into tools we pay for'].map(level => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={`level-${level}`} />
              <Label htmlFor={`level-${level}`} className="text-sm sm:text-base font-normal cursor-pointer">{level}</Label>
            </div>
          ))}
        </RadioGroup>
        {errors.aiUsageLevel && <p className="text-sm text-destructive">{errors.aiUsageLevel}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Which AI solutions do you currently use?</Label>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">General AI</p>
            <div className="space-y-2 ml-4">
              {['ChatGPT', 'Microsoft Copilot', 'Google Gemini', 'Claude', 'Perplexity'].map(tool => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tool-${tool}`}
                    checked={formData.aiTools?.includes(tool)}
                    onCheckedChange={() => toggleArrayItem('aiTools', tool)}
                    disabled={formData.aiTools?.includes('None yet')}
                  />
                  <Label htmlFor={`tool-${tool}`} className="text-sm sm:text-base font-normal cursor-pointer">{tool}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Productivity & Meetings</p>
            <div className="space-y-2 ml-4">
              {['Otter.ai', 'Fireflies.ai', 'Zoom AI Companion', 'Notion AI', 'Grammarly'].map(tool => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tool-${tool}`}
                    checked={formData.aiTools?.includes(tool)}
                    onCheckedChange={() => toggleArrayItem('aiTools', tool)}
                    disabled={formData.aiTools?.includes('None yet')}
                  />
                  <Label htmlFor={`tool-${tool}`} className="font-normal cursor-pointer">{tool}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Design & Content</p>
            <div className="space-y-2 ml-4">
              {['Canva AI', 'Adobe Firefly', 'Midjourney', 'DALL·E', 'Runway'].map(tool => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tool-${tool}`}
                    checked={formData.aiTools?.includes(tool)}
                    onCheckedChange={() => toggleArrayItem('aiTools', tool)}
                    disabled={formData.aiTools?.includes('None yet')}
                  />
                  <Label htmlFor={`tool-${tool}`} className="font-normal cursor-pointer">{tool}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Video & Avatars</p>
            <div className="space-y-2 ml-4">
              {['HeyGen', 'Synthesia', 'Descript', 'CapCut (AI)'].map(tool => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tool-${tool}`}
                    checked={formData.aiTools?.includes(tool)}
                    onCheckedChange={() => toggleArrayItem('aiTools', tool)}
                    disabled={formData.aiTools?.includes('None yet')}
                  />
                  <Label htmlFor={`tool-${tool}`} className="font-normal cursor-pointer">{tool}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Voice</p>
            <div className="space-y-2 ml-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tool-ElevenLabs"
                  checked={formData.aiTools?.includes('ElevenLabs')}
                  onCheckedChange={() => toggleArrayItem('aiTools', 'ElevenLabs')}
                  disabled={formData.aiTools?.includes('None yet')}
                />
                <Label htmlFor="tool-ElevenLabs" className="font-normal cursor-pointer">ElevenLabs</Label>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Customer Support & CRM</p>
            <div className="space-y-2 ml-4">
              {['Intercom AI', 'Zendesk AI', 'HubSpot AI'].map(tool => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tool-${tool}`}
                    checked={formData.aiTools?.includes(tool)}
                    onCheckedChange={() => toggleArrayItem('aiTools', tool)}
                    disabled={formData.aiTools?.includes('None yet')}
                  />
                  <Label htmlFor={`tool-${tool}`} className="font-normal cursor-pointer">{tool}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Automation</p>
            <div className="space-y-2 ml-4">
              {['Zapier', 'Make.com', 'n8n'].map(tool => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tool-${tool}`}
                    checked={formData.aiTools?.includes(tool)}
                    onCheckedChange={() => toggleArrayItem('aiTools', tool)}
                    disabled={formData.aiTools?.includes('None yet')}
                  />
                  <Label htmlFor={`tool-${tool}`} className="font-normal cursor-pointer">{tool}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Development</p>
            <div className="space-y-2 ml-4">
              {['GitHub Copilot', 'Cursor'].map(tool => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tool-${tool}`}
                    checked={formData.aiTools?.includes(tool)}
                    onCheckedChange={() => toggleArrayItem('aiTools', tool)}
                    disabled={formData.aiTools?.includes('None yet')}
                  />
                  <Label htmlFor={`tool-${tool}`} className="font-normal cursor-pointer">{tool}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2 border-t">
            <Checkbox
              id="tool-None"
              checked={formData.aiTools?.includes('None yet')}
              onCheckedChange={(checked) => {
                if (checked) {
                  updateField('aiTools', ['None yet']);
                } else {
                  updateField('aiTools', []);
                }
              }}
            />
            <Label htmlFor="tool-None" className="text-sm sm:text-base font-normal cursor-pointer">None yet</Label>
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="otherAiTools">Other AI solutions (optional)</Label>
          <Input
            id="otherAiTools"
            value={formData.otherAiTools}
            onChange={(e) => updateField('otherAiTools', e.target.value)}
            placeholder="List any other AI tools you use"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base">Who currently uses AI? *</Label>
        <div className="space-y-2">
          {['Owner / Leadership', 'Sales', 'Marketing', 'Customer Service', 'Finance', 'Operations', 'HR', 'IT', 'Nobody yet'].map(user => (
            <div key={user} className="flex items-center space-x-2">
              <Checkbox
                id={`user-${user}`}
                checked={formData.aiUsers?.includes(user)}
                onCheckedChange={() => toggleArrayItem('aiUsers', user)}
              />
              <Label htmlFor={`user-${user}`} className="text-sm sm:text-base font-normal cursor-pointer">{user}</Label>
            </div>
          ))}
        </div>
        {errors.aiUsers && <p className="text-sm text-destructive">{errors.aiUsers}</p>}
      </div>
    </>
  );
}
