import Image from 'next/image'
import PriceTag from '@/components/price-tag'
import { cache } from 'react'
import AddToCartButton from './add-to-cart-button'
import { prisma } from '@/lib/db/prisma'
import {incrementProductQuantity} from './actions'

interface ProductPageProps {
  params: {
    id: string
  }
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  return product
})

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id)
  return {
    title: product.name + ' - Loja de produtos',
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  }
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id)

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1>{product.name}</h1>
        <PriceTag price={product.price} className="mt-4"></PriceTag>
        <p className="py-6 text-justify">{product.description}</p>
        <AddToCartButton
          productId={id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  )
}