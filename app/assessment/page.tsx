"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentSubmission } from '@/lib/types/assessment';
import { calculateMaturityScore, determineSegment } from '@/lib/assessment/scoring';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { AssessmentHeader } from '@/components/assessment/AssessmentHeader';
import { AssessmentNavigation } from '@/components/assessment/AssessmentNavigation';
import { CompanySnapshotStep } from '@/components/assessment/CompanySnapshotStep';
import { GoalsPainPointsStep } from '@/components/assessment/GoalsPainPointsStep';
import { AITodayStep } from '@/components/assessment/AITodayStep';
import { DepartmentMaturityStep } from '@/components/assessment/DepartmentMaturityStep';
import { DataSystemsStep } from '@/components/assessment/DataSystemsStep';
import { RiskReadinessStep } from '@/components/assessment/RiskReadinessStep';
import { ContactStep } from '@/components/assessment/ContactStep';

const TOTAL_STEPS = 7;

const STEP_TITLES = {
  1: 'Company Snapshot',
  2: 'Goals & Pain Points',
  3: 'AI Today',
  4: 'AI Maturity by Department',
  5: 'Data & Systems',
  6: 'Risk & Readiness',
  7: 'Contact Information',
};

const STEP_DESCRIPTIONS = {
  1: 'Tell us about your business',
  2: 'What are your priorities?',
  3: 'How are you using AI currently?',
  4: 'Rate AI adoption across departments',
  5: 'Where do you store and manage data?',
  6: 'Understanding your AI concerns',
  7: 'How can we reach you?',
};

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<AssessmentSubmission>>({
    companyName: '',
    industry: '',
    employees: '',
    role: '',
    country: '',
    goals: [],
    timeWasters: [],
    aiUsageLevel: '',
    aiTools: [],
    otherAiTools: '',
    aiUsers: [],
    departmentScores: {
      customerService: 0,
      sales: 0,
      marketing: 0,
      operations: 0,
      finance: 0,
      hr: 0,
    },
    automatedProcesses: [],
    dataStorage: '',
    coreSystems: [],
    aiPolicy: '',
    dataTypes: [],
    biggestConcern: '',
    email: '',
    wantsCall: false,
    comments: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id || null);
    });
  }, []);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const updateDepartmentScore = (dept: keyof AssessmentSubmission['departmentScores'], score: number) => {
    setFormData(prev => ({
      ...prev,
      departmentScores: {
        ...prev.departmentScores!,
        [dept]: score,
      },
    }));
  };

  const toggleArrayItem = (field: string, value: string, maxItems?: number) => {
    setFormData(prev => {
      const currentArray = (prev[field as keyof typeof prev] as string[]) || [];
      const isSelected = currentArray.includes(value);
      
      if (isSelected) {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      } else {
        if (maxItems && currentArray.length >= maxItems) {
          return prev;
        }
        return { ...prev, [field]: [...currentArray, value] };
      }
    });
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.companyName?.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.employees) newErrors.employees = 'Number of employees is required';
        if (!formData.role) newErrors.role = 'Your role is required';
        if (!formData.country) newErrors.country = 'Country is required';
        break;
      case 2:
        if (!formData.goals || formData.goals.length === 0) newErrors.goals = 'Select at least one goal';
        if (!formData.timeWasters || formData.timeWasters.length === 0) newErrors.timeWasters = 'Select at least one time-waster';
        break;
      case 3:
        if (!formData.aiUsageLevel) newErrors.aiUsageLevel = 'Please select your AI usage level';
        if (!formData.aiUsers || formData.aiUsers.length === 0) newErrors.aiUsers = 'Select who uses AI';
        break;
      case 7:
        if (!formData.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    const submission: AssessmentSubmission = {
      ...formData as AssessmentSubmission,
      timestamp: new Date().toISOString(),
    };

    const score = calculateMaturityScore(submission);
    const segment = determineSegment(score);
    
    submission.maturityScore = score;
    submission.segment = segment;

    if (userId) {
      // Save to Supabase
      const supabase = createClient();
      const { data, error } = await supabase
        .from('assessments')
        .insert({
          user_id: userId,
          company_name: submission.companyName,
          industry: submission.industry,
          employees: submission.employees,
          role: submission.role,
          country: submission.country,
          goals: submission.goals,
          time_wasters: submission.timeWasters,
          ai_usage_level: submission.aiUsageLevel,
          ai_tools: submission.aiTools,
          other_ai_tools: submission.otherAiTools,
          ai_users: submission.aiUsers,
          department_scores: submission.departmentScores,
          automated_processes: submission.automatedProcesses,
          data_storage: submission.dataStorage,
          core_systems: submission.coreSystems,
          ai_policy: submission.aiPolicy,
          data_types: submission.dataTypes,
          biggest_concern: submission.biggestConcern,
          email: submission.email,
          wants_call: submission.wantsCall,
          comments: submission.comments,
          maturity_score: submission.maturityScore,
          segment: submission.segment,
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving assessment:', error);
        toast.error('Failed to save assessment');
        return;
      }

      // Store assessment ID in localStorage for results page
      localStorage.setItem('currentAssessmentId', data.id);
      router.push('/results');
    } else {
      // Fallback to localStorage if not logged in
      localStorage.setItem('assessmentSubmission', JSON.stringify(submission));
      router.push('/results');
    }
  };

  const showAutomatedProcesses = !!(formData.departmentScores && 
    Object.values(formData.departmentScores).some(score => score >= 2));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanySnapshotStep formData={formData} errors={errors} updateField={updateField} />;
      case 2:
        return <GoalsPainPointsStep formData={formData} errors={errors} toggleArrayItem={toggleArrayItem} />;
      case 3:
        return <AITodayStep formData={formData} errors={errors} updateField={updateField} toggleArrayItem={toggleArrayItem} />;
      case 4:
        return <DepartmentMaturityStep formData={formData} updateDepartmentScore={updateDepartmentScore} toggleArrayItem={toggleArrayItem} showAutomatedProcesses={showAutomatedProcesses} />;
      case 5:
        return <DataSystemsStep formData={formData} updateField={updateField} toggleArrayItem={toggleArrayItem} />;
      case 6:
        return <RiskReadinessStep formData={formData} updateField={updateField} toggleArrayItem={toggleArrayItem} />;
      case 7:
        return <ContactStep formData={formData} errors={errors} updateField={updateField} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
        <AssessmentHeader currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">
              {STEP_TITLES[currentStep as keyof typeof STEP_TITLES]}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {STEP_DESCRIPTIONS[currentStep as keyof typeof STEP_DESCRIPTIONS]}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            {renderStep()}
          </CardContent>
        </Card>

        <AssessmentNavigation 
          currentStep={currentStep} 
          totalSteps={TOTAL_STEPS} 
          onBack={handleBack} 
          onNext={handleNext} 
        />
      </div>
    </div>
  );
}
