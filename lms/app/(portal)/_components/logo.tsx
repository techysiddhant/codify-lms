import Image from "next/image";
import Link from "next/link";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ subsets: ["cyrillic"],weight:["400"] });

export const Logo = () => {
  // return <Image height={130} width={130} alt="logo" src="/logo.svg" />;
  return(
    <div className="">
      <h1 className={`${pacifico.className} uppercase text-2xl font-bold text-primary tracking-wide `}>Codify</h1>
      <h2 className="text-sm italic">by <Link href='/' className="underline font-medium italic">Siddhant Jain</Link>  </h2>
    </div>
  )
};
