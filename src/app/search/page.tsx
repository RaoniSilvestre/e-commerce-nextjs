import { prisma } from '@/lib/db/prisma'
import ProductCard from '@/components/product-card'
import { redirect } from 'next/navigation'

interface SearchPageProps {
  searchParams: { query: string }
}

export function generateMetadata({ query }: { query: string }) {
  return {
    title: `Buscando por: ${query}`,
    description: `Resultados para a busca: ${query}`,
  }
}

export default async function searchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
  })

  if (query === '') {
    redirect('/')
  }

  if (products.length === 0) {
    return <div>Nenhum produto encontrado</div>
  }

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold ">Resultados para: {query}</h1>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
