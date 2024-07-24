"use client";

import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import Link from "next/link";
import {ChevronDown, ChevronUp} from "lucide-react";
import {cn} from "../lib/utils";
export default function MobileNav() {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [openCollections, setOpenCollections] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<boolean>(false);

  return (
    <div className='sm:hidden'>
      <button onClick={() => setOpenNav(true)}>
        {!openNav && <Bars3Icon className='h-6 w-6' />}
      </button>

      {openNav && (
        <div className='fixed top-0 right-0 left-0 z-50 bg-background bg-opacity-20 flex flex-col p-4'>
          <nav className='flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
              <div>
                <Link href='/' onClick={() => setOpenNav(false)}>
                  <span className='font-bold text-lg px-4'>EleganceHub</span>
                </Link>
              </div>
              <button
                className='self-end p-4'
                onClick={() => setOpenNav(false)}>
                <XMarkIcon className='h-6 w-6' />
              </button>
            </div>
            <div className='flex flex-col gap-2 font-semibold'>
              <div onClick={() => setOpenCategories((prev) => !prev)}>
                <div>
                  <div
                    className={cn(
                      "flex gap-2 px-4 py-2 hover:bg-muted rounded-md hover:text-blue-500",
                      openCategories && "text-blue-500"
                    )}>
                    <h2 className='mb-2'>Categories</h2>
                    <span>
                      {openCategories ? <ChevronUp /> : <ChevronDown />}
                    </span>
                  </div>
                  {openCategories && (
                    <div className='flex flex-col gap-2 border-2 py-2 px-4 rounded-md  text-sm '>
                      <Link href='/categories/men'>
                        <div className='px-4 py-2 hover:bg-muted rounded-md hover:text-blue-400'>
                          Men
                        </div>
                      </Link>
                      <Link href='/categories/women'>
                        <div className='px-4 py-2 hover:bg-muted rounded-md hover:text-blue-400'>
                          Women
                        </div>
                      </Link>
                      <Link href='/categories/kids'>
                        <div className='px-4 py-2 hover:bg-muted rounded-md hover:text-blue-400'>
                          Kids
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div onClick={() => setOpenCollections((prev) => !prev)}>
                <div>
                  <div
                    className={cn(
                      "flex gap-2 px-4 py-2 hover:bg-muted rounded-md hover:text-blue-500",
                      openCollections && "text-blue-500"
                    )}>
                    <h2 className='mb-2 '>Collections</h2>
                    <span>
                      {openCollections ? <ChevronUp /> : <ChevronDown />}
                    </span>
                  </div>
                  {openCollections && (
                    <div className='flex flex-col gap-2 border-2 py-2 px-4 rounded-md  text-sm '>
                      <Link href='/collections/formalWear'>
                        <div className='px-4 py-2 hover:bg-muted rounded-md hover:text-blue-400'>
                          Formal Wear
                        </div>
                      </Link>
                      <Link href='/collections/eventWear'>
                        <div className='px-4 py-2 hover:bg-muted rounded-md hover:text-blue-400'>
                          Event Wear
                        </div>
                      </Link>
                      <Link href='/collections/sustainable'>
                        <div className='px-4 py-2 hover:bg-muted rounded-md hover:text-blue-400'>
                          Sustainable Fashion
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Link href='/trending'>
                  <div className='px-4 py-2 hover:bg-muted rounded-md hover:text-blue-500'>
                    Trending
                  </div>
                </Link>
              </div>
              <div>
                <Link href='/recommendations'>
                  <div className='px-4 py-2 hover:bg-muted rounded-md hover:text-blue-500'>
                    Recommendation
                  </div>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
