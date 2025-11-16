"use client";

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Award, Lock } from 'lucide-react';
import { cn } from "@/lib/utils";
import Logo from '@/components/shared/Logo';

interface CertificateProps {
  userName: string;
  courseName: string;
  completionDate: string;
  isUnlocked: boolean;
}

const Certificate: React.FC<CertificateProps> = ({ userName, courseName, completionDate, isUnlocked }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const element = certificateRef.current;
    if (!element) return;
    
    // This is a placeholder for a proper image/pdf generation library
    // In a real app, you would use a library like html2canvas and jspdf
    alert("Downloading certificate... (feature in development)");
  };

  if (!isUnlocked) {
    return (
        <Card className="w-full max-w-2xl mx-auto border-dashed border-2 flex flex-col items-center justify-center h-80 bg-muted">
            <Lock className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground">Certificate Locked</h3>
            <p className="text-muted-foreground">Complete all modules to unlock your certificate.</p>
        </Card>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
        <Card>
            <CardContent className="p-0">
                <div ref={certificateRef} className="p-8 bg-background rounded-t-lg border-b-4 border-primary">
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-2">
                           <Logo />
                        </div>
                        <h1 className="text-3xl font-bold text-primary">Certificate of Completion</h1>
                        <p className="text-muted-foreground">This certificate is awarded to</p>
                    </div>

                    <div className="text-center my-8">
                        <h2 className="text-4xl font-extrabold tracking-tight text-foreground">{userName}</h2>
                        <div className="w-48 h-px bg-border mx-auto my-4"></div>
                        <p className="text-muted-foreground">For successfully completing the course</p>
                        <h3 className="text-2xl font-semibold mt-2">{courseName}</h3>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <div>
                            <p className="font-bold">Date of Completion</p>
                            <p className="text-muted-foreground">{completionDate}</p>
                        </div>
                         <Award className="w-20 h-20 text-primary/50" />
                        <div>
                            <p className="font-bold text-right">EcoGov Platform</p>
                            <p className="text-muted-foreground text-right">National Waste Governance</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <div className="mt-6 text-center">
            <Button onClick={handleDownload} disabled={!isUnlocked}>
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
            </Button>
        </div>
    </div>
  );
};

export default Certificate;
