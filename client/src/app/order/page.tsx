"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useEffect, useState} from "react";
import {createOrder, getCustomers, getOrders, getProducts} from "@/app/services";
import {useRouter} from "next/navigation";
import Modal from "@/components/Modal";
import {toast} from "sonner";
import {z} from "zod";

const orderSchema = z.object({
    customerId: z.number("Selecione um cliente válido"),
    products: z
        .array(z.number())
        .nonempty("Selecione pelo menos um produto"),
    status: z.enum(["PAGO", "PENDENTE"]),
});

export default function OrderPage() {
    interface OrderForm {
        customerId: number | "";
        products: number[];
        status: "PAGO" | "PENDENTE" | "";
    }

    interface Order {
        id: number;
        customerName: string,
        products: string,
        status: string,
        data: string
    }

    interface OrderData {
        id: number;
        customer: Customer;
        products: Product[];
        status: string,
        createdAt: string
    }

    interface Customer {
        id: number;
        name: string;
        email: string;
    }

    interface Product {
        id: number;
        name: string;
        price: number;
        product: Product
    }

    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<OrderForm>({customerId: "", products: [], status: ""});
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsLoading, setModalIsLoading] = useState(false);
    const [thereWasAnError, setThereWasAnError] = useState(false);
    const columns = [{id: 'id', text: 'Identificador'}, {id: 'customerName', text: 'Nome do cliente'}, {id: 'products', text: 'Produtos'},  {id: 'status', text: 'Status'}, {id: 'data', text: 'Data'}]
    const cells: string[] = ['id', 'customerName', 'products', 'status', 'data']

    const router = useRouter();

    useEffect(() => {
        const handleGetOrders = async () => {
            try {
                setIsLoading(true);
                const [dataOrders, dataCustomers, dataProducts] = await Promise.all([
                    getOrders(),
                    getCustomers(),
                    getProducts()
                ])

                const ordersFormatted = dataOrders.orders.map((order: OrderData) => {
                    const purchasedProducts: string[] = order.products.map((purchasedProduct: Product) => purchasedProduct.product.name.trim())
                    return {
                        id: order.id,
                        customerName: order.customer.name,
                        products: purchasedProducts.join(', '),
                        status: order.status,
                        data: order.createdAt
                    }
                })

                setOrders(ordersFormatted)
                setCustomers(dataCustomers.customers)
                setProducts(dataProducts.products)
            } catch (error) {
                console.error(error)
                setThereWasAnError(true);
            } finally {
                setIsLoading(false);
            }
        }

        handleGetOrders()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = orderSchema.safeParse(form);
        if (!validation.success) {
            toast.error("Ocorreu um erro de validação, verifique os campos");
            return;
        }

        try {
            setModalIsLoading(true);
            await createOrder(form)
            toast.success('Pedido criado com sucesso!')
            setTimeout(() => {
                setIsModalOpen(false);
                setModalIsLoading(false)
                setIsLoading(true)
                window.location.reload()
            }, 3000)
        } catch (error) {
            setModalIsLoading(false)
            toast.error('Ocorreu um erro ao criar o pedido, tente novamente mais tarde!')
        }
    }

    const formatDateBR = (isoDate: number | string): string => {
        const date = new Date(isoDate);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white text-black">
            <Header/>
            <main className="flex-1 overflow-auto">
                {isLoading ? (
                    <div className="text-center mt-6">Carregando...</div>
                ) : null}

                {thereWasAnError ? (
                    <div className="text-center mt-6">Ocorreu um erro interno no servidor, tente novamente mais
                        tarde</div>
                ) : null}

                {!isLoading && !thereWasAnError ? (
                    <>
                        <div className="flex flex-row justify-start items-center m-5">
                            <button
                                type="button"
                                className="bg-green-800 text-white rounded-lg p-3 hover:bg-green-600 transition cursor-pointer"
                                onClick={() => {
                                    router.push('/dashboard');
                                }}
                            >
                                Voltar para a tela inicial
                            </button>
                        </div>

                        <div className="flex flex-row justify-between items-center m-5">
                            <h3 className="text-2xl font-bold text-gray-800">Tela de listagem de pedidos</h3>
                            <button
                                type="button"
                                className="bg-green-800 text-white rounded-lg p-3 hover:bg-green-600 transition cursor-pointer"
                                onClick={() => {
                                    setIsModalOpen(true)
                                }}
                            >
                                Criar novo pedido +
                            </button>
                        </div>

                        <Modal
                            title="Cadastrar Pedidos"
                            isOpen={isModalOpen}
                            onClose={() => {
                                setForm({customerId: '', products: [], status: ""})
                                setIsModalOpen(false)
                            }}
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Clientes
                                    </label>
                                    <select
                                        value={form.customerId}
                                        onChange={(e) => setForm({...form, customerId: Number(e.target.value)})}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="">Selecione um cliente</option>
                                        {customers?.length && customers.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Produtos
                                    </label>
                                    {products.map((p) => (
                                        <label key={p.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={form.products.includes(p.id)}
                                                onChange={(e) => {
                                                    const selected = e.target.checked
                                                        ? [...form.products, p.id]
                                                        : form.products.filter((id) => id !== p.id);
                                                    setForm({...form, products: selected});
                                                }}
                                            />
                                            <span>{p.name} — R$ {p.price.toFixed(2)}</span>
                                        </label>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({
                                            ...form,
                                            status: e.target.value as "PAGO" | "PENDENTE"
                                        })}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="">Selecione o status</option>
                                        <option value="PAGO">Pago</option>
                                        <option value="PENDENTE">Pendente</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={modalIsLoading}
                                    className="bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition disabled:opacity-50"
                                >
                                    {modalIsLoading ? "Salvando..." : "Salvar"}
                                </button>
                            </form>
                        </Modal>

                        <div className="overflow-x-auto rounded-lg border border-green-500 shadow-md m-5">
                            <table className="min-w-full table-auto divide-y divide-green-500">
                                <thead className="bg-green-100">
                                <tr>
                                    {columns.map((column) => (
                                        <th className="px-6 py-3 text-left text-xs font-bold text-green-800 uppercase tracking-wider border-b border-green-500"
                                            key={column.id}>
                                            {column.text}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-green-300">
                                {orders.length ? orders.map((order) => (
                                    <tr key={order?.id}>
                                        {(cells).map((key: string, index) => (
                                            <td key={`${key}_${index}`}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-green-200">
                                                {key === 'data' ? formatDateBR(order[key as keyof Order]) : order[key as keyof Order]}
                                            </td>
                                        ))}
                                    </tr>
                                )) : <tr>
                                    <td colSpan={3}>
                                        <p className="m-3 text-center">Não há pedidos cadastros neste momento...</p>
                                    </td>
                                </tr>}
                                </tbody>
                            </table>
                        </div>
                    </>) : null}
            </main>
            <Footer/>
        </div>
    );
}