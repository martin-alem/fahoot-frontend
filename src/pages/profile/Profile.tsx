import { InboxArrowDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "../../components/button/Button";
import useTitle from "../../hooks/useTitle";

const Profile: React.FC = () => {
  useTitle("Profile - Martin Alemajoh");

  return (
    <>
      <header className="bg-white shadow-sm h-[82px]">
        <div className="flex items-center h-full mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Profile</h1>
        </div>
        <main className="flex flex-col items-center justify-center w-full py-4 divide-y divide-gray-200">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">Use a permanent address where you can receive mail.</p>
            </div>

            <form className="md:col-span-2">
              <div className="gap-y-8 sm:max-w-xl">
                <div className="mb-2 col-span-full flex items-center gap-x-8">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  />
                  <div>
                    <button type="button" className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 transition-all duration-300 ease-linear">
                      Change avatar
                    </button>
                    <p className="mt-2 text-xs leading-5 text-secondary-500">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-secondary-500">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-secondary-500">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div className="col-span-full">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-secondary-500">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-secondary-500 shadow-sm ring-1 ring-inset ring-secondary-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div> */}
              </div>

              <div className="mt-8 sm:max-w-xl">
                <Button label="Save" type="primary" suffixIcon={<InboxArrowDownIcon className="w-6" />} />
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Change password</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">Update your password associated with your account.</p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-secondary-500">
                    Current password
                  </label>
                  <div className="mt-2">
                    <input
                      id="current-password"
                      name="current_password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-secondary-500">
                    New password
                  </label>
                  <div className="mt-2">
                    <input
                      id="new-password"
                      name="new_password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-secondary-500">
                    Confirm password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm_password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:max-w-xl">
                <Button label="Save" type="primary" suffixIcon={<InboxArrowDownIcon className="w-6" />} />
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Change your email address</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">Please remember you would have to re-login and verify the new email address.</p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-secondary-500">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:max-w-xl">
                <Button label="Save" type="primary" suffixIcon={<InboxArrowDownIcon className="w-6" />} />
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Clear remember me</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">Please enter your password to confirm you would like to clear remember me</p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="logout-password" className="block text-sm font-medium leading-6 text-secondary-500">
                    Your password
                  </label>
                  <div className="mt-2">
                    <input
                      id="logout-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 sm:max-w-xl">
                <Button label="Save" type="primary" suffixIcon={<InboxArrowDownIcon className="w-6" />} />
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">Delete account</h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">
                No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.
              </p>
            </div>

            <form className="flex items-start md:col-span-2">
              <div className="sm:max-w-xl">
                <Button label="Save" type="danger" suffixIcon={<TrashIcon className="w-6" />} />
              </div>
            </form>
          </div>
        </main>
      </header>
    </>
  );
};

export default Profile;
