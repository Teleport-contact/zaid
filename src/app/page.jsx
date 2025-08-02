import { HamburgerButton } from "@/components/hamburger-button";
import { Button } from "@/components/ui/button";
import { Section } from "lucide-react";
import { Butcherman } from "next/font/google";
import { StatBlock } from "@/components/ui/stat-block";
import ImageGrid from "@/components/image-grid";
import { ProductCard } from "@/components/product-card";
// import HamburgerSidebarDemo from "@/trash/hamburger-sidebar-demo"

export default function Page() {
  return(
    <>
      {/* <header className="flex h-16 md:h-24 shrink-0 items-center justify-between border-b-3 border-black p-6">
        <HamburgerButton/>
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo"/>
        </div>
      </header> */}

      <section className="mt-8 px-6 space-y-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-[3px] bg-[#1C1B17]"></div>
            <h2>الجودة و الابتكار في كل قطعة</h2>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-medium">
            إبداع و جودة غير 
            <br/>
                      مسبوقة
            <br/>
            في عالم التصميم   
            </h1>
            <h2 className="text-[#333333] font-light">
            حيث تلتقي الأناقة بالمتانة، نضع بين
            <br/>
            يديك تحفا فنية
            <br/>
            تزين منزلك و تدوم مدى الحياة.
            </h2>
          </div>
          <div className="space-x-4">
            <Button className={"px-8 py-5 rounded-4xl border-2 bg-black text-white border-black"}>من نحن</Button>
            <Button className={"px-8 py-5 rounded-4xl text-black border-2 border-black"}>تواصل معنا</Button>
          </div>
        </div>
        <div className="space-y-5">
          {/* Example stats array, you can add more objects as needed */}
          {[
            { number: "+25", label: "سنة من الخبرة" },
            { number: "+150", label: "منتج يلبي احتياجاتك" },
            { number: "+250", label: "تصميم مختلف يناسب ذوقك الرفيع" },
            { number: "+100", label: "زبون واثق بجودة منتجنا" }
          ].map((stat, idx) => (
            <StatBlock key={idx} number={stat.number} label={stat.label} />
          ))}
        </div>
      </section>
      
      <div className="relative bg-[#222222] space-y-12 pb-20 md:pb-52">
        <img src="/gold_art.svg" alt="gold_art" className="w-full h-auto mt-8"/>
        <section className="mt-8 px-6 space-y-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-[3px] bg-white"></div>
            <h2 className="text-white">من نحن</h2>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-medium text-white">
            رواد في صناعة 
            <br/>
            و تصميم أنواع
            <br/>
            الرخام و الغرانيت  
            </h1>
            <h2 className="text-[#C8C8C8] font-light">
            شركة زيد ، رواد في صناعة الرخام والجرانيت،
            <br/>
            نقدم أجود الخامات وأرقى التصاميم لتناسب
            <br/>
            أذواق عملائنا المميزين.
            <br/>
            بخبرة تمتد لأجيال، أصبحنا وجهة موثوقة
            <br/>
            للمشاريع الفاخرة.
            </h2>
            <h2 className="text-[#C8C8C8] font-light">
            حيث نحرص على الجودة، و الدقة، و الابتكار في
            <br/>
            كل تفصيل. باستخدام أحدث التقنيات و أفضل
            <br/>
            أنواع الرخام والجرانيت المحلي والمستورد
            <br/>
            لنضمن لك جودة تدوم طويلا.
            </h2>
          </div>
        </div>
          <ImageGrid/>
        </section>
        
        <section className="px-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-[3px] bg-white"></div>
            <h2 className="text-white">معرض أعمالنا</h2>
          </div>
          <h1 className="text-3xl font-medium text-white">
            تشكيلة متنوعة من
            <br/>
            التصاميم لتناسب
            <br/>
            جميع الأذواق  
            </h1>
            <div className="flex flex-col gap-5 md:flex-row md:justify-center md:gap-16">
              <ProductCard
                image="brick1.png"
                title="جمال طبيعي و أناقة فاخرة"
                description="الرخام حجر فاخر بألوان وعروق طبيعية يتميز بمظهره الفاخر وأناقته الكلاسيكية، يضفي أناقة على المساحات الداخلية."
                buttonText="معرض الرخام"
                href="/products/headphones"
              />
              <ProductCard
                image="brick2.png"
                title="متانة عالية و جاذبية دائمة"
                description="الغرانيت صخر طبيعي صلب يتحمّل الاستخدام المكثف، ويتميز بعروقه وألوانه المتنوعة ومقاومته للحرارة والخدوش."
                buttonText="معرض الغرانيت"
                href="/products/headphones"
              />
            </div>
        </section>
        <img src="/gold_art_b.svg" alt="gold_art" className="w-full h-auto absolute -bottom-1"/>
      </div>

      <footer className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-2 items-center">
          <img src="/logo.svg" className="size-20" alt="logo"/>
          <h1>شركة زيد</h1>
        </div>
        <div className="flex gap-4">
          <img src="whatsapp.svg" alt="whatsapp" />
          <img src="facebook.svg" alt="facebook" />
        </div>
        <div className="flex flex-col items-center">
          <a href="+963-981-848-972">963-981-848-972+</a>
          <a href="zaid.contact@gmail.com">zaid.contact@gmail.com</a>
          <h1 className="font-light">دمشق، زاهرة جديدة</h1>
        </div>
        © 2025 جميع الحقوق محفوظة لشركة زيد
      </footer>
    </>
  );
}