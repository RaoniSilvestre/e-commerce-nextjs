import { getCart } from '@/lib/db/cart'
import CartEntry from './CartEntry'
import { setProductQuantity } from './actions'
import { formatPrice } from '@/lib/format'
export const metadata = {
  title: 'Seu carrinho de compras - Lalavi Biju',
}

export default async function CartPage() {
  const cart = await getCart()

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold"> Carrinho de compras</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          key={cartItem.id}
          cartItem={cartItem}
          setProductQuantity={setProductQuantity}
        />
      ))}

      {!cart?.items.length && <p>Seu carrinho está vazio</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mt-3 mb-3 font-bold ">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">
          Finalizar compra
        </button>
      </div>
    </div>
  )
}
