import { GallaryCard } from "@/components/gallary-card";
import { StatBlock } from "@/components/stat-block";

export default function Home() {
  const statistics = [
            { number: "25", label: "سنة من الخبرة" },
            { number: "150", label: "منتج يلبي احتياجاتك" },
            { number: "250", label: "تصميم مختلف يناسب ذوقك الرفيع" },
            { number: "100", label: "زبون واثق بجودة منتجنا" }
          ]

  return (
    <>
      <div>
        <section className="w-full h-fit flex justify-end lg:justify-between">
          <img src="hero.png" alt="" className="hidden lg:block max-w-3xl max-h-[600px] rounded-br-[200px]"/>
          <div className="flex flex-col gap-6 lg:gap-12 items-end p-6 lg:px-16 lg:py-12">
            <div className="w-full h-fit flex gap-4 justify-end items-center">
              <h1 className="h1">الجودة و الابتكار في كل قطعة</h1>
              <div className="w-16 lg:w-32 h-[3px] bg-black"/>
            </div>
            <div className="w-full h-fit flex flex-col gap-4 lg:gap-6 items-end">
              <h2 className="h2 max-w-3xs lg:max-w-[480px]">
                إبداع و جودة غير 
                مسبوقة
                <br/>
                في عالم التصميم 
              </h2>
              <h3 className="h3 text-[#333333] max-w-3xs lg:max-w-[520px]">
                حيث تلتقي الأناقة بالمتانة، نضع بين
                يديك تحفا فنية
                <br/>
                تزين منزلك و تدوم مدى الحياة.
              </h3>
            </div>
            <div className="w-full h-fit flex gap-4">
              <button className="w-full h-fit min-w-[148px] lg:min-w-3xs px-8 py-4 bg-transparent text-black border rounded-[99px]">تواصل معنا</button>
              <button className="w-full h-fit min-w-[148px] lg:min-w-3xs px-8 py-4 bg-[#222222] text-white border rounded-[99px]">من نحن</button>
            </div>
          </div>
        </section>
        <section className="w-full h-fit flex flex-col lg:flex-row justify-between gap-5 items-end p-6 lg:px-16 lg:py-12">
          {statistics.map((stat, idx) => (
            <StatBlock key={idx} number={stat.number} label={stat.label} />
          ))}
        </section>
      </div>
      <div className="relative w-full h-fit flex flex-col bg-[#222222] pb-14 lg:pb-[244px]">
        <img src="golden-art.svg" alt="" className="w-full"/>
        <section className="w-full h-fit flex flex-col gap-5 lg:gap-12 p-6 lg:px-16 lg:py-16">
          <div className="w-full h-fit flex flex-col gap-5 items-end">
            <div className="w-full h-fit flex gap-4 justify-end items-center">
              <h1 className="h1 text-white">من نحن</h1>
              <div className="w-16 lg:w-32 h-[3px] bg-white"/>
            </div>
            <h2 className="h2 max-w-3xs lg:max-w-[480px] text-white">
              رواد في صناعة
              و تصميم أنواع   
              الرخام و الغرانيت
            </h2>
            <div className="w-full h-fit flex flex-col lg:flex-row-reverse justify-between gap-5 items-end">
              <h3 className="h3 text-[#C8C8C8] max-w-80 lg:max-w-max">
                 شركة زيد ، رواد في صناعة الرخام والجرانيت،
                 نقدم أجود الخامات وأرقى التصاميم لتناسب
                 أذواق عملائنا المميزين.
                 بخبرة تمتد لأجيال، أصبحنا وجهة موثوقة
                 للمشاريع الفاخرة.
              </h3>
              <h3 className="h3 text-[#C8C8C8] max-w-80 lg:max-w-max">
               حيث نحرص على الجودة، و الدقة، و الابتكار في كل تفصيل. باستخدام أحدث التقنيات و أفضل أنواع الرخام والجرانيت المحلي والمستورد لنضمن لك جودة تدوم طويلا.
              </h3>
           </div>
          </div>
          <img src="grid.png" alt="grid" className="lg:max-h-[660px] overflow-scroll"/>
        </section>
        <section className="w-full h-fit flex flex-col gap-5 lg:gap-12 p-6 lg:px-16 lg:py-16">
          <div className="w-full h-fit flex flex-col gap-5 items-end">
            <div className="w-full h-fit flex gap-4 justify-end items-center">
              <h1 className="h1 text-white">معرض أعمالنا</h1>
              <div className="w-16 lg:w-32 h-[3px] bg-white"/>
            </div>
            <h2 className="h2 text-white max-w-[264px] lg:max-w-[524px]">تشكيلة متنوعة من التصاميم لتناسب جميع الأذواق</h2>
            <div className="w-full h-fit flex flex-col lg:flex-row gap-5 lg:gap-16 justify-center py-20 lg:py-12">
              <GallaryCard
                img={"brick1.png"}
                title={"جمال طبيعي و أناقة فاخرة"}
                description={"الرخام حجر فاخر بألوان وعروق طبيعية يتميز بمظهره الفاخر وأناقته الكلاسيكية، يضفي أناقة على المساحات الداخلية."}
                btn={"معرض الرخام"}
                link={"/gallary/brick1"}
              />
              <GallaryCard
                img={"brick2.png"}
                title={"متانة عالية و جاذبية دائمة"}
                description={"الغرانيت صخر طبيعي صلب يتحمّل الاستخدام المكثف، ويتميز بعروقه وألوانه المتنوعة ومقاومته للحرارة والخدوش."}
                btn={"معرض الغرانيت"}
                link={"/gallary/brick2"}
              />
            </div>
          </div>
        </section>
        <img src="golden-art-b.svg" alt="" className="w-full absolute -bottom-0.5"/>
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
          <a href="+963-981-848-972" className="ligh-font">+963-981-848-972</a>
          <a href="zaid.contact@gmail.com " className="ligh-font">zaid.contact@gmail.com</a>
          <h1 className="ligh-font">دمشق، زاهرة جديدة</h1>
        </div>
        © 2025 جميع الحقوق محفوظة لشركة زيد
      </footer>
    </>  
  );
}
