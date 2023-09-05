import useTitle from "../../hooks/useTitle";
import Logo from "./../../assets/Fahoot Logo.svg";

const JoinGame: React.FC = () => {
  useTitle("Join Game");
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-secondary-500">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-20 w-auto" src={Logo} alt="Fahoot" />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <div className="mt-2">
                  <input
                    id="pin"
                    name="pin"
                    type="text"
                    autoComplete="off"
                    placeholder="Game Pin"
                    required
                    className="block w-full rounded-md border-0 py-4 text-center text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-4xl sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    id="nick_name"
                    name="nick_name"
                    type="text"
                    autoComplete="off"
                    placeholder="Nick name"
                    required
                    className="block w-full rounded-md border-0 py-4 text-center text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-4xl sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary-500 px-3 py-4 text-4xl font-semibold leading-6 text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-300 ease-linear">
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinGame;
