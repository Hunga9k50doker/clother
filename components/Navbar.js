import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "@/actions/auth";
import { getSessionFromCookies } from "@/utils";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const { access_token } = getSessionFromCookies();
    if (access_token) setAccessToken(access_token);
  }, [router]);

  const navigation = [
    { name: "Home", href: "/", current: Boolean(router.asPath === "/"), isShow: true },
    { name: "Products", href: "/admin/products", current: Boolean(router.asPath === "/admin/products"), isShow: Boolean(accessToken) },
    { name: "Orders", href: "/admin/orders", current: Boolean(router.asPath === "/admin/orders"), isShow: Boolean(accessToken) },
  ];
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(
                      (item) =>
                        item.isShow && (
                          <Link
                            style={{ pointerEvents: item.current ? "none" : "" }}
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        )
                    )}
                  </div>
                </div>
              </div>

              {accessToken ? (
                <div
                  onClick={() => {
                    signOut();
                  }}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-white cursor-pointer"
                >
                  Logout
                </div>
              ) : (
                <div
                  onClick={() => router.push("/auth")}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-white cursor-pointer"
                >
                  Login
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map(
                (item) =>
                  item.isShow && (
                    <Link key={item.name} href={item.href}>
                      <Disclosure.Button
                        as="a"
                        className={classNames(
                          item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
