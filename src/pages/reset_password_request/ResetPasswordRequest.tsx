import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import Logo from "./../../assets/Fahoot Logo.svg";
import Alert from "../../components/alert/Alert";

const ResetPasswordRequest: React.FC = () => {
  useTitle("Password Reset Request");
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-20 w-auto" src={Logo} alt="Fahoot" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-secondary-500">Password Reset Request</h2>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <Alert />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-secondary-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-300 ease-linear">
                  Request
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Remembered your password?{" "}
            <Link to="/" className="font-semibold leading-6 text-primary-600 hover:text-primary-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordRequest;
