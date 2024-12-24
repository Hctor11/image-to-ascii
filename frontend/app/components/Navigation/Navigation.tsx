import Image from "next/image"


const Navigation = () => {
  return (
    <div className="flex justify-between items-center p-4">
        <Image src="/ascii-text-art.png" alt="image" height={100} width={200}/>
    </div>
    )
}

export default Navigation