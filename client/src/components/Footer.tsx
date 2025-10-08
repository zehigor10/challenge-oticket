export default function Footer() {
    return (
        <footer className="bg-green-800 justify-center p-6 text-white">
            <div className="flex justify-center items-center">
                © {new Date().getFullYear()} - Desenvolvido por José Higor
            </div>
        </footer>
    )
}