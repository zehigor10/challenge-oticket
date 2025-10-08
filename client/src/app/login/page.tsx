"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {toast} from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning("Preencha e-mail e senha!");
            return;
        }

        if (email === "teste@oticket.com.br" && password === "admin123") {
            router.push("/dashboard");
        } else {
            toast.error("E-mail ou senha incorretos!");
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
            <Header/>

            <main className="flex-1 flex items-center justify-center">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 rounded-2xl shadow-md w-80 flex flex-col space-y-4"
                >
                    <h1 className="text-2xl font-bold text-center text-green-800">
                        Fazer login
                    </h1>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-green-600">E-mail</label>
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border w-full px-3 py-2 text-black rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-green-600">Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border w-full px-3 py-2 text-black rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-800 text-white rounded-lg py-2 hover:bg-green-600 transition"
                    >
                        Entrar
                    </button>
                </form>
            </main>

            <Footer/>
        </div>
    );
}
