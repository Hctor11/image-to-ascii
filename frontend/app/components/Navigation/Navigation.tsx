import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/">
          <Image 
            src="/ascii-text-art.png" 
            alt="image" 
            height={100} 
            width={200} 
            className="hover:scale-105 transition-transform duration-300"
          />
      </Link>
      <Link href="/about">
          <span className="text-lg font-medium hover:text-blue-500 transition-colors duration-300">About</span>
      </Link>
    </div>
  );
};

export default Navigation;