import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSideDock from "@/components/FloatingSideDock";
import CartDrawer from "@/components/CartDrawer";
import DonateModal from "@/components/DonateModal";
import AuthModal from "@/components/AuthModal";
import SearchModal from "@/components/SearchModal";
import { publicDonationConfig } from "@/lib/server/env";
import SmoothScrollProvider from "@/components/animation/SmoothScrollProvider";
import TopNewsTicker from "@/components/TopNewsTicker";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const { minAmount } = publicDonationConfig();
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="flex-1 w-full pt-[72px] sm:pt-[78px] lg:pt-[80px] xl:pt-[92px]">
        <TopNewsTicker />
        {children}
      </main>
      <Footer />
      <FloatingSideDock />
      <CartDrawer />
      <DonateModal minAmount={minAmount} />
      <AuthModal />
      <SearchModal />
    </SmoothScrollProvider>
  );
}

