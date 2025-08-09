export function GallaryCard({ img, title, description, btn, link}) {
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center border border-[#F6F5F4] rounded-3xl">
        <img src={img} alt="" className="w-full aspect-[624px/416px] object-cover  rounded-t-3xl"/>
        <div className="w-full h-fit flex flex-col gap-4 lg:gap-9 justify-center items-center p-3 lg:p-6">
            <div className="w-full h-fit flex flex-col gap-2 justify-center items-center">
                <h1 className="card-title-font">{title}</h1>
                <h2 className="text-[#C8C8C8] text-center">{description}</h2>
            </div>
            <a href={link} className="w-full h-fit flex gap-2 justify-center items-center px-8 py-4 border border-[#F6F5F4] rounded-[36px]">
                <span className="text-white">{btn}</span>
                <img src="link.svg" alt="" className="size-5"/>
            </a>
        </div>
    </div>
  );
}