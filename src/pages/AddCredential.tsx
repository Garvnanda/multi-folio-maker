import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Github, Award, Upload, FileText, Calendar, Building } from "lucide-react";
import { mockUser } from "@/data/mockData";

export default function AddCredential() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState({
    title: "",
    issuer: "",
    date: "",
    skills: [] as string[],
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate extraction
      setExtractedData({
        title: "AWS Cloud Practitioner Certification",
        issuer: "Amazon Web Services",
        date: "December 2023",
        skills: ["AWS", "Cloud Computing", "DevOps", "Security"],
      });
    }
  };

  const handleConnect = (platform: string) => {
    // Simulate OAuth connection
    alert(`Connecting to ${platform}... (OAuth simulation)`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header user={mockUser} />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Add New Credential</h1>
          <p className="text-muted-foreground">
            Connect your accounts or upload certificates to add verified credentials to your passport.
          </p>
        </div>

        <Tabs defaultValue="connect" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connect">Connect Account</TabsTrigger>
            <TabsTrigger value="upload">Upload Certificate</TabsTrigger>
          </TabsList>

          <TabsContent value="connect" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Connect Learning Platforms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-20 flex flex-col items-center space-y-2"
                    onClick={() => handleConnect("GitHub")}
                  >
                    <Github className="w-8 h-8" />
                    <span>Connect GitHub</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-20 flex flex-col items-center space-y-2"
                    onClick={() => handleConnect("Coursera")}
                  >
                    <Award className="w-8 h-8" />
                    <span>Connect Coursera</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-20 flex flex-col items-center space-y-2"
                    onClick={() => handleConnect("LinkedIn Learning")}
                  >
                    <Award className="w-8 h-8" />
                    <span>LinkedIn Learning</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-20 flex flex-col items-center space-y-2"
                    onClick={() => handleConnect("Udemy")}
                  >
                    <Award className="w-8 h-8" />
                    <span>Connect Udemy</span>
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    We'll securely access your public course completions and projects. Your login credentials are never stored.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload Certificate</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      Drop your certificate here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, JPG, PNG (Max 10MB)
                    </p>
                  </label>
                </div>

                {/* Extracted Data Preview */}
                {uploadedFile && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg">Extracted Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="title">Certificate Title</Label>
                          <Input
                            id="title"
                            value={extractedData.title}
                            onChange={(e) => setExtractedData({...extractedData, title: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="issuer">Issuing Organization</Label>
                          <Input
                            id="issuer"
                            value={extractedData.issuer}
                            onChange={(e) => setExtractedData({...extractedData, issuer: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="date">Issue Date</Label>
                          <Input
                            id="date"
                            value={extractedData.date}
                            onChange={(e) => setExtractedData({...extractedData, date: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label>File</Label>
                          <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm truncate">{uploadedFile.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Detected Skills</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {extractedData.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-4">
                        <Button className="flex-1">
                          Confirm & Save Credential
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setUploadedFile(null);
                            setExtractedData({ title: "", issuer: "", date: "", skills: [] });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Manual Entry Option */}
            <Card>
              <CardHeader>
                <CardTitle>Or Enter Manually</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="manual-title">Certificate Title</Label>
                    <Input id="manual-title" placeholder="e.g., AWS Cloud Practitioner" />
                  </div>
                  
                  <div>
                    <Label htmlFor="manual-issuer">Issuing Organization</Label>
                    <Input id="manual-issuer" placeholder="e.g., Amazon Web Services" />
                  </div>
                  
                  <div>
                    <Label htmlFor="manual-date">Issue Date</Label>
                    <Input id="manual-date" type="date" />
                  </div>
                  
                  <div>
                    <Label htmlFor="manual-url">Certificate URL (optional)</Label>
                    <Input id="manual-url" placeholder="https://..." />
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Add Credential Manually
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}