"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu";
import {Button} from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {Input} from "@/app/components/ui/input";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";

import Image from "next/image";
import MobileNav from "./MobileNav";
import {signOutAction} from "../lib/actions";

export default function Header({
  userAccount = true,
  render = true,
  user,
}: {
  render?: boolean | null;
  userAccount?: boolean | null;
  user?: {
    id?: string;
    name: string;
    email: string;
    image: string | null;
    CartItem: {id: string; quantity: number; productId: string}[];
  } | null;
}) {
  return (
    <header className='fixed left-0 right-0 top-0 bg-background border-b z-50 '>
      <div className='mx-auto flex items-center justify-between  gap-10 px-2 md:px-24 py-5'>
        <Link href='/' className='flex items-center gap-2' prefetch={false}>
          <span className='font-bold text-lg'>EleganceHub</span>
        </Link>
        {userAccount && (
          <nav className='hidden md:flex items-center gap-6'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className='grid w-[600px] p-4 gap-4 z-50'>
                      <NavigationMenuLink asChild>
                        <Link
                          href='/categories/women'
                          className='group grid h-auto w-full items-center justify-start gap-2 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
                          prefetch={false}>
                          <div className='text-sm font-medium leading-none group-hover:underline'>
                            Women
                          </div>
                          <div className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            Dresses, Tops, Bottoms, Outerwear, Lingerie
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href='/categories/men'
                          className='group grid h-auto w-full items-center justify-start gap-2 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
                          prefetch={false}>
                          <div className='text-sm font-medium leading-none group-hover:underline'>
                            Men
                          </div>
                          <div className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            Shirts, Pants, Suits, Outerwear, Accessories
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href='/categories/kids'
                          className='group grid h-auto w-full items-center justify-start gap-2 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
                          prefetch={false}>
                          <div className='text-sm font-medium leading-none group-hover:underline'>
                            Kids
                          </div>
                          <div className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            Clothing, Shoes, Accessories, Toys
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href='#'
                          className='group grid h-auto w-full items-center justify-start gap-2 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
                          prefetch={false}>
                          <div className='text-sm font-medium leading-none group-hover:underline'>
                            Accessories
                          </div>
                          <div className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            Bags, Shoes, Jewelry, Watches, Sunglasses
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className='grid w-[600px] p-4 gap-4'>
                      <NavigationMenuLink asChild>
                        <Link
                          href='/collections/summerEssentials'
                          className='group grid h-auto w-full items-center justify-start gap-2 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
                          prefetch={false}>
                          <div className='text-sm font-medium leading-none group-hover:underline'>
                            Summer Essentials
                          </div>
                          <div className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            Lightweight, breathable, and stylish summer wear.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href='/collections/formalWear'
                          className='group grid h-auto w-full items-center justify-start gap-2 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
                          prefetch={false}>
                          <div className='text-sm font-medium leading-none group-hover:underline'>
                            Formal Wear
                          </div>
                          <div className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            Elegant and sophisticated attire for special
                            occasions.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href='/collections/eventWear'
                          className='group grid h-auto w-full items-center justify-start gap-2 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
                          prefetch={false}>
                          <div className='text-sm font-medium leading-none group-hover:underline'>
                            Event Wear
                          </div>
                          <div className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            Stylish and Elegant outfits for special events.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href='/collections/sustainable'
                          className='group grid h-auto w-full items-center justify-start gap-2 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
                          prefetch={false}>
                          <div className='text-sm font-medium leading-none group-hover:underline'>
                            Sustainable Fashion
                          </div>
                          <div className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            Eco-friendly and ethically sourced fashion items.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href='/trending'
                    className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'>
                    Trending Now
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href='/recommendations'
                    className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'>
                    Recommendations
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        )}
        {render && (
          <div className='hidden sm:block relative flex-1 max-w-sm'>
            <div className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='w-full rounded-lg bg-background pl-8'
            />
          </div>
        )}
        <div className='flex gap-4 justify-center items-center'>
          <div className='flex gap-8 items-center justify-content'>
            <div className='relative'>
              <Link href='/cart'>
                <ShoppingCartIcon className='h-8 w-8' />

                <div className='absolute h-5 w-5 border-2 border-slate-900  rounded-full top-[-7px] left-6 '>
                  <span className='flex text-xs items-start justify-center top-20'>
                    {user?.CartItem?.length}
                  </span>
                </div>
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user?.image ? (
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-full border w-8 h-8 focus-visible:ring-0'>
                    <Image
                      src={user?.image!}
                      width='32'
                      height='32'
                      className='rounded-full'
                      alt='Avatar'
                    />
                    <span className='sr-only'>Toggle user menu</span>
                  </Button>
                ) : (
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-full border w-8 h-8'>
                    <div className='h-6 w-6 '></div>
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href='/profile'>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href='/orders'>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                </Link>
                <Link href='/wishlist'>
                  <DropdownMenuItem>Wishlist</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <form action={signOutAction}>
                  <DropdownMenuItem className='py-0'>
                    <Button variant='ghost' className='p-0'>
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
