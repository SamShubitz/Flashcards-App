import Image from "next/image";
import background from "../../public/background.jpg";

export default function Home() {
  return (
    <main className="flex justify-center items-center p-24 gap-9">
      <div className="flex-1 max-w-96 h-96 relative">
        <Image
          fill={true}
          className="object-contain"
          src={background}
          alt="image"
        />
      </div>
      <div className="flex-1 max-w-96 text-left">
        <h1 className="text-4xl">Welcome Text</h1>
        <br />
        <p>
          Suporting welcome additional app text.
          <br />
          Yes very good points made in that above text. And to follow it up we
          have this additional text ehre. What na awkward pdalce to end the
          text. It needs more for length purposes.
        </p>
      </div>
    </main>
  );
}
