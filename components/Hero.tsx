import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="hero" id="start">
      
      <div className="hero-copy">
        <p className="eyebrow">همراه مسیر رشد تو</p>
        <h1>بین درس، شیفت و زندگی،<br /><span>خودت را جا نگذار...</span></h1>
        <p className="hero-description">
          رستا، همراه دانشجویان علوم پزشکی برای<br className="desktop-break" />
          آرامش، خودمراقبتی و تاب‌آوری.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary hero-button" href="#features">شروع ارزیابی <span className="circle-arrow">←</span></Link>
        </div>
      </div>
      <div className="hero-art" role="img" aria-label="تصویر دانشجوی علوم پزشکی در محوطه دانشگاه">

        <div className="doctor-illustration" aria-hidden="true">
          <Image loading="eager" src="/images/hero.png" alt="hero" width={1000} height={1000}/>
        </div>
      </div>
    </section>
  );
}
