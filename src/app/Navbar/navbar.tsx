import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import ShoppingCartButton from './shopping-cart-button'
import UserMenuButton from './user-menu-button'
import { getCart } from '@/lib/db/cart'
import { redirect } from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
async function searchProducts(formData: FormData) {
  'use server'
  
  const searchQuery = formData.get('searchQuery')?.toString()

  if (searchQuery) {
    redirect('/search?query=' + searchQuery)
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  const cart = await getCart()

  return (
    <div className="bg-neutral">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="LalaviBiju logo" width={40} height={40} />
            Lalavi Biju
          </Link>
        </div>

        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                className="input input-bordered w-full min-w-[100px]"
                placeholder="Pesquisar produtos"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session}/>
        </div>
      </div>
    </div>
  )
}
