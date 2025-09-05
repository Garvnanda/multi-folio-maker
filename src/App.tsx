import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import AddCredential from "./pages/AddCredential";
import DigitalPassport from "./pages/DigitalPassport";
import RecruiterVerify from "./pages/RecruiterVerify";
import FlaggedCredential from "./pages/FlaggedCredential";
import CollegeAdminDashboard from "./pages/CollegeAdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/add-credential" element={<AddCredential />} />
          <Route path="/passport" element={<DigitalPassport />} />
          <Route path="/verify" element={<RecruiterVerify />} />
          <Route path="/flagged/:id" element={<FlaggedCredential />} />
          <Route path="/admin" element={<CollegeAdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
