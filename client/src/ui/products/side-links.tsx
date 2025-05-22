'use client'
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Todos los productos', href: '/products' },
    { name: 'Futbol', href: '/products/football' },
    { name: 'Basquet', href: '/products/basquetball' },
    { name: 'Gimnasio', href: '/products/gym' },
]

export default function SideLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                return (
                    <Link key={link.name} href={link.href} className={pathname === link.href ? 'bg-gray-200' : ''}>
                        <p className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-green-600': pathname === link.href,
                            },
                        )}>{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}