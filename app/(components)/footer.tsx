import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
      <footer className="bg-background text-text py-4 flex justify-center items-center gap-2 border-t-2" >
        <Image src={"https://avatars.githubusercontent.com/u/115808850?v=4"} alt={"HW"}         width={50}
        height={50} className="rounded-lg"/>
        <Link href='https://github.com/HubertWatycha' className="text-text font-bold">
        Made by Hubert Watycha
        </Link>
      </footer>
    );
  }
  
  export default Footer;
  