import HeroSection from "../components/HeroSection";
import InfoCards from "../components/InfoCards";
import LoginSection from "../components/LoginSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <main className="flex-1">
        <InfoCards />
        <LoginSection />
      </main>
      <Footer />
    </div>
  );
}
