import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl ">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] ssm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src="/documents.png"
            alt="Documents"
            className="object-contain dark:hidden"
            fill
          />
          <Image
            src="/documents-dark.png"
            alt="Documents"
            className="object-contain hidden dark:block"
            fill
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            src="/reading.png"
            alt="Reading"
            className="object-contain dark:hidden"
            fill
          />
          <Image
            src="/reading-dark.png"
            alt="Reading"
            className="object-contain dark:block hidden"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
