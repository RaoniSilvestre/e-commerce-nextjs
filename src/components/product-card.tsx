import { Product } from '@prisma/client'
import PriceTag from './price-tag'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    -Date.now() + new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7

  return (
    <Link
      href={`/product/${product.id}`}
      className="card w-full h-full max-h-fit bg-base-200 hover:shadow-xl transition-shadow rounded-xl overflow-hidden cursor-pointer"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-between" >
          {product.name}
          {isNew && <div className="badge badge-secondary">Novo</div>}
        </h2>
        <p className="text-justify text-gray-500">
          {product.description.slice(0, 100)}
          {product.description.length > 100 ? '...' : ''}
        </p>
        <PriceTag
          price={product.price}
          className="badge-primary p-2 hover:shadow-xl transition-shadow"
        />
      </div>
    </Link>
  )
}
