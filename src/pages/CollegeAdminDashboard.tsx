import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BarChart3, 
  UserPlus, 
  Search, 
  Download,
  TrendingUp,
  Shield,
  Award,
  AlertTriangle
} from "lucide-react";
import { mockStudents, mockAdoptionData } from "@/data/mockData";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CollegeAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = mockStudents.length;
  const avgTrustScore = Math.round(mockStudents.reduce((sum, student) => sum + student.trustScore, 0) / totalStudents);
  const totalVerifiedCredentials = mockStudents.reduce((sum, student) => sum + student.verifiedCredentials, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Admin Panel</h2>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Students
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <UserPlus className="w-4 h-4 mr-2" />
                Onboard
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">College Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage student credentials and monitor adoption across your institution.
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="onboard">Onboard</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Total Students
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">{totalStudents}</div>
                      <p className="text-xs text-success">+12% from last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        Avg Trust Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">{avgTrustScore}/100</div>
                      <p className="text-xs text-success">+3 points this month</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Verified Credentials
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">{totalVerifiedCredentials}</div>
                      <p className="text-xs text-success">+24 this week</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Adoption Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">78%</div>
                      <p className="text-xs text-success">+8% from last quarter</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Adoption Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Student Adoption Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockAdoptionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="students" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          name="Total Students"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="verified" 
                          stroke="hsl(var(--success))" 
                          strokeWidth={2}
                          name="With Verified Credentials"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="students" className="space-y-6">
                {/* Search Bar */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Students Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Student Directory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredStudents.map((student) => (
                        <div 
                          key={student.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={student.photo} alt={student.name} />
                              <AvatarFallback>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <h3 className="font-semibold text-foreground">{student.name}</h3>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium text-foreground">
                                Trust Score: {student.trustScore}/100
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {student.verifiedCredentials}/{student.totalCredentials} verified
                              </div>
                            </div>
                            
                            <Badge 
                              className={
                                student.trustScore >= 85 ? "bg-success-light text-success" :
                                student.trustScore >= 70 ? "bg-warning-light text-warning" :
                                "bg-destructive/10 text-destructive"
                              }
                            >
                              {student.trustScore >= 85 ? "Excellent" :
                               student.trustScore >= 70 ? "Good" : "Needs Review"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                {/* Verification Stats */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Credential Verification Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={mockAdoptionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="verified" fill="hsl(var(--success))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Verification Success Rate</span>
                        <Badge className="bg-success-light text-success">98.5%</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Average Processing Time</span>
                        <Badge variant="outline">2.3 mins</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Flagged Credentials</span>
                        <Badge className="bg-warning-light text-warning">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          3 pending
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">System Uptime</span>
                        <Badge className="bg-success-light text-success">99.9%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="onboard" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <UserPlus className="w-5 h-5" />
                      <span>Onboard New Students</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card className="border-primary/20">
                        <CardContent className="p-6 text-center">
                          <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                          <h3 className="font-semibold text-foreground mb-2">Bulk Import</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Upload a CSV file with student information to onboard multiple students at once.
                          </p>
                          <Button className="w-full">
                            Upload CSV File
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-primary/20">
                        <CardContent className="p-6 text-center">
                          <UserPlus className="w-12 h-12 mx-auto text-primary mb-4" />
                          <h3 className="font-semibold text-foreground mb-2">Individual Invite</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Send invitation emails to individual students to join the platform.
                          </p>
                          <Button variant="outline" className="w-full">
                            Send Invitation
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h4 className="font-semibold text-foreground mb-4">Recent Onboarding Activity</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm text-foreground">25 students onboarded via CSV import</span>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm text-foreground">Invitation sent to sarah.chen@university.edu</span>
                          <span className="text-xs text-muted-foreground">1 day ago</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm text-foreground">12 students completed account setup</span>
                          <span className="text-xs text-muted-foreground">3 days ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}