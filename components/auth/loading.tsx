import Image from "next/image"

export const Loading = () => {
    return (
       <div className="h-full w-full flex flex-col justify-center items-center">
          <Image
            src="/LoadingLogo.svg"
            alt="A description of my image"
            width={500}
            height={300}
            className="animate-pulse duration-700"
            />
       </div>
    );
};