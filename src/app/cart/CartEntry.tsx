'use client'

import { CartItemWithProducts } from '@/lib/db/cart'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/format'
import { useTransition } from 'react'

interface CartEntryProps {
  cartItem: CartItemWithProducts
  setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
  const quantityOptions: JSX.Element[] = []
  for (let i = 1; i <= 100; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
  }
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />

        <div>
          <Link href={`/product/${product.id}`} className="font-bold text-xl">
            {product.name}
          </Link>
          <div>Preço: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantidade:{' '}
            <select
              className="select select-bordered w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value)
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity)
                })
              }}
            >
              <option value={0}> 0 (Remover)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(quantity * product.price)}
          {isPending && <span className="loading loading-spinner loading-sm"></span>}
          </div>
        </div>
      </div>
      <div className="divider"/>
    </div>
  )
}
