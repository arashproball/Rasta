import Alert from "@/components/Alert";
import Features from "@/components/Features";
import AppIcon from "@/components/AppIcon";
import Icon from "@/components/AppIcon";
import { about1, about2, about3, about4 } from "@/data/features";

export default function AboutPage() {
    return (
        <>
            <Features data={about1} columns={4} heading="چرا رستا شکل گرفت؟" description="دانشجويان علوم پزشكى در مسير آموزش و محيط بالينى با فشارهاى ويژه‌اى روبهرو هستند؛ رستا براى ديدن اين نشانه‌ها قبل از بحران طراحى شده است." />
            <Features data={about2} columns={6} heading="رستا چگّونه همراهت میشود؟" description="مجموعه‌ای از ابزارها و خدمات يکیارچه، برای مراقبت بهتر از سلامت روان و تاب‌آوری تو." />
            <Features data={about3} columns={4} heading="چه چیزی رستا را متفاوت میکند؟" >
                <Alert
                    background="#fff4e5"
                    color="#8a4b08"
                    borderColor="#f0a23b"
                >
                    رستا فقط يک اپ عمومی سلامت روان نیست؛ براى شرايط واقعى دانشجوى علوم پزشكی طراحى شده است.
                </Alert>
            </Features>
            <Features data={about4} columns={4} heading="ارزش هاى رستا" >
                <Alert
                    background="#ffd9d9"
                    color="#8a0808"
                    borderColor="#f03b3b"
                >
                    <div className="strong">
                        <AppIcon name="emojione-v1:prohibited-sign" size={16} ></AppIcon>
                        <b>رستا چه چيزى نيست؟</b></div>
                    رستا چایگزین روانشناس یا روانپزشک نیست؛ این پلتفرم برای پایش، پیشگیری، آموزش و تسهیل دسترسی به حمایت تخصصی طراحی شده است.                    </Alert>
            </Features>
        </>
    );
}