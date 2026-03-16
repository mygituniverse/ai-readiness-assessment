"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import Link from 'next/link';

interface SaveResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveResultsDialog({ open, onOpenChange }: SaveResultsDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-xl">
            <Save className="w-5 h-5 text-primary" />
            Save Your Results
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base space-y-3 pt-2">
            <p>
              Create a free account to permanently save your assessment results and unlock additional benefits:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Access your results from any device</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Track your AI maturity progress over time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Compare multiple assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Never lose your data</span>
              </li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto order-3 sm:order-1"
          >
            <X className="mr-2 w-4 h-4" />
            Maybe Later
          </Button>
          <Link href="/auth/login?redirect=/results" className="w-full sm:w-auto order-2">
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
          <Link href="/auth/sign-up?redirect=/results" className="w-full sm:w-auto order-1 sm:order-3">
            <Button className="w-full">
              Sign Up Free
            </Button>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
