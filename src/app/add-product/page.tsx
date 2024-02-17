
export const metadata = {
  title: "Adicionar Produto",
  description: "Adicionar um produto a venda",
}

export default function AddProduct() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold ">Adicionar novo produto</h1>
      <form action="">
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
          name="preço"
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

        <button type="submit" className="btn btn-primary btn-block">
          Adicionar Produto
        </button>
      </form>
    </div>
  )
}
