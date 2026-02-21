export interface AssessmentSubmission {
  timestamp: string;
  companyName: string;
  industry: string;
  employees: string;
  role: string;
  country: string;
  goals: string[];
  timeWasters: string[];
  aiUsageLevel: string;
  aiTools: string[];
  otherAiTools: string;
  aiUsers: string[];
  departmentScores: {
    customerService: number;
    sales: number;
    marketing: number;
    operations: number;
    finance: number;
    hr: number;
  };
  automatedProcesses?: string[];
  dataStorage: string;
  coreSystems: string[];
  aiPolicy: string;
  dataTypes: string[];
  biggestConcern: string;
  email: string;
  wantsCall: boolean;
  comments: string;
  maturityScore?: number;
  segment?: string;
}

export type Segment = 'Starter' | 'Explorer' | 'Implementer' | 'Scaler';

export interface QuickWin {
  title: string;
  description: string;
  department: string;
}
