"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-primary/10 p-3 sm:p-4 rounded-full">
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance px-2">
            AI Readiness Check
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-2 px-2">
            5 Minute Assessment for Small Businesses
          </p>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Discover your AI maturity level, identify quick wins, and get a personalized roadmap 
            for leveraging AI in your business.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card>
            <CardHeader>
              <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-2" />
              <CardTitle className="text-base sm:text-lg">Quick & Easy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Complete in just 5 minutes with mostly multiple choice questions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-2" />
              <CardTitle className="text-base sm:text-lg">Actionable Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get 3 personalized quick wins tailored to your business needs
              </p>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 md:col-span-1">
            <CardHeader>
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-2" />
              <CardTitle className="text-base sm:text-lg">Consultant-Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receive a comprehensive brief perfect for AI consultants
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">What You'll Receive</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              After completing the assessment, you'll get:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base"><strong>AI Maturity Score</strong> - See where you stand (0-18 scale)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base"><strong>Segment Classification</strong> - Starter, Explorer, Implementer, or Scaler</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base"><strong>3 Quick Wins</strong> - Practical AI opportunities for your lowest-scoring areas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base"><strong>Consultant Brief</strong> - Comprehensive summary ready to share with advisors</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base"><strong>Downloadable Results</strong> - Export your data as JSON for your records</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center px-4">
          <Link href="/assessment">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto">
              Start Assessment
              <Brain className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
            No signup required • Results available immediately
          </p>
        </div>
      </div>
    </div>
  );
}
