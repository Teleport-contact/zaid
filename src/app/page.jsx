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

      <section className="space-y-6">
        <div className="flex justify-between">
        <div className="space-y-6 md:space-y-12 p-6 md:py-12 md:px-16">
          <div className="flex items-center gap-4">
            <div className="w-16 md:w-32 h-[3px] bg-[#1C1B17]"/>
            <h1 className="md:text-xl">الجودة و الابتكار في كل قطعة</h1>
          </div>
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl md:text-6xl font-medium">
                إبداع و جودة غير 
                <br/>
                          مسبوقة
                <br/>
                في عالم التصميم   
                </h2>
                <h3 className="md:text-2xl font-light text-[#333333]">
                حيث تلتقي الأناقة بالمتانة، نضع بين
                <br className="md:hidden"/>
                يديك تحفا فنية
                <br/>
                تزين منزلك و تدوم مدى الحياة.
                </h3>
              </div>
              <div className="space-x-4 space-y-1">
                <Button className={"px-8 py-5 md:w-64 rounded-4xl border-2 bg-black text-white border-black"}>من نحن</Button>
                <Button className={"px-8 py-5 md:w-64 rounded-4xl text-black border-2 border-black"}>تواصل معنا</Button>
              </div>
            </div>
            <img 
              src="hero.png" 
              alt="" 
              className="hidden md:block max-w-[800px] max-h-[580px] w-auto h-auto object-contain"
              style={{ aspectRatio: 'auto' }} // This preserves the original aspect ratio
            />
          </div>
        <div className="space-y-5 md:flex justify-around">
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
        <section className="mt-8 px-6 md:px-16 space-y-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 md:w-32 h-[3px] bg-white"/>
            <h1 className="text-white md:text-xl">من نحن</h1>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-6xl font-medium text-white">
            رواد في صناعة 
            <br/>
            و تصميم أنواع
            <br/>
            الرخام و الغرانيت  
            </h2>
            <div className="md:flex space-y-5 justify-around">
              <h3 className="md:text-2xl font-light text-[#C8C8C8]">
              شركة زيد ، رواد في صناعة الرخام والجرانيت،
              <br/>
              نقدم أجود الخامات وأرقى التصاميم لتناسب
              <br className="md:hidden"/>
              أذواق عملائنا المميزين.
              <br/>
              بخبرة تمتد لأجيال، أصبحنا وجهة موثوقة
              <br className="md:hidden"/>
              للمشاريع الفاخرة.
              </h3>
              <h3 className="md:text-2xl font-light text-[#C8C8C8]">
              حيث نحرص على الجودة، و الدقة، و الابتكار في
              <br className="md:hidden"/>
              كل تفصيل.
              <br className="hidden md:block"/>
               باستخدام أحدث التقنيات و أفضل
              <br className="md:hidden"/>
              أنواع الرخام والجرانيت المحلي والمستورد
              <br/>
              لنضمن لك جودة تدوم طويلا.
              </h3>
            </div>
          </div>
        </div>
          <ImageGrid/>
        </section>
        
        <section className="px-6 space-y-6 md:space-y-12 md:pb-28">
          <div className="flex items-center gap-4">
            <div className="w-16 md:w-32 h-[3px] bg-white"/>
            <h1 className="text-white md:text-xl">معرض أعمالنا</h1>
          </div>
          <h2 className="text-3xl md:text-6xl font-medium text-white">
            تشكيلة متنوعة من
            <br/>
            التصاميم لتناسب
            <br/>
            جميع الأذواق  
            </h2>
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
        <div className="flex flex-col md:flex-row md:gap-5 items-center">
          <a href="+963-981-848-972">963-981-848-972+</a>
          <a href="zaid.contact@gmail.com">zaid.contact@gmail.com</a>
          <h1 className="font-light">دمشق، زاهرة جديدة</h1>
        </div>
        © 2025 جميع الحقوق محفوظة لشركة زيد
      </footer>
    </>
  );
}