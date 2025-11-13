import { Mail, Gift, QrCode } from "lucide-react";
import { cn } from "@/lib/utils"; // optional: remove if you don't use cn()

type Badge = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  titleBn: string;
  titleEn: string;
  helper?: string;
};

const badges: Badge[] = [
  {
    icon: Mail,
    titleBn: "ইমেইল ছাড়াই কাজ হবে",
    titleEn: "No email required",
    helper: "শুধু ফোন নম্বর যথেষ্ট",
  },
  {
    icon: Gift,
    titleBn: "প্রথম ৩টি রসিদ ফ্রি",
    titleEn: "First 3 receipts free",
    helper: "কোনো কার্ড দরকার নেই",
  },
  {
    icon: QrCode,
    titleBn: "QR যাচাইকৃত PDF",
    titleEn: "QR-verified PDF",
    helper: "স্ক্যান করলে রসিদ ভেরিফাই",
  },
];

export const TrustBadges = () => {
  return (
    <section className="py-12 px-4 bg-accent/5" aria-labelledby="trust-badges-title">
      <div className="container mx-auto max-w-4xl">
        <h2 id="trust-badges-title" className="sr-only">
          কেন ভরসা করা যায়
        </h2>

        <ul role="list" className="grid md:grid-cols-3 gap-6">
          {badges.map(({ icon: Icon, titleBn, titleEn, helper }, i) => (
            <li key={i} className="list-none">
              <div
                className={cn(
                  "group h-full flex flex-col items-center text-center gap-2 p-6 rounded-xl",
                  "bg-background/60 backdrop-blur-sm border border-border/60",
                  "transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-medium focus-within:shadow-medium"
                )}
                tabIndex={-1}
              >
                <div
                  className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center ring-1 ring-accent/20 group-hover:ring-accent/30 transition"
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6 text-accent" />
                </div>

                <h3 className="mt-2 text-lg font-semibold text-foreground">{titleBn}</h3>
                <p className="text-sm text-muted-foreground font-english">{titleEn}</p>

                {helper && <p className="text-xs text-muted-foreground/80">{helper}</p>}
              </div>
            </li>
          ))}
        </ul>

        {/* Optional reassurance line */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          কোনো সাইন-আপ লাগবে না — WhatsApp-এই PDF পাবেন।
        </p>
      </div>
    </section>
  );
};
