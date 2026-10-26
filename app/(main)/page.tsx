import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PrivacyBanner from "@/components/PrivacyBanner";
import Footer from "@/components/Footer";
import { features } from "@/data/features"
import AppIcon from "@/components/AppIcon";
export default function HomePage() {
  return (
    <>
      <Hero />
      <Features data={features} columns={3} heading="ویژگی‌های رستا" description="          ابزارها و حمایت‌هایی برای حال بهتر و زندگی متعادل‌تر" />
      <PrivacyBanner />
      <section className="trust-row" aria-label="مزایای رستا">
        <div><AppIcon name="fluent-emoji-flat:graduation-cap" size={64}/><p>مناسب زندگی<br />دانشجویی</p></div>
        <div><AppIcon name="fluent-color:people-team-32" size={64}/><p>تیمی از متخصصان<br />همراه تو</p></div>
        <div><AppIcon name="fluent-emoji-flat:red-heart" size={64}/><p>محیط امن و<br />بدون قضاوت</p></div>
      </section>
    </>
  );
}
