/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LOGO } from './../../utils/constant';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Avatar from '../../components/avatar/Avatar';
import Alert from '../../components/alert/Alert';
import { useRequestVerificationEmailMutation } from '../../api/security.api';
import { IRequestVerificationEmailPayload } from '../../utils/types';
import { EmailPurpose, SUCCESS_MESSAGES } from '../../utils/constant';
import { toast } from 'react-toastify';
import { clearPlay } from '../../slices/play.slice';
import { handleServerError } from '../../utils/util';

const navigation = [
  { name: 'Library', href: '', current: true },
  { name: 'Report', href: 'report', current: false },
  { name: 'Profile', href: 'profile' },
];
const userNavigation = [
  { name: 'Your Profile', href: 'profile' },
  { name: 'Sign out', href: 'logout' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authUser.user);

  const [requestVerificationEmail, { isLoading, isSuccess, isError, error }] = useRequestVerificationEmailMutation();

  const handleSubmit = async () => {
    if (user?.verified) {
      toast.error('You account is already active. No verification is required', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const payload: IRequestVerificationEmailPayload = {
      emailAddress: user?.emailAddress ?? '',
      subject: 'Verify Email',
      emailPurpose: EmailPurpose.EMAIL_VERIFICATION,
    };
    requestVerificationEmail(payload);
  };

  useEffect(() => {
    dispatch(clearPlay());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.info(SUCCESS_MESSAGES.VERIFICATION_EMAIL_SENT_SUCCESS, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isError, error]);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-secondary-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/dashboard">
                        <img className="h-12 w-12" src={LOGO} alt="Fahoot" />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) => {
                              return isActive
                                ? classNames('bg-primary-500 text-white', 'rounded-md px-3 py-2 text-md font-medium')
                                : classNames('text-white hover:bg-secondary-700 hover:text-white transition-all duration-300 ease-linear', 'rounded-md px-3 py-2 text-md font-medium');
                            }}
                            end
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-secondary-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <Avatar height="h-12" width="w-12" src={user?.avatarUrl ?? undefined} alt={user?.lastName ?? ''} />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {() => (
                                  <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                      isActive ? classNames('bg-gray-100', 'block px-4 py-2 text-sm text-secondary-700') : classNames('block px-4 py-2 text-sm text-secondary-700')
                                    }
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-secondary-800 p-2 text-gray-400 hover:bg-secondary-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={`/dashboard/${item.href}`}
                      className={classNames(
                        item.current ? 'bg-primary-500 text-white' : 'text-white hover:bg-secondary-700 hover:text-white transition-all duration-300 ease-linear',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-secondary-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Avatar height="h-10" width="w-10" src={user?.avatarUrl ?? undefined} alt={user?.lastName ?? ''} />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white capitalize">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-sm font-medium text-gray-400">{user?.emailAddress}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button key={item.name} as="a" href={item.href} className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-secondary-700 hover:text-white">
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {user && !user?.verified && (
          <Alert
            bgColor="bg-yellow-50"
            iconColor="text-yellow-500"
            headingColor="text-yellow-800"
            descriptionColor="text-yellow-500"
            heading="Verify Email Address"
            description="Your account is not yet active. Please verify your email address to enjoy full access to our platform."
            action={handleSubmit}
            actionText="Send verification email"
            actionLoading={isLoading}
          />
        )}
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
