import { AssessmentSubmission } from '@/lib/types/assessment';

export function generateConsultantBrief(submission: AssessmentSubmission): string {
  const departmentLabels: Record<string, string> = {
    customerService: 'Customer Service',
    sales: 'Sales',
    marketing: 'Marketing',
    operations: 'Operations / Delivery',
    finance: 'Finance / Admin',
    hr: 'HR / People',
  };

  const maturityLabels = ['Not using', 'Experimenting', 'Implemented', 'Embedded'];

  return `AI READINESS ASSESSMENT - CONSULTANT BRIEF
Generated: ${new Date(submission.timestamp).toLocaleString()}

═══════════════════════════════════════════════════════════

COMPANY PROFILE
───────────────────────────────────────────────────────────
Company Name: ${submission.companyName}
Industry: ${submission.industry}
Team Size: ${submission.employees} employees
Contact Role: ${submission.role}
Location: ${submission.country}
Email: ${submission.email}
Wants Follow-up Call: ${submission.wantsCall ? 'Yes' : 'No'}

═══════════════════════════════════════════════════════════

GOALS & PAIN POINTS
───────────────────────────────────────────────────────────
Top 2 Goals (Next 6 Months):
${submission.goals.map(g => `  • ${g}`).join('\n')}

Biggest Time-Wasters:
${submission.timeWasters.map(t => `  • ${t}`).join('\n')}

═══════════════════════════════════════════════════════════

AI USAGE OVERVIEW
───────────────────────────────────────────────────────────
Current AI Usage Level: ${submission.aiUsageLevel}

AI Tools Currently Used:
${submission.aiTools.length > 0 ? submission.aiTools.map(t => `  • ${t}`).join('\n') : '  • None'}
${submission.otherAiTools ? `\nOther Tools: ${submission.otherAiTools}` : ''}

Who Uses AI:
${submission.aiUsers.map(u => `  • ${u}`).join('\n')}

═══════════════════════════════════════════════════════════

AI MATURITY BY DEPARTMENT
───────────────────────────────────────────────────────────
Overall Maturity Score: ${submission.maturityScore}/18
Segment: ${submission.segment}

Department Breakdown:
${Object.entries(submission.departmentScores)
  .map(([dept, score]) => `  ${departmentLabels[dept]}: ${score} (${maturityLabels[score]})`)
  .join('\n')}
${
  submission.automatedProcesses && submission.automatedProcesses.length > 0
    ? `\nAutomated Processes:\n${submission.automatedProcesses.map(p => `  • ${p}`).join('\n')}`
    : ''
}

═══════════════════════════════════════════════════════════

TOOL STACK & DATA
───────────────────────────────────────────────────────────
Customer Data Storage: ${submission.dataStorage}

Core Systems:
${submission.coreSystems.map(s => `  • ${s}`).join('\n')}

═══════════════════════════════════════════════════════════

RISK & READINESS
───────────────────────────────────────────────────────────
AI Usage Policy: ${submission.aiPolicy}

Data Types Handled:
${submission.dataTypes.map(d => `  • ${d}`).join('\n')}

Biggest AI Concern: ${submission.biggestConcern}

═══════════════════════════════════════════════════════════

ADDITIONAL COMMENTS
───────────────────────────────────────────────────────────
${submission.comments || 'None provided'}

═══════════════════════════════════════════════════════════

RECOMMENDED NEXT STEPS
───────────────────────────────────────────────────────────
Based on this assessment, the recommended approach is to:

1. Address the lowest-scoring departments first (quick wins)
2. Establish clear AI usage guidelines if not already in place
3. Focus on automating the identified time-wasters
4. Align AI initiatives with the stated 6-month goals
5. Schedule a discovery call to discuss implementation roadmap

═══════════════════════════════════════════════════════════`;
}
