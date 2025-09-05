import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText, Clock, User, Shield } from "lucide-react";
import { mockUser } from "@/data/mockData";

export default function FlaggedCredential() {
  const flaggedCredential = {
    id: "3",
    title: "HackTech 2024 Winner",
    issuer: "TechCorp",
    type: "hackathon",
    status: "flagged",
    date: "January 2024",
    flagReason: "Authorship mismatch detected",
    flaggedBy: "AI Verification System",
    flaggedDate: "March 15, 2024",
    evidence: [
      "Code submission differs significantly from candidate's GitHub profile style",
      "Timeline inconsistency with candidate's reported availability",
      "Project dependencies not reflected in candidate's other work"
    ]
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header user={mockUser} />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Flagged Credential Review</h1>
          <p className="text-muted-foreground">
            This credential has been flagged for review. Please examine the evidence and take appropriate action.
          </p>
        </div>

        {/* Flagged Credential Card */}
        <Card className="mb-8 border-warning bg-warning-light/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-warning-light rounded-lg">
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-xl font-bold text-foreground">{flaggedCredential.title}</h2>
                  <Badge className="bg-warning text-warning-foreground">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Flagged
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-1">Issued by: {flaggedCredential.issuer}</p>
                <p className="text-muted-foreground mb-4">Date: {flaggedCredential.date}</p>
                
                <div className="bg-warning-light/30 border border-warning/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
                    Flag Reason
                  </h3>
                  <p className="text-foreground">{flaggedCredential.flagReason}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flag Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Flag Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Flagged By</label>
                <p className="text-foreground">{flaggedCredential.flaggedBy}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Flag Date</label>
                <p className="text-foreground">{flaggedCredential.flaggedDate}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Verification Status</label>
                <Badge variant="outline" className="border-warning text-warning">
                  Under Review
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Candidate Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-foreground">{mockUser.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{mockUser.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Current Trust Score</label>
                <Badge className="bg-warning-light text-warning border-warning">
                  {mockUser.trustScore}/100 (Affected by flag)
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evidence Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Evidence Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                The following evidence was collected during the automated verification process:
              </p>
              
              <div className="space-y-3">
                {flaggedCredential.evidence.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 bg-warning-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-warning">{index + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-destructive/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Review Evidence</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Access detailed evidence files, verification logs, and comparison data.
              </p>
              <Button className="w-full flex items-center justify-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>View Detailed Evidence</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-success/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Dismiss Flag</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If evidence is insufficient, dismiss the flag and restore the credential.
              </p>
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Dismiss Flag</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Impact Notice */}
        <Card className="border-warning/20 bg-warning-light/10">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Impact of This Flag</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Candidate's trust score has been temporarily reduced</li>
                  <li>• This credential is excluded from verification reports</li>
                  <li>• Candidate has been notified of the flag and can submit an appeal</li>
                  <li>• All verification attempts will show this credential as under review</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}