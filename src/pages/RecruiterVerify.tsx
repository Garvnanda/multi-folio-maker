import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, QrCode, Download, CheckCircle, Shield, Github, Award, Code } from "lucide-react";
import { mockUser, mockCredentials } from "@/data/mockData";

export default function RecruiterVerify() {
  const [searchInput, setSearchInput] = useState("");
  const [candidateFound, setCandidateFound] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setCandidateFound(true);
    }
  };

  const handleScanQR = () => {
    setIsScanning(true);
    // Simulate QR scanning
    setTimeout(() => {
      setIsScanning(false);
      setCandidateFound(true);
    }, 2000);
  };

  const verifiedCredentials = mockCredentials.filter(c => c.status === "verified");

  const getIcon = (type: string) => {
    switch (type) {
      case "github": return Github;
      case "coursera": return Award;
      case "hackathon": return Code;
      default: return Award;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify Candidate Credentials</h1>
          <p className="text-muted-foreground">
            Enter a candidate's Skill Passport ID or scan their QR code to verify their credentials.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter Skill Passport ID or URL..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} className="flex items-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>Verify</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleScanQR}
                  disabled={isScanning}
                  className="flex items-center space-x-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{isScanning ? "Scanning..." : "Scan QR Code"}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Scanner Simulation */}
        {isScanning && (
          <Card className="mb-8 border-primary">
            <CardContent className="p-8 text-center">
              <div className="w-64 h-64 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="animate-pulse">
                  <QrCode className="w-16 h-16 text-primary" />
                </div>
              </div>
              <p className="text-lg font-medium text-foreground">Scanning QR Code...</p>
              <p className="text-sm text-muted-foreground">Point your camera at the QR code</p>
            </CardContent>
          </Card>
        )}

        {/* Candidate Result */}
        {candidateFound && (
          <div className="space-y-6">
            {/* Candidate Header */}
            <Card className="border-success bg-success-light/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <span className="text-lg font-semibold text-foreground">Candidate Verified</span>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mockUser.photo} alt={mockUser.name} />
                    <AvatarFallback className="text-xl">
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{mockUser.name}</h2>
                    <p className="text-muted-foreground mb-3">{mockUser.email}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <Badge className="bg-success text-success-foreground">
                        <Shield className="w-3 h-3 mr-1" />
                        Trust Score: {mockUser.trustScore}/100
                      </Badge>
                      <Badge variant="outline">{mockUser.university}</Badge>
                      <Badge variant="outline">Class of {mockUser.graduationYear}</Badge>
                    </div>
                    
                    {/* Top Skills */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Top 3 Verified Skills:</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <Badge className="bg-primary text-primary-foreground">React</Badge>
                        <Badge className="bg-primary text-primary-foreground">Node.js</Badge>
                        <Badge className="bg-primary text-primary-foreground">AWS</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credential Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Verified Credentials Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verifiedCredentials.map((credential, index) => {
                    const Icon = getIcon(credential.type);
                    return (
                      <div key={credential.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg bg-muted/30">
                        <div className="p-2 bg-background rounded-lg border">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{credential.title}</h4>
                          <p className="text-sm text-muted-foreground">{credential.issuer}</p>
                          <p className="text-xs text-muted-foreground">{credential.date}</p>
                        </div>
                        
                        <Badge className="bg-success-light text-success border-success">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <Card className="flex-1">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">Download Full Report</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get a comprehensive PDF report with all verified credentials and verification timestamps.
                  </p>
                  <Button className="w-full flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="flex-1">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">Mark as Verified</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Confirm that you've verified this candidate's credentials for your records.
                  </p>
                  <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Verified</span>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Verification Details */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Verification Details</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Verified on:</span>
                        <span className="ml-2 text-foreground">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Verification ID:</span>
                        <span className="ml-2 text-foreground font-mono">VRF-{Date.now()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Blockchain Hash:</span>
                        <span className="ml-2 text-foreground font-mono">0x742d35cc...89bd2</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span className="ml-2 text-foreground">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}