import useTitle from '../../hooks/useTitle';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { capitalize } from 'lodash';
import AvatarUpdate from './avatar_update/AvatarUpdate';
import BasicInfoUpdate from './basic_info_update/BasicInfoUpdate';
import PasswordUpdate from './password_update/PasswordUpdate';
import EmailUpdate from './email_update/EmailUpdate';
import ClearRememberMe from './clear_remember_me/ClearRememberMe';
import DeleteAccount from './delete_account/DeleteAccount';
import React from "react";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.authUser.user);
  useTitle(`Profile - ${capitalize(user?.firstName)} ${capitalize(user?.lastName)}`);
  return (
    <>
      <header className="bg-white shadow-sm h-[82px]">
        <div className="flex items-center h-full mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Profile</h1>
        </div>
        <main className="flex flex-col items-center justify-center w-full py-4 divide-y divide-gray-200">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">
                Update your avatar, first name, and last name to personalize your profile.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="gap-y-8 sm:max-w-xl">
                <AvatarUpdate user={user} />
                <BasicInfoUpdate user={user} />
              </div>
            </div>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">
                Change password
              </h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">
                Update your password associated with your account. You will asked to
                re-authenticate.
              </p>
            </div>
            <PasswordUpdate />
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">
                Change your email address
              </h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">
                Please remember you would have to re-login and verify the new email address.
              </p>
            </div>
            <EmailUpdate user={user} />
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">
                Clear remember me
              </h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">
                Clearing remember me will remove all tokens stored on this browser.
              </p>
            </div>
            <form className="flex items-start md:col-span-2">
              <div className="sm:max-w-xl">
                <ClearRememberMe />
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-secondary-500">
                Delete account
              </h2>
              <p className="mt-1 text-sm leading-6 text-secondary-500">
                No longer want to use our service? You can delete your account here. This action is
                not reversible. All information related to this account will be deleted permanently.
              </p>
            </div>

            <form className="flex items-start md:col-span-2">
              <div className="sm:max-w-xl">
                <DeleteAccount />
              </div>
            </form>
          </div>
        </main>
      </header>
    </>
  );
};

export default Profile;
