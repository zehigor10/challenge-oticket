"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useEffect, useState} from "react";
import {createCustomer, getCustomers} from "@/app/services";
import {useRouter} from "next/navigation";
import Modal from "@/components/Modal";
import {z} from "zod";
import {toast} from "sonner";

const customerSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    email: z.email("E-mail inválido."),
});

export default function CustomerPage() {
    interface Customer {
        id: number;
        name: string;
        email: string;
    }

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({name: "", email: ""});
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsLoading, setModalIsLoading] = useState(false);
    const [thereWasAnError, setThereWasAnError] = useState(false);
    const columns = [{id: 'id', text: 'Identificador'}, {id: 'name', text: 'Nome'}, {id: 'email', text: 'Email'}]

    const router = useRouter();

    useEffect(() => {
        const handleGetCustomers = async () => {
            try {
                setIsLoading(true);
                const data = await getCustomers();
                setCustomers(data.customers)
            } catch (error) {
                console.error(error)
                setThereWasAnError(true);
            } finally {
                setIsLoading(false);
            }
        }

        handleGetCustomers()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = customerSchema.safeParse(form);
        if (!validation.success) {
            toast.error("Ocorreu um erro de validação, verifique os campos");
            return;
        }

        try {
            setModalIsLoading(true);
            await createCustomer(form)
            toast.success('Usuário criado com sucesso!')
            setTimeout(() => {
                setIsModalOpen(false);
                setModalIsLoading(false)
                setIsLoading(true)
                window.location.reload()
            }, 3000)
        } catch (error) {
            setModalIsLoading(false)
            console.error(error)
            toast.error('Ocorreu um erro ao criar o usuário, tente novamente mais tarde!')
        }
    }

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
                            <h3 className="text-2xl font-bold text-gray-800">Tela de listagem de usuários</h3>
                            <button
                                type="button"
                                className="bg-green-800 text-white rounded-lg p-3 hover:bg-green-600 transition cursor-pointer"
                                onClick={() => {
                                    setIsModalOpen(true)
                                }}
                            >
                                Criar novo usuário +
                            </button>
                        </div>

                        <Modal
                            title="Cadastrar Cliente"
                            isOpen={isModalOpen}
                            onClose={() => {
                                setForm({ name: '', email: ''})
                                setIsModalOpen(false)
                            }}
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    maxLength={50}
                                    value={form.name}
                                    onChange={(e) => setForm({...form, name: e.target.value})}
                                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    maxLength={50}
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                />

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
                                {customers.length ? customers.map((customer) => (
                                    <tr key={customer?.id}>
                                        {(Object.keys(customer) as (keyof typeof customer)[]).map((key, index) => (
                                            <td key={`${key}_${index}`}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-green-200">
                                                {customer[key]}
                                            </td>
                                        ))}
                                    </tr>
                                )) : <tr>
                                    <td colSpan={3}>
                                        <p className="m-3 text-center">Não há clientes cadastros neste momento...</p>
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