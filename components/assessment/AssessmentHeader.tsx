import { Brain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AssessmentHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export function AssessmentHeader({ currentStep, totalSteps }: AssessmentHeaderProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="bg-primary/10 p-2.5 sm:p-3 rounded-full">
            <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 px-2">AI Readiness Assessment</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Step {currentStep} of {totalSteps}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </>
  );
}
