"use client";

import { ReactNode } from "react";

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ title, isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
                {children}
            </div>
        </div>
    );
}
