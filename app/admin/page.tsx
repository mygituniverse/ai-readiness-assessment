"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Brain, Users, TrendingUp, BarChart3, Download, Eye } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import Link from 'next/link';

interface Assessment {
  id: string;
  created_at: string;
  company_name: string;
  industry: string;
  employees: string;
  email: string;
  maturity_score: number;
  segment: string;
  user_id: string;
}

interface Profile {
  id: string;
  email: string;
  is_admin: boolean;
}

interface Stats {
  totalAssessments: number;
  totalUsers: number;
  averageScore: number;
  segmentDistribution: Record<string, number>;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalAssessments: 0,
    totalUsers: 0,
    averageScore: 0,
    segmentDistribution: {},
  });

  useEffect(() => {
    const checkAdminAndLoadData = async () => {
      const supabase = createClient();
      
      // Check if user is admin
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login?redirect=/admin');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (profileError || !profile?.is_admin) {
        toast.error('Access denied. Admin privileges required.');
        router.push('/');
        return;
      }

      setIsAdmin(true);

      // Load assessments
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false });

      if (assessmentsError) {
        console.error('Error loading assessments:', assessmentsError);
        toast.error('Failed to load assessments');
      } else {
        setAssessments(assessmentsData || []);
        
        // Calculate stats
        const totalAssessments = assessmentsData?.length || 0;
        const averageScore = totalAssessments > 0
          ? assessmentsData.reduce((sum, a) => sum + (a.maturity_score || 0), 0) / totalAssessments
          : 0;
        
        const segmentDist: Record<string, number> = {};
        assessmentsData?.forEach(a => {
          if (a.segment) {
            segmentDist[a.segment] = (segmentDist[a.segment] || 0) + 1;
          }
        });

        // Get unique users count
        const uniqueUsers = new Set(assessmentsData?.map(a => a.user_id).filter(Boolean));

        setStats({
          totalAssessments,
          totalUsers: uniqueUsers.size,
          averageScore: Math.round(averageScore * 10) / 10,
          segmentDistribution: segmentDist,
        });
      }

      setLoading(false);
    };

    checkAdminAndLoadData();
  }, [router]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Company', 'Industry', 'Employees', 'Email', 'Score', 'Segment'];
    const rows = assessments.map(a => [
      new Date(a.created_at).toLocaleDateString(),
      a.company_name,
      a.industry,
      a.employees,
      a.email,
      a.maturity_score?.toString() || '',
      a.segment || '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessments-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully!');
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Starter': return 'bg-blue-500';
      case 'Explorer': return 'bg-green-500';
      case 'Implementer': return 'bg-orange-500';
      case 'Scaler': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor user assessments and activity</p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAssessments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}/18</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Common Segment</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.entries(stats.segmentDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segment Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Segment Distribution</CardTitle>
            <CardDescription>Breakdown of companies by AI maturity level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {Object.entries(stats.segmentDistribution).map(([segment, count]) => (
                <div key={segment} className="flex items-center gap-2">
                  <Badge className={getSegmentColor(segment)}>{segment}</Badge>
                  <span className="text-sm text-muted-foreground">{count} companies</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessments Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Assessments</CardTitle>
                <CardDescription>All user assessment submissions</CardDescription>
              </div>
              <Button onClick={handleExportCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Segment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No assessments yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    assessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell className="whitespace-nowrap">
                          {new Date(assessment.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">{assessment.company_name}</TableCell>
                        <TableCell>{assessment.industry}</TableCell>
                        <TableCell>{assessment.employees}</TableCell>
                        <TableCell>{assessment.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{assessment.maturity_score}/18</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSegmentColor(assessment.segment)}>
                            {assessment.segment}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
