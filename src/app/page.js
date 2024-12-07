import LandingPage from "../components/landing-page/landing-page";
import {TooltipProvider} from "@radix-ui/react-tooltip";

export default function Page() {
  return (
  <TooltipProvider>
    <LandingPage/>
  </TooltipProvider>
  )
}
