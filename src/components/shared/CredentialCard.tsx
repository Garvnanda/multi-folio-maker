import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Github, Award, Code } from "lucide-react";

interface Credential {
  id: string;
  title: string;
  issuer: string;
  type: "github" | "coursera" | "hackathon" | "certificate";
  status: "verified" | "flagged" | "pending";
  date: string;
  logo?: string;
}

interface CredentialCardProps {
  credential: Credential;
  onClick?: () => void;
  className?: string;
}

const getIcon = (type: string) => {
  switch (type) {
    case "github":
      return Github;
    case "coursera":
      return Award;
    case "hackathon":
      return Code;
    default:
      return Award;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-success-light text-success border-success">
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      );
    case "flagged":
      return (
        <Badge className="bg-warning-light text-warning border-warning">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Flagged
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline">
          Pending
        </Badge>
      );
    default:
      return null;
  }
};

export const CredentialCard = ({ credential, onClick, className = "" }: CredentialCardProps) => {
  const Icon = getIcon(credential.type);
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        credential.status === "flagged" ? "border-warning" : ""
      } ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-muted rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {credential.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {credential.issuer}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {credential.date}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            {getStatusBadge(credential.status)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};