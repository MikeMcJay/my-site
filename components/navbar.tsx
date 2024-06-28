'use client'

const navigation = [
    { name: "About", href: "#", current: true },
    { name: "Projects", href: "#", current: false },
    { name: "Reach out", href: "#", current: false }
]

export function TopNavBar() {
    return (
        <div className="top-nav-bar">
            <img
                className="top-nav-bar-brand"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="MikeMcJay"
            />
            <div className="top-nav-bar-button">
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                    >{item.name}</a>
                ))}
            </div>
        </div>
    )
}