import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ProductCard({ image, title, description, href, buttonText = "Learn More" }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden border-1 border-white pb-6 pt-0">
      <div className="relative w-full">
        <img
          src={image || "blank.png"}
          alt={title}
          fill="true"
          className="object-cover transition-transform hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-center text-white">{title}</CardTitle>
        <CardDescription className="line-clamp-3 text-center text-[#C8C8C8]">{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full border-1 border-white rounded-3xl p-4 h-fit">
          <a href={href} className="text-white flex justify-center gap-2">
            <span>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.75 5.48584H4.875C4.37772 5.48584 3.90081 5.68338 3.54917 6.03501C3.19754 6.38665 3 6.86356 3 7.36084V16.1108C3 16.6081 3.19754 17.085 3.54917 17.4367C3.90081 17.7883 4.37772 17.9858 4.875 17.9858H13.625C14.1223 17.9858 14.5992 17.7883 14.9508 17.4367C15.3025 17.085 15.5 16.6081 15.5 16.1108V9.23584M6.75 14.2358L18 2.98584M18 2.98584H13.625M18 2.98584V7.36084" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>  
            {buttonText}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
