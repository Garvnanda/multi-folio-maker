import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Share2, Shield, CheckCircle } from "lucide-react";
import { mockUser, mockCredentials, mockSkills } from "@/data/mockData";
import { QRCodeSVG } from "qrcode.react";

export default function DigitalPassport() {
  const verifiedCredentials = mockCredentials.filter(c => c.status === "verified");
  const passportUrl = `https://skillpassport.app/verify/${mockUser.name.replace(' ', '-').toLowerCase()}`;

  const handleDownloadPDF = () => {
    // Simulate PDF download
    alert("Generating PDF passport... (Simulation)");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${mockUser.name}'s Skill Passport`,
        text: "Check out my verified digital credentials!",
        url: passportUrl,
      });
    } else {
      navigator.clipboard.writeText(passportUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header user={mockUser} />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Digital Skill Passport</h1>
          <p className="text-muted-foreground">
            Your verified digital credentials in a secure, shareable format.
          </p>
        </div>

        {/* Digital ID Card */}
        <Card className="mb-8 overflow-hidden bg-gradient-to-br from-primary/5 to-teal/5 border-primary/20">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Left: Profile Info */}
              <div className="text-center md:text-left space-y-4">
                <Avatar className="w-32 h-32 mx-auto md:mx-0 border-4 border-primary/20">
                  <AvatarImage src={mockUser.photo} alt={mockUser.name} />
                  <AvatarFallback className="text-2xl">
                    {mockUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{mockUser.name}</h2>
                  <p className="text-muted-foreground">{mockUser.email}</p>
                  <p className="text-sm text-muted-foreground">{mockUser.university}</p>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Badge className="bg-success-light text-success border-success">
                    <Shield className="w-3 h-3 mr-1" />
                    Trust Score: {mockUser.trustScore}/100
                  </Badge>
                  <Badge variant="outline">
                    {verifiedCredentials.length} Verified Credentials
                  </Badge>
                </div>
              </div>

              {/* Center: QR Code */}
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <QRCodeSVG 
                    value={passportUrl} 
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="M"
                  />
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Scan to verify credentials
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="space-y-3">
                <Button 
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleShare}
                  className="w-full flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Passport</span>
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verified Skills */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-success" />
              Verified Skills
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {mockSkills.map((skill, index) => (
                <Badge 
                  key={index}
                  className="bg-success-light text-success border-success px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Credential Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Verified Credentials ({verifiedCredentials.length})
            </h3>
            
            <div className="space-y-4">
              {verifiedCredentials.map((credential) => (
                <div 
                  key={credential.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30"
                >
                  <div>
                    <h4 className="font-semibold text-foreground">{credential.title}</h4>
                    <p className="text-sm text-muted-foreground">{credential.issuer}</p>
                    <p className="text-xs text-muted-foreground">{credential.date}</p>
                  </div>
                  
                  <Badge className="bg-success-light text-success border-success">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Security & Verification</h4>
                <p className="text-sm text-muted-foreground">
                  This digital passport is secured with blockchain technology and can be instantly verified 
                  by scanning the QR code or visiting the verification link. All credentials have been 
                  authenticated through our verification system.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}