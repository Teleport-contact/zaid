export default function ImageGrid() {
  return (
    <div dir="ltr" className="grid grid-cols-2 gap-4 w-auto h-auto">
          {/* Left column: one image spanning two rows */}
          <div className="row-span-2">
            <img src="left.png" alt="Left" className="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl" />
          </div>
          {/* Right column: two stacked images */}
          <div>
            <img src="top_right.png" alt="Top Right" className="w-full h-full object-cover rounded-tr-3xl" />
          </div>
          <div>
            <img src="bottom_right.png" alt="Bottom Right" className="w-full h-full object-cover rounded-br-3xl" />
          </div>
        </div>
  );
}