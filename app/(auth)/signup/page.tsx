"use client";
import "@/styles/auth.css"
import { FormEvent, useState, useEffect } from "react";

type Step = "phone" | "otp" | 1 | 2 | 3;
type FormData = {
  phone: string; otp: string;
  firstName: string; lastName: string; email: string;
  university: string; major: string; educationLevel: string;
  studentStatus: string; entryYear: string; city: string;
  goals: string[]; otherGoal: string; privacyAccepted: boolean; termsAccepted: boolean;
};

const initialData: FormData = {
  phone: "", otp: "",
  firstName: "", lastName: "", email: "", university: "", major: "",
  educationLevel: "", studentStatus: "", entryYear: "", city: "",
  goals: [], otherGoal: "", privacyAccepted: false, termsAccepted: false,
};
const goals = ["کاهش استرس", "بهبود خواب", "مدیریت فشارهای روانی", "شناخت بهتر حال روحی", "افزایش تاب‌آوری", "دریافت حمایت تخصصی"];
const educationLevels = ["کاردانی", "کارشناسی", "کارشناسی ارشد", "دکتری حرفه‌ای", "دکتری تخصصی", "دستیار تخصصی"];
const statuses = ["در حال تحصیل", "مرخصی تحصیلی", "فارغ‌التحصیل"];

function StepProgress({ step }: { step: 1 | 2 | 3 }) {
  const labels = ["اطلاعات شخصی", "اطلاعات دانشجویی", "ترجیحات و رضایت"];
  return <div className="rasta-signup-progress" aria-label={`مرحله ${step} از ۳`}>
    <div className="rasta-progress-track"><span style={{ width: `${step / 3 * 100}%` }} /></div>
    <div className="rasta-progress-labels">{labels.map((label, i) => <span key={label} className={i + 1 <= step ? "current" : ""}>{i + 1}. {label}</span>)}</div>
  </div>;
}

export default function SignupPage() {
  const [step, setStep] = useState<Step>("phone");
  const [data, setData] = useState<FormData>(initialData);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (step !== "otp" || seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((n) => n - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [step, seconds]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) { setData((old) => ({ ...old, [key]: value })); }
  function toggleGoal(goal: string) { update("goals", data.goals.includes(goal) ? data.goals.filter((g) => g !== goal) : [...data.goals, goal]); }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (step === "phone") {
      if (!/^09\d{9}$/.test(data.phone)) return setError("شماره موبایل را با فرمت ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید.");
      update("otp", ""); setSeconds(120); setStep("otp");
      return;
    }
    if (step === "otp") {
      if (seconds <= 0) return setError("کد تأیید منقضی شده است؛ کد جدید دریافت کنید.");
      if (!/^\d{6}$/.test(data.otp)) return setError("کد تأیید باید ۶ رقم باشد.");
      setStep(1); return;
    }
    if (step === 1) {
      if (!data.firstName.trim() || !data.lastName.trim()) return setError("نام و نام خانوادگی را وارد کنید.");
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return setError("آدرس ایمیل معتبر نیست.");
      setStep(2); return;
    }
    if (step === 2) {
      if (![data.university, data.major, data.educationLevel, data.studentStatus, data.entryYear].every((v) => v.trim())) return setError("لطفاً همه اطلاعات دانشجویی ستاره‌دار را تکمیل کنید.");
      setStep(3); return;
    }
    if (!data.goals.length && !data.otherGoal.trim()) return setError("حداقل یک هدف را انتخاب یا وارد کنید.");
    if (!data.privacyAccepted || !data.termsAccepted) return setError("تأیید حریم خصوصی و شرایط استفاده الزامی است.");
    // TODO: Send `data` to the registration API. This demo does not create an account yet.
    setSubmitted(true);
  }

  if (submitted) return <main className="rasta-auth-page" dir="rtl"><section className="rasta-auth-card rasta-signup-success">
    <a href="/" className="rasta-auth-brand"><img src="/images/logo.png" alt="" /><span><strong>رستا</strong><small>روان سالم و تاب‌آور</small></span></a>
    <div className="rasta-success-mark" aria-hidden="true">✓</div><p className="rasta-auth-eyebrow">فرم تکمیل شد</p><h1>از همراهی تو خوشحالیم!</h1>
    <p className="rasta-auth-description">اطلاعات فرم آماده ارسال به سامانه است. برای فعال شدن ثبت‌نام واقعی، API ثبت‌نام را متصل کن.</p>
    <a className="rasta-primary-button rasta-button-link" href="/login">رفتن به صفحه ورود <span>←</span></a>
  </section></main>;

  return <main className="rasta-auth-page" dir="rtl"><section className="rasta-auth-card rasta-signup-card" aria-labelledby="signup-title">
    <a href="/" className="rasta-auth-brand" aria-label="صفحه اصلی رستا"><img src="/images/logo.png" alt="" /><span><strong>رستا</strong><small>روان سالم و تاب‌آور</small></span></a>
    {typeof step === "number" && <StepProgress step={step} />}
    <p className="rasta-auth-eyebrow">شروع مسیر مراقبت از خود</p>
    <h1 id="signup-title">{step === "phone" ? "ثبت‌نام در رستا" : step === "otp" ? "کد تأیید را وارد کن" : step === 1 ? "اطلاعات شخصی" : step === 2 ? "اطلاعات دانشجویی" : "ترجیحات و رضایت"}</h1>
    <p className="rasta-auth-description">{step === "phone" ? "شماره موبایلت را وارد کن تا کد تأیید برایت ارسال شود." : step === "otp" ? `کد ۶ رقمی ارسال‌شده به ${data.phone} را وارد کن.` : step === 1 ? "اطلاعات اولیه‌ات را وارد کن." : step === 2 ? "برای شخصی‌سازی بهتر خدمات، اطلاعات تحصیلی‌ات را تکمیل کن." : "انتخاب کن دوست داری رستا در چه زمینه‌هایی همراهت باشد."}</p>
    <form className="rasta-auth-form" onSubmit={submit}>
      {step === "phone" && <label className="rasta-field"><span>شماره موبایل</span><input type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="09123456789" value={data.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 11))} required /></label>}
      {step === "otp" && <>
        <label className="rasta-field"><span>کد تأیید ۶ رقمی</span><input className="rasta-otp-input" dir="ltr" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="------" value={data.otp} onChange={(e) => update("otp", e.target.value.replace(/\D/g, "").slice(0, 6))} required /></label>
        <div className="rasta-otp-meta">{seconds > 0 ? <span>زمان باقی‌مانده: {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</span> : <button type="button" className="rasta-text-button" onClick={() => { update("otp", ""); setSeconds(120); }}>ارسال مجدد کد</button>}</div>
      </>}
      {step === 1 && <div className="rasta-form-grid">
        <label className="rasta-field"><span>نام <b>*</b></span><input autoComplete="given-name" value={data.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="نام" required /></label>
        <label className="rasta-field"><span>نام خانوادگی <b>*</b></span><input autoComplete="family-name" value={data.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="نام خانوادگی" required /></label>
        <label className="rasta-field rasta-field-full"><span>ایمیل <small>(اختیاری)</small></span><input type="email" autoComplete="email" dir="ltr" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="name@example.com" /></label>
      </div>}
      {step === 2 && <div className="rasta-form-grid">
        <label className="rasta-field rasta-field-full"><span>دانشگاه <b>*</b></span><input value={data.university} onChange={(e) => update("university", e.target.value)} placeholder="نام دانشگاه" required /></label>
        <label className="rasta-field rasta-field-full"><span>رشته تحصیلی <b>*</b></span><input value={data.major} onChange={(e) => update("major", e.target.value)} placeholder="رشته تحصیلی" required /></label>
        <label className="rasta-field"><span>مقطع تحصیلی <b>*</b></span><select value={data.educationLevel} onChange={(e) => update("educationLevel", e.target.value)} required><option value="">انتخاب مقطع</option>{educationLevels.map((x) => <option key={x}>{x}</option>)}</select></label>
        <label className="rasta-field"><span>وضعیت تحصیلی <b>*</b></span><select value={data.studentStatus} onChange={(e) => update("studentStatus", e.target.value)} required><option value="">انتخاب وضعیت</option>{statuses.map((x) => <option key={x}>{x}</option>)}</select></label>
        <label className="rasta-field"><span>سال ورود <b>*</b></span><input inputMode="numeric" value={data.entryYear} onChange={(e) => update("entryYear", e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="مثلاً ۱۴۰۲" required /></label>
        <label className="rasta-field"><span>شهر محل تحصیل <small>(اختیاری)</small></span><input value={data.city} onChange={(e) => update("city", e.target.value)} placeholder="نام شهر" /></label>
      </div>}
      {step === 3 && <>
        <fieldset className="rasta-goals-fieldset"><legend>هدف اصلی یا زمینه‌های موردنیاز <small>(چند انتخابی)</small></legend><div className="rasta-goals-grid">{goals.map((goal, i) => <label key={goal} className={`rasta-goal-option ${data.goals.includes(goal) ? "selected" : ""}`}><input type="checkbox" checked={data.goals.includes(goal)} onChange={() => toggleGoal(goal)} /><span className="rasta-goal-symbol" aria-hidden="true">{["✦", "☾", "♡", "☼", "❋", "＋"][i]}</span><span>{goal}</span><span className="rasta-goal-check" aria-hidden="true">{data.goals.includes(goal) ? "✓" : ""}</span></label>)}</div></fieldset>
        <label className="rasta-field rasta-field-full"><span>موضوع دیگری مدنظرت است؟ <small>(اختیاری)</small></span><input value={data.otherGoal} onChange={(e) => update("otherGoal", e.target.value)} placeholder="نیاز یا هدف دیگر" /></label>
        <div className="rasta-consents"><label><input type="checkbox" checked={data.privacyAccepted} onChange={(e) => update("privacyAccepted", e.target.checked)} /><span><a href="/privacy" target="_blank" rel="noreferrer">حریم خصوصی</a> و نحوه استفاده از اطلاعاتم را مطالعه کرده‌ام و می‌پذیرم.</span></label><label><input type="checkbox" checked={data.termsAccepted} onChange={(e) => update("termsAccepted", e.target.checked)} /><span><a href="/terms" target="_blank" rel="noreferrer">شرایط استفاده</a> از خدمات رستا را می‌پذیرم.</span></label></div>
      </>}
      {error && <p className="rasta-form-error" role="alert">{error}</p>}
      <div className="rasta-form-actions">{step !== "phone" && <button type="button" className="rasta-secondary-button" onClick={() => { setError(""); setStep(step === "otp" ? "phone" : step === 1 ? "phone" : (step - 1) as Step); }}><span>→</span> بازگشت</button>}<button className="rasta-primary-button" type="submit" disabled={step === "otp" && seconds <= 0}>{step === "phone" ? "دریافت کد تأیید" : step === "otp" ? "تأیید و ادامه" : step < 3 ? "ادامه" : "تکمیل ثبت‌نام"}<span>←</span></button></div>
    </form>
    <p className="rasta-auth-switch">قبلاً ثبت‌نام کرده‌ای؟ <a href="/login">وارد شو</a></p>
    <p className="rasta-auth-privacy">اطلاعاتت محرمانه می‌ماند و برای ارائه خدمات رستا استفاده می‌شود.</p>
  </section></main>;
}
