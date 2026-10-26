"use client";
import "@/styles/auth.css"
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Step = "phone" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) router.replace("/dash");
    else setChecking(false);
  }, [router]);

  useEffect(() => {
    if (step !== "otp" || seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((n) => n - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [step, seconds]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (step === "phone") {
      if (!/^09\d{9}$/.test(phone)) return setError("شماره موبایل را با فرمت ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید.");
      setOtp(""); setSeconds(120); setStep("otp");
      // TODO: Call your OTP request API.
    } else if (step === "otp") {
      if (seconds <= 0) return setError("کد تأیید منقضی شده است؛ کد جدید دریافت کنید.");
      if (!/^\d{6}$/.test(otp)) return setError("کد تأیید باید ۶ رقم باشد.");
        router.replace("/dash");
    }
  }

  if (checking) return <main className="rasta-auth-loading" dir="rtl">در حال بررسی وضعیت ورود…</main>;

  return (
    <main className="rasta-auth-page" dir="rtl">
      <section className="rasta-auth-card" aria-labelledby="login-title">
        <a href="/" className="rasta-auth-brand" aria-label="صفحه اصلی رستا">
          <img src="/images/logo.png" alt="" />
          <span><strong>رستا</strong><small>روان سالم و تاب‌آور</small></span>
        </a>
        <div className="rasta-auth-progress" aria-label="مراحل ورود">
          {(["phone", "otp"] as Step[]).map((item) => <span key={item} className={item === step ? "active" : (["phone", "otp"].indexOf(item) < ["phone", "otp"].indexOf(step) ? "done" : "")} />)}
        </div>
        <p className="rasta-auth-eyebrow">همراه مسیر رشد تو</p>
        <h1 id="login-title">{step === "phone" ? "ورود به حساب" : step === "otp" ? "کد تأیید را وارد کن" : "تکمیل اطلاعات"}</h1>
        <p className="rasta-auth-description">{step === "phone" ? "شماره موبایلت را وارد کن تا کد تأیید برایت ارسال شود." : step === "otp" ? `کد ۶ رقمی ارسال‌شده به ${phone} را وارد کن.` : "برای ادامه، نامت را وارد کن."}</p>
        <form className="rasta-auth-form" onSubmit={submit}>
          {step === "phone" && <label className="rasta-field"><span>شماره موبایل</span><input type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="09123456789" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))} required /></label>}
          {step === "otp" && <>
            <label className="rasta-field"><span>کد تأیید ۶ رقمی</span><input className="rasta-otp-input" dir="ltr" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="------" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} required /></label>
            <div className="rasta-otp-meta">{seconds > 0 ? <span>زمان باقی‌مانده: {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</span> : <button type="button" className="rasta-text-button" onClick={() => { setOtp(""); setSeconds(120); }}>ارسال مجدد کد</button>}</div>
          </>}
          {error && <p className="rasta-form-error" role="alert">{error}</p>}
          <button className="rasta-primary-button" type="submit" disabled={step === "otp" && seconds <= 0}>{step === "phone" ? "دریافت کد تأیید" : step === "otp" ? "تأیید و ادامه" : "ورود به رستا"}<span aria-hidden="true">←</span></button>
        </form>
        <p className="rasta-auth-switch">حساب نداری؟ <a href="/signup">ثبت‌نام در رستا</a></p>
        <p className="rasta-auth-privacy">اطلاعاتت محرمانه می‌ماند و فقط برای ارائه خدمات رستا استفاده می‌شود.</p>
      </section>
    </main>
  );
}
