export default function Footer() {
  return (
    <footer className="bg-[#232323] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-2 gap-8">
        <div className="flex items-center gap-14 w-full">
          <img src="./assets/ig.svg" className="w-6 h-6" />
          <img src="./assets/fb.svg" className="w-6 h-6" />
          <img src="./assets/twt.svg" className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-14 w-full text-sm">
          <p>Terms & Condition</p> |
          <p>Copyright © 2018. All rights reserved. PT Radya Gita Bahagi</p>
        </div>
      </div>
    </footer>
  );
}
