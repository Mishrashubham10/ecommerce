import { Briefcase } from 'lucide-react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] px-8">
      {/* ========= TOP SECTION ========== */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 py-4 items-start justify-center">
        {/* ============= ABOUT =========== */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-md font-bold text-[#6E6E6E]">About</h1>
          <div className="text-xs font-medium flex flex-col gap-2">
            <p>Contact Us</p>
            <p>About Us</p>
            <p>Careers</p>
            <p>ShubhKart Stories</p>
            <p>Press</p>
            <p>Corporate Information</p>
          </div>
        </div>
        {/* ============= GROUP COMPANIES =========== */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-md font-bold text-[#6E6E6E]">GROUP COMPANIES</h1>
          <div className="text-xs font-medium flex flex-col gap-2">
            <p>Myntra</p>
            <p>Cleartrip</p>
            <p>Shopsy</p>
          </div>
        </div>
        {/* ============= HELP =========== */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-md font-bold text-[#6E6E6E]">Help</h1>
          <div className="text-xs font-medium flex flex-col gap-2">
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation & Returns</p>
            <p>FAQ</p>
          </div>
        </div>
        {/* ============= CONSUMER POLICY =========== */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-md font-bold text-[#6E6E6E]">CONSUMER POLICY</h1>
          <div className="text-xs font-medium flex flex-col gap-2">
            <p>Cancellation & Returns</p>
            <p>Terms of Use</p>
            <p>Security</p>
            <p>Privacy</p>
            <p>Sitemap</p>
            <p>Grievance Redressal</p>
            <p>EPR Compliance</p>
          </div>
        </div>
        {/* ============= RIGHT SECTION =========== */}
        {/* <hr className='bg-white text-white font-bold h-2 w-full' /> */}
        {/* ========= FIRST SECTION ========= */}
        <div className="flex flex-col gap-4">
          {/* ====== TOP SECTION ====== */}
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-md font-bold text-[#6E6E6E]">Mail Us:</h1>
            <div className="text-xs font-medium flex flex-col gap-2">
              <p>Flipkart Internet Private Limited,</p>
              <p>Buildings Alyssa, Begonia &</p>
              <p>Clove Embassy Tech Village,</p>
              <p>Outer Ring Road, Devarabeesanahalli Village,</p>
              <p>Bengaluru, 560103,</p>
              <p>Grievance Redressal</p>
              <p>Karnataka, India</p>
            </div>
          </div>
          {/* ========= BOTTOM SECTION ======= */}
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-md font-medium text-[#6E6E6E]">Social</h1>
            {/* ICONS */}
            <div className="flex gap-4">
              <Facebook />
              <Instagram />
              <Youtube />
              <Twitter />
            </div>
          </div>
        </div>
        {/* ====== TOP SECTION ====== */}
        <div className="">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-md font-bold text-[#6E6E6E]">
              Registered Office Address:
            </h1>
            <div className="text-xs font-medium flex flex-col gap-2">
              <p>Flipkart Internet Private Limited,</p>
              <p>Buildings Alyssa, Begonia &</p>
              <p>Clove Embassy Tech Village,</p>
              <p>Outer Ring Road, Devarabeesanahalli Village,</p>
              <p>Bengaluru, 560103,</p>
              <p>Karnataka, India</p>
              <p>CIN : U51109KA2012PTC066107</p>
              <p>Telephone: 044-45614700 / 044-67415800</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* ========= BOTTOM SECTION ========== */}
      <div className="grid grid-cols-1 md:grid-cols-5 py-4 gap-4 justify-items-center">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Briefcase className="font-bold text-yellow-500 h-4" />
          Become a Seller
        </div>
        <div className="flex items-center gap-2 text-sm font-bold">
          <Briefcase className="font-bold text-yellow-500 h-4" />
          Advertise
        </div>
        <div className="flex items-center gap-2 text-sm font-bold">
          <Briefcase className="font-bold text-yellow-500 h-4" />
          Gift Cards
        </div>
        <div className="flex items-center gap-2 text-sm font-bold">
          <Briefcase className="font-bold text-yellow-500 h-4" />
          Help Center
        </div>
        <p className="text-sm font-bold">&copy; 2007-2025 Flipkart.com</p>
        {/* ========= CARD SECTION ========== */}
        {/* <div class="flex gap-2">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            alt="Visa"
            className="bg-white p-1 rounded object-contain"
            width={50}
            height={1}
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
            alt="Mastercard"
            className="h-6 w-20 bg-white p-1 rounded"
            width={50}
            height={1}
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
            alt="Amex"
            className="bg-white p-1 rounded"
            width={50}
            height={3}
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/RuPay_Logo.png"
            alt="RuPay"
            className="bg-white p-1 rounded"
            width={50}
            height={3}
          />
        </div> */}
      </div>
    </footer>
  );
}
