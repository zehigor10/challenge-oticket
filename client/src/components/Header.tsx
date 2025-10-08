import Image from "next/image";
import oticket from "../app/public/oticket.png"

export default function Header() {
    return (
        <header className="bg-green-800 justify-center p-6 text-white">
            <div className="flex justify-center items-center">
                <Image
                    src={oticket}
                    alt="Logo da OTicket"
                    width={150}
                    height={150}
                    priority
                />
            </div>
        </header>
    )
}