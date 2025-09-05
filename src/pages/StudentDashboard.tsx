import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CredentialCard } from "@/components/shared/CredentialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Plus, QrCode } from "lucide-react";
import { mockUser, mockCredentials } from "@/data/mockData";
import { QRCodeSVG } from "qrcode.react";

export default function StudentDashboard() {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const shareLink = `https://skillpassport.app/verify/${mockUser.name.replace(' ', '-').toLowerCase()}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header user={mockUser} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={mockUser.photo} alt={mockUser.name} />
                  <AvatarFallback className="text-xl">
                    {mockUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{mockUser.name}</h1>
                  <p className="text-muted-foreground mb-4">{mockUser.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge className="bg-success-light text-success border-success">
                      Trust Score: {mockUser.trustScore}/100
                    </Badge>
                    <Badge variant="outline">{mockUser.university}</Badge>
                    <Badge variant="outline">Class of {mockUser.graduationYear}</Badge>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Credential</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credentials Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">My Credentials</h2>
            <Button variant="outline" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New</span>
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCredentials.map((credential) => (
              <CredentialCard 
                key={credential.id} 
                credential={credential}
                onClick={() => {
                  // Handle credential click
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Credentials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockCredentials.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {mockCredentials.filter(c => c.status === "verified").length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Trust Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockUser.trustScore}/100</div>
            </CardContent>
          </Card>
        </div>

        {/* Share Passport CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-teal/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Ready to share your credentials?
            </h3>
            <p className="text-muted-foreground mb-4">
              Generate a secure QR code or link to share your verified skills with employers.
            </p>
            
            <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Share My Passport</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <QrCode className="w-5 h-5" />
                    <span>Share Your Skill Passport</span>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="flex flex-col items-center space-y-4 py-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <QRCodeSVG value={shareLink} size={200} />
                  </div>
                  
                  <div className="w-full">
                    <label className="text-sm font-medium text-muted-foreground">Share Link:</label>
                    <div className="flex mt-1">
                      <input
                        type="text"
                        value={shareLink}
                        readOnly
                        className="flex-1 px-3 py-2 text-sm border border-input rounded-l-md bg-muted"
                      />
                      <Button 
                        variant="outline" 
                        className="rounded-l-none"
                        onClick={() => navigator.clipboard.writeText(shareLink)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}