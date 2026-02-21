"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, Download, Copy, RotateCcw, CheckCircle2, Lightbulb, TrendingUp, FileText } from 'lucide-react';
import { AssessmentSubmission, QuickWin } from '@/lib/types/assessment';
import { getLowestScoringDepartments } from '@/lib/assessment/scoring';
import { generateQuickWins } from '@/lib/assessment/quickWins';
import { generateConsultantBrief } from '@/lib/assessment/consultantBrief';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

export default function ResultsPage() {
  const router = useRouter();
  const [submission, setSubmission] = useState<AssessmentSubmission | null>(null);
  const [quickWins, setQuickWins] = useState<QuickWin[]>([]);
  const [consultantBrief, setConsultantBrief] = useState('');
  const [showFullBrief, setShowFullBrief] = useState(false);

  useEffect(() => {
    const loadAssessment = async () => {
      const assessmentId = localStorage.getItem('currentAssessmentId');
      
      if (assessmentId) {
        // Load from Supabase
        const supabase = createClient();
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', assessmentId)
          .single();

        if (error || !data) {
          console.error('Error loading assessment:', error);
          router.push('/assessment');
          return;
        }

        // Convert database format to AssessmentSubmission format
        const assessmentData: AssessmentSubmission = {
          timestamp: data.timestamp,
          companyName: data.company_name,
          industry: data.industry,
          employees: data.employees,
          role: data.role,
          country: data.country,
          goals: data.goals,
          timeWasters: data.time_wasters,
          aiUsageLevel: data.ai_usage_level,
          aiTools: data.ai_tools,
          otherAiTools: data.other_ai_tools,
          aiUsers: data.ai_users,
          departmentScores: data.department_scores,
          automatedProcesses: data.automated_processes,
          dataStorage: data.data_storage,
          coreSystems: data.core_systems,
          aiPolicy: data.ai_policy,
          dataTypes: data.data_types,
          biggestConcern: data.biggest_concern,
          email: data.email,
          wantsCall: data.wants_call,
          comments: data.comments,
          maturityScore: data.maturity_score,
          segment: data.segment,
        };

        setSubmission(assessmentData);

        const lowestDepts = getLowestScoringDepartments(assessmentData.departmentScores);
        const wins = generateQuickWins(lowestDepts);
        setQuickWins(wins);

        const brief = generateConsultantBrief(assessmentData);
        setConsultantBrief(brief);
      } else {
        // Fallback to localStorage
        const storedData = localStorage.getItem('assessmentSubmission');
        if (!storedData) {
          router.push('/assessment');
          return;
        }

        const data: AssessmentSubmission = JSON.parse(storedData);
        setSubmission(data);

        const lowestDepts = getLowestScoringDepartments(data.departmentScores);
        const wins = generateQuickWins(lowestDepts);
        setQuickWins(wins);

        const brief = generateConsultantBrief(data);
        setConsultantBrief(brief);
      }
    };

    loadAssessment();
  }, [router]);

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(consultantBrief);
      toast.success('Consultant brief copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(submission, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-readiness-assessment-${submission?.companyName?.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Assessment data downloaded!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRestart = () => {
    localStorage.removeItem('assessmentSubmission');
    localStorage.removeItem('currentAssessmentId');
    router.push('/');
  };

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Starter': return 'bg-blue-500';
      case 'Explorer': return 'bg-green-500';
      case 'Implementer': return 'bg-orange-500';
      case 'Scaler': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getSegmentDescription = (segment: string) => {
    switch (segment) {
      case 'Starter':
        return 'You\'re at the beginning of your AI journey. Focus on quick wins and building foundational knowledge.';
      case 'Explorer':
        return 'You\'re experimenting with AI tools. Time to identify high-impact use cases and scale what works.';
      case 'Implementer':
        return 'You\'re actively implementing AI across departments. Focus on integration and measuring ROI.';
      case 'Scaler':
        return 'You\'re an AI leader! Focus on optimization, advanced use cases, and sharing best practices.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-primary/10 p-3 sm:p-4 rounded-full">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 px-2">Assessment Complete!</h1>
          <p className="text-sm sm:text-base text-muted-foreground px-2">Here are your personalized AI readiness insights</p>
        </div>

        {/* Score Card */}
        <Card className="mb-6 sm:mb-8 border-2">
          <CardHeader className="text-center pb-3 sm:pb-4">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className={`${getSegmentColor(submission.segment!)} text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-lg`}>
                {submission.segment}
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl px-2">AI Maturity Score: {submission.maturityScore}/18</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-2 px-2">
              {getSegmentDescription(submission.segment!)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
              <div className="py-2 sm:py-0">
                <p className="text-sm text-muted-foreground mb-1">Company</p>
                <p className="font-semibold break-words">{submission.companyName}</p>
              </div>
              <div className="py-2 sm:py-0">
                <p className="text-sm text-muted-foreground mb-1">Industry</p>
                <p className="font-semibold">{submission.industry}</p>
              </div>
              <div className="py-2 sm:py-0">
                <p className="text-sm text-muted-foreground mb-1">Team Size</p>
                <p className="font-semibold">{submission.employees} employees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals & Tools Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                Your Top Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {submission.goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                AI Tools in Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submission.aiTools.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {submission.aiTools.slice(0, 8).map((tool, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs sm:text-sm">{tool}</Badge>
                  ))}
                  {submission.aiTools.length > 8 && (
                    <Badge variant="outline" className="text-xs sm:text-sm">+{submission.aiTools.length - 8} more</Badge>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No AI tools currently in use</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Wins */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
              Your 3 Quick Wins
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Based on your assessment, here are the highest-impact AI opportunities for your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {quickWins.map((win, idx) => (
                <div key={idx} className="border-l-4 border-accent pl-3 sm:pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-2">
                    <Badge variant="outline" className="text-xs sm:text-sm w-fit">{win.department}</Badge>
                    <h3 className="font-semibold text-base sm:text-lg">{win.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground">{win.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Consultant Brief */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Consultant Brief</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              A comprehensive summary of your assessment, ready to share with AI consultants or advisors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted/50 rounded-lg p-3 sm:p-4 mb-4">
              <pre className={`text-xs sm:text-sm font-mono whitespace-pre-wrap overflow-x-auto ${showFullBrief ? '' : 'max-h-48 sm:max-h-64 overflow-hidden'}`}>
                {consultantBrief}
              </pre>
              {!showFullBrief && (
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFullBrief(!showFullBrief)}
                className="w-full sm:w-auto"
              >
                {showFullBrief ? 'Show Less' : 'Show Full Brief'}
              </Button>
              <Button variant="outline" onClick={handleCopyBrief} className="w-full sm:w-auto">
                <Copy className="mr-2 w-4 h-4" />
                Copy Brief
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button size="lg" onClick={handlePrint} className="w-full sm:w-auto">
            <FileText className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Print as PDF
          </Button>
          <Button size="lg" variant="outline" onClick={handleDownloadJSON} className="w-full sm:w-auto">
            <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Download JSON
          </Button>
          <Button size="lg" variant="outline" onClick={handleRestart} className="w-full sm:w-auto">
            <RotateCcw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Start New Assessment
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground px-2">
          <p>Your results have been saved locally in your browser.</p>
          <p className="mt-1">Download the JSON file to keep a permanent copy.</p>
        </div>
      </div>
    </div>
  );
}
