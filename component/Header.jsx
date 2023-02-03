import Link from "next/link"

export const Header = () => {
    return (
        <header className="header">
            <h1>
                <Link href="/">LOGO</Link>
            </h1>
            <nav>
                <ul className="main-menu">
                    <li> <Link href="/">Home</Link></li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </header>
    )
}
