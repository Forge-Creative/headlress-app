import Link from "next/link"
import { menuItem } from "@/utils/mainMenu"

export const Header = () => {

    return (
        <header className="header">
            <h1>
                <Link href="/">LOGO</Link>
            </h1>
            <nav>
                <ul className="main-menu">
                    {menuItem.map(menu => (
                        <li key={menu.link}><Link href={menu.link}>{menu.title}</Link></li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
