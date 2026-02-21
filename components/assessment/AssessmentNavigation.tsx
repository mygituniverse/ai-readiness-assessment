import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AssessmentNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export function AssessmentNavigation({ 
  currentStep, 
  totalSteps, 
  onBack, 
  onNext 
}: AssessmentNavigationProps) {
  return (
    <div className="flex justify-between gap-3 mt-6 sm:mt-8">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 1}
        className="flex-1 sm:flex-initial"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back
      </Button>
      <Button onClick={onNext} className="flex-1 sm:flex-initial">
        {currentStep === totalSteps ? 'Complete Assessment' : 'Next'}
        {currentStep < totalSteps && <ArrowRight className="ml-2 w-4 h-4" />}
      </Button>
    </div>
  );
}
