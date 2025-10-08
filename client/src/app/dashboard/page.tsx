"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {FaBoxesPacking, FaPerson} from "react-icons/fa6";
import {PiListChecksFill} from "react-icons/pi";
import {useRouter} from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const cards = [
        {
            title: "Clientes",
            icon: <FaPerson className="w-10 h-10 text-white"/>,
            path: "/customer",
            color: "bg-blue-600"
        },
        {
            title: "Produtos",
            icon: <FaBoxesPacking className="w-10 h-10 text-white"/>,
            path: "/product",
            color: "bg-green-600"
        },
        {
            title: "Pedidos",
            icon: <PiListChecksFill className="w-10 h-10 text-white"/>,
            path: "/order",
            color: "bg-purple-600"
        },
    ];
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white text-black">
            <Header/>
            <main className="flex-1 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mt-3 mb-6 text-gray-800">Escolha uma opção</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 m-6 gap-6 w-1/2 max-w-4xl">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            onClick={() => router.push(card.path)}
                            className={`cursor-pointer ${card.color} rounded-xl p-3 flex flex-col items-center justify-center hover:scale-105 transition transform`}
                        >
                            {card.icon}
                            <span className="mt-3 text-white font-light text-md">{card.title}</span>
                        </div>
                    ))}
                </div>
            </main>
            <Footer/>
        </div>
    );
}
