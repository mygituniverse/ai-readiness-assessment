import { QuickWin } from '@/lib/types/assessment';

const quickWinsByDepartment: Record<string, QuickWin[]> = {
  customerService: [
    {
      title: 'Website AI Chat Assistant',
      description: 'Deploy an AI-powered chatbot to handle common customer queries 24/7, reducing response times and freeing up your team.',
      department: 'Customer Service',
    },
    {
      title: 'FAQ Knowledge Bot',
      description: 'Create an intelligent FAQ system that learns from customer interactions and provides instant, accurate answers.',
      department: 'Customer Service',
    },
    {
      title: 'Missed-Call Text-Back Automation',
      description: 'Automatically send personalized SMS responses to missed calls with relevant information and callback options.',
      department: 'Customer Service',
    },
  ],
  sales: [
    {
      title: 'Lead Capture → CRM Automation',
      description: 'Automatically capture leads from all sources and sync them to your CRM with enriched data and lead scoring.',
      department: 'Sales',
    },
    {
      title: 'Auto Follow-Ups',
      description: 'Set up intelligent follow-up sequences that adapt based on prospect behavior and engagement.',
      department: 'Sales',
    },
    {
      title: 'AI Proposal Drafts',
      description: 'Generate customized proposal drafts in minutes using AI, based on your templates and client requirements.',
      department: 'Sales',
    },
  ],
  marketing: [
    {
      title: 'Content Repurposing Workflow',
      description: 'Transform one piece of content into multiple formats (blog → social posts → email → video script) automatically.',
      department: 'Marketing',
    },
    {
      title: 'Social Scheduling Automation',
      description: 'AI-powered social media scheduler that suggests optimal posting times and generates engaging captions.',
      department: 'Marketing',
    },
    {
      title: 'AI Ad & Email Drafts',
      description: 'Generate high-converting ad copy and email campaigns using AI trained on your brand voice and past performance.',
      department: 'Marketing',
    },
  ],
  operations: [
    {
      title: 'SOP Assistant',
      description: 'AI-powered assistant that helps staff quickly find and follow standard operating procedures with step-by-step guidance.',
      department: 'Operations',
    },
    {
      title: 'Automated Status Updates',
      description: 'Keep clients and team members informed with automated project status updates based on real-time data.',
      department: 'Operations',
    },
    {
      title: 'Template Document Generator',
      description: 'Generate customized documents (contracts, reports, forms) from templates with AI-powered data population.',
      department: 'Operations',
    },
  ],
  finance: [
    {
      title: 'Invoice Chasing Automation',
      description: 'Automatically send payment reminders with escalating urgency, tracking responses and updating your system.',
      department: 'Finance',
    },
    {
      title: 'Expense Capture AI',
      description: 'Snap photos of receipts and let AI extract, categorize, and log expenses automatically into your accounting system.',
      department: 'Finance',
    },
    {
      title: 'Document Extraction Automation',
      description: 'Automatically extract key data from invoices, receipts, and financial documents into your accounting software.',
      department: 'Finance',
    },
  ],
  hr: [
    {
      title: 'AI Job Ad Generator',
      description: 'Create compelling, inclusive job descriptions optimized for your target candidates in minutes.',
      department: 'HR',
    },
    {
      title: 'Screening Question Automation',
      description: 'Automatically screen candidates with AI-powered questionnaires that assess fit and qualifications.',
      department: 'HR',
    },
    {
      title: 'Onboarding Checklist Assistant',
      description: 'Automated onboarding workflows that guide new hires through tasks, documents, and training with AI support.',
      department: 'HR',
    },
  ],
};

export function generateQuickWins(lowestDepartments: string[]): QuickWin[] {
  const wins: QuickWin[] = [];
  
  for (const dept of lowestDepartments) {
    const deptWins = quickWinsByDepartment[dept] || [];
    wins.push(...deptWins);
  }
  
  return wins.slice(0, 3);
}
