import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { RiArchive2Line, RiDashboard2Line } from "react-icons/ri";
import { Button, Divider } from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import {
  IoChatbox,
  IoChatboxOutline,
  IoDocumentAttachSharp,
  IoDocumentOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Main({ children, style = "" }) {
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const navigation = [
    { name: "Dashboard", href: `/user/dashboard`, icon: RiDashboard2Line },
    { name: "Onboard", href: `/user/onboarding`, icon: MagnifyingGlassIcon },
    { name: "Medarbejdere", href: `/user/medarbejdere`, icon: RiArchive2Line },
    {
      name: "Udstyrsliste",
      href: `/user/equipment`,
      icon: IoPhonePortraitOutline,
    },
    { name: "Tjekliste", href: `/user/checklist`, icon: IoDocumentOutline },
  ];

  const teams = [
    {
      id: 1,
      name: "#",
      href: "#",
      initial: "W",
    },
  ];
  const userNavigation = [{ name: "Forside", href: "/" }];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link href="/">
                        <img
                          className="h-12 w-auto "
                          src="/logo.png"
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:bg-[#1F2937] hover:text-white ${
                                    router.asPath === item.href
                                      ? "bg-[#1F2937] text-white"
                                      : ""
                                  } ${item?.classNames}`}
                                >
                                  <item.icon
                                    area-hidden="true"
                                    className={`shrink-0 h-6 w-6 ${
                                      router.asPath === item.href
                                        ? "font-semibold text-white"
                                        : ""
                                    }`}
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          {/* <div className="text-xs font-semibold leading-6 text-black ">
                            Konfigurationer
                          </div> */}
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <Link
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-800 text-white"
                                      : "text-black hover:text-white hover:bg-[#1F2937]",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-[#1F2937] text-[0.625rem] font-medium text-white group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <Link
                            href={`#`}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <DocumentTextIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Dokumenter
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col border-gray-200 border-r">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col  overflow-y-auto px-4 pb-4 bg-[#0E0F10]">
            <div className="flex h-16 shrink-0 items-center ">
              {/* <Link href="/">
                <img
                  className="h-6 ml-2 w-auto"
                  src="/logo.png"
                  alt="Your Company"
                />
              </Link> */}
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-2">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-1.5 text-sm leading-6 font-normal text-[#909090] hover:bg-[#1c1e20] hover:text-white ${
                            router.asPath === item.href
                              ? "bg-[#2B2C2D] text-white"
                              : ""
                          } ${item?.classNames}`}
                        >
                          <item.icon
                            area-hidden="true"
                            className={`shrink-0 h-5 w-5 ml-2  ${
                              router.asPath === item.href
                                ? "font-semibold text-white"
                                : ""
                            }`}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className=" text-[#909090] border-t border-[#212223] mb-2 -ml-10 w-96 -w-96"></div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <Link
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-[#2B2C2D] text-white"
                              : "text-[#909090] hover:text-white hover:bg-[#1c1e20]",
                            "group flex gap-x-3 rounded-md p-1.5 text-sm leading-6 font-normal"
                          )}
                        >
                          <span className="flex h-5 w-5 ml-2 shrink-0 items-center justify-center rounded-lg border bg-[#1F2937] text-[0.625rem] font-medium text-white group-hover:text-white">
                            {team.initial}
                          </span>
                          <span
                            className={`truncate font-normal ${
                              team.current ? "text-white" : ""
                            }`}
                          >
                            {team.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  {/* <Link
                    href={`#`}
                    className="group -mx-2 flex gap-x-3 rounded-md p-1.5 text-sm font-normal leading-6 text-[#909090] hover:bg-[#1c1e20] hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-5 w-5 shrink-0 ml-2"
                      aria-hidden="true"
                    />
                    Indstillinger
                  </Link> */}
                  <Link
                    href={`#`}
                    className="group -mx-2 flex gap-x-3 rounded-md p-1.5 text-sm font-normal leading-6 text-[#909090] hover:bg-[#1c1e20] hover:text-white"
                  >
                    <DocumentTextIcon
                      className="h-5 w-5 shrink-0 ml-2"
                      aria-hidden="true"
                    />
                    Dokumenter
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-56">
          <div className="sticky  top-0 z-40 flex h-14 shrink-0 items-center gap-x-4 border-b bg-[#FAFAFA]  px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-2">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6 text-black" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden "
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 ">
              <div className="relative flex flex-1"></div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>

                    <span className="hidden lg:flex lg:items-center">
                      <span className="leading-6" aria-hidden="true">
                        <div className="text-sm font-semibold">Testbruger</div>
                      </span>
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400 "
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 font-bold"
                            )}
                          >
                            asd
                          </p>
                        )}
                      </Menu.Item>
                      <Divider my="sm" />
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={signoutUser}
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Log ud
                          </a>
                        )}
                      </Menu.Item> */}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className={`py-10 ${style} `}>
            <div className="px-4 sm:px-6 lg:px-8  ">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
