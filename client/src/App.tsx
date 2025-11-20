import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import HomeTemplate1 from "@/pages/HomeTemplate1";
import HomeTemplate2 from "@/pages/HomeTemplate2";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Industries from "@/pages/Industries";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

import Janitorial from "@/pages/services/janitorial";
import DayPorters from "@/pages/services/day-porters";
import LevelUpClean from "@/pages/services/levelup-clean";
import Disinfection from "@/pages/services/disinfection";
import Covid19Cleaning from "@/pages/services/covid-19-cleaning";
import FloorCare from "@/pages/services/floor-care";
import WindowWashing from "@/pages/services/window-washing";
import AirDuctHVAC from "@/pages/services/air-duct-hvac";
import CarpetExtraction from "@/pages/services/carpet-extraction";
import ConcretePolishing from "@/pages/services/concrete-polishing";
import PowerWashing from "@/pages/services/power-washing";
import CommercialCleaning from "@/pages/services/commercial-cleaning";

import OfficeBuilding from "@/pages/industries/office-building";
import Retailer from "@/pages/industries/retailer";
import DistributionCenters from "@/pages/industries/distribution-centers";
import Restaurants from "@/pages/industries/restaurants";
import MedicalGroups from "@/pages/industries/medical-groups";
import Banks from "@/pages/industries/banks";
import Schools from "@/pages/industries/schools";
import AutoDealerships from "@/pages/industries/auto-dealerships";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home-template-1" component={HomeTemplate1} />
        <Route path="/home-template-2" component={HomeTemplate2} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/industries" component={Industries} />
        <Route path="/contact" component={Contact} />
        
        <Route path="/services/janitorial" component={Janitorial} />
        <Route path="/services/day-porters" component={DayPorters} />
        <Route path="/services/levelup-clean" component={LevelUpClean} />
        <Route path="/services/disinfection" component={Disinfection} />
        <Route path="/services/covid-19-cleaning" component={Covid19Cleaning} />
        <Route path="/services/floor-care" component={FloorCare} />
        <Route path="/services/window-washing" component={WindowWashing} />
        <Route path="/services/air-duct-hvac" component={AirDuctHVAC} />
        <Route path="/services/carpet-extraction" component={CarpetExtraction} />
        <Route path="/services/concrete-polishing" component={ConcretePolishing} />
        <Route path="/services/power-washing" component={PowerWashing} />
        <Route path="/services/commercial-cleaning" component={CommercialCleaning} />
        
        <Route path="/industries/office-building" component={OfficeBuilding} />
        <Route path="/industries/retailer" component={Retailer} />
        <Route path="/industries/distribution-centers" component={DistributionCenters} />
        <Route path="/industries/restaurants" component={Restaurants} />
        <Route path="/industries/medical-groups" component={MedicalGroups} />
        <Route path="/industries/banks" component={Banks} />
        <Route path="/industries/schools" component={Schools} />
        <Route path="/industries/auto-dealerships" component={AutoDealerships} />
        
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
