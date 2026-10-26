import Image from "next/image";

export default function PrivacyBanner() {
  return (
    <section className="privacy-banner">
      <div>
        <h2>اطلاعاتت محرمانه و امن باقی می‌مانند</h2>
        <p>تمامی اطلاعات سلامت روان تو فقط برای ارائه خدمات و بهبود مسیر حمایتی استفاده می‌شود.</p>
      </div>
      <Image src="/images/privacy_security.png" alt="privacy" width={150} height={150}/>
    </section>
  );
}
