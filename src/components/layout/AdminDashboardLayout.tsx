'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  BellIcon,
  Home,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react';

import useTokenStore from '@/store/Employee/auth.store';
import React from 'react';

const navItems = [
  { href: '/dashboard/home', icon: Home, label: 'Dashboard' },
  { href: '/dashboard/order', icon: ShoppingCart, label: 'Job Posting' },
  { href: '/dashboard/product', icon: Package, label: 'Candidates' },
];

export default function AdminDashboardLayout() {
  const { accessToken, setAccessToken } = useTokenStore((state) => state);
  const pathname = usePathname();
  const logout = () => setAccessToken('');

  return (
    <div className=" bg-slate-100">
      {/* Header */}
      <div className="bg-white flex flex-row justify-between h-[101px] mb-8 p-8">
        <div className="flex-row flex justify-between font-[Space Grotesk] font-normal text-[20px]">
          Hirewithtess
        </div>
        <div className="gap-2 flex flex-row ">
          <div className="relative w-2xl">
            <Search className="absolute left-2 top-2.5 h-4 max-w-xl text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
          <div className="bg-[#A2A1A81A] flex flex-col w-[50px] h-[50px] rounded-xl items-center justify-center">
            <BellIcon />
          </div>
          <div className="flex flex-row w-[184px] h-[50px] rounded-xl border items-center">
            <div className="w-10 h-10 bg-[#A2A1A8] rounded-xl" />
            <div className="flex flex-col justify-center pl-2">
              <h1 className="font-[Roboto] text-lg font-bold leading-none">John Doe</h1>
              <p className="text-sm text-[#A2A1A8] leading-none">Employee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="grid  min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-x-6 px-6">
        {/* Sidebar */}
        <div className="hidden bg-white border-r md:block mt-2 rounded-xl p-4">
          <nav className="grid items-start gap-2 text-sm font-medium ">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground ${
                  pathname === href ? 'bg-muted text-primary' : ''
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex flex-col bg-white border p-4 rounded-xl mt-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[24px] font-[open sans] font-semibold ml-4">Overview</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                  </Link>
                  {navItems.map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-orange ${
                        pathname === href
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </Link>
                  ))}
                  <button
                    // onClick={logout}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Users className="h-5 w-5" />
                    Logout
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {/* {renderContent()} */}
          </main>
        </div>
      </div>
    </div>
  );
}
