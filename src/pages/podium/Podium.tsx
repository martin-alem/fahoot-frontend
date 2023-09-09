import useTitle from "../../hooks/useTitle";
import Logo from "./../../assets/Fahoot Logo.svg";

const Podium: React.FC = () => {
  useTitle("Podium");
  return (
    <div className="h-screen flex flex-col justify-center bg-secondary-500 overflow-x-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <img className="mb-4 mx-auto h-20 w-auto" src={Logo} alt="Fahoot" />
          <div className="bg-neutral-500 p-8 rounded-sm shadow-md text-center">
            <h1 className="text-3xl text-secondary-500 font-bold capitalize">javaScript quiz</h1>
          </div>
          <div className="mt-14 flex gap-0 items-end justify-center overflow-x-auto">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-white text-3xl md:text-4xl font-bold animate-bounce">Player 2</h1>
              <div className="w-[200px]  h-[250px] bg-amber-800 flex flex-col items-center justify-center">
                <h2 className="text-amber-800 text-3xl font-bold w-6 h-6 p-6 flex items-center justify-center bg-white rounded-full">3</h2>
                <h2 className="text-white text-3xl font-bold">331</h2>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h1 className="text-white text-3xl md:text-4xl font-bold animate-bounce">Player 1</h1>
              <div className="w-[200px] h-[400px] bg-orange-500 flex flex-col items-center justify-center">
                <h2 className="text-orange-500 text-3xl font-bold d w-6 h-6 p-6 flex items-center justify-center bg-white rounded-full">1</h2>
                <h2 className="text-white text-3xl font-bold">3326</h2>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-white text-3xl font-bold animate-bounce">Player 3</h1>
              <div className="w-[200px] h-[300px] bg-lime-800 flex flex-col items-center justify-center">
                <h2 className="text-lime-800 text-3xl font-bold w-6 h-6 p-6 flex items-center justify-center bg-white rounded-full">2</h2>
                <h2 className="text-white text-3xl font-bold">326</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podium;
