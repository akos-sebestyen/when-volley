import Image from "next/image";
import { Button } from "@/components/ui/button";
import LandingPage from "@/app/landingPage";

export default function Home() {
  return (
    <div>
      <main>
        <LandingPage />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
