import { prisma } from '@/lib/db/prisma'
import { redirect } from 'next/navigation'
import FormSubmitButton from '@/components/form-submit-button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export const metadata = {
  title: 'Adicionar Produto',
  description: 'Adicionar um produto a venda',
}

async function AddProduct(formData: FormData) {
  'use server'

   const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product')
  } 

  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const price = Number(formData.get('price'))
  const imageUrl = formData.get('imageUrl')?.toString()

  if (!name || !description || !price || !imageUrl) {
    throw Error('Todos os campos são obrigatórios')
  }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
    },
  })


  
  
}

export default async function AddProductPage() {
   const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product')
  } 

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold ">Adicionar novo produto</h1>
      <form action={AddProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="Nome do produto"
          className="mb-3 w-full p-3 border border-gray-300 rounded-md input input-bordered max-w-ws"
        />
        <textarea
          required
          name="description"
          placeholder="Descrição do produto"
          className="textarea textarea-bordered mb-3 w-full"
        ></textarea>
        <input
          type="number"
          required
          name="price"
          placeholder="preço do produto"
          className="mb-3 w-full p-3 border border-gray-300 rounded-md input input-bordered max-w-ws"
        />
        <input
          type="text"
          required
          name="imageUrl"
          placeholder="URL da imagem"
          className="mb-3 w-full p-3 border border-gray-300 rounded-md input input-bordered max-w-ws"
        />

        <FormSubmitButton className="btn-block">
          Adicionar Produto
        </FormSubmitButton>
      </form>
    </div>
  )
}
