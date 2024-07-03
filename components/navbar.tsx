'use client'

const navigation = [
    { name: "About", href: "#about", current: true },
    { name: "Projects", href: "#projects", current: false },
    { name: "Reach out", href: "#reach-out", current: false }
]

export function TopNavBar({
    showSideBar
}: {
    showSideBar: (show: boolean) => void
}) {
    return (
        <div className="top-nav-bar">
            <img
                className="top-nav-bar-brand"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="MikeMcJay"
            />
            <div className="top-nav-bar-links-default">
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                    >{item.name}</a>
                ))}
            </div>
            <div className="top-nav-bar-links-phone" onClick={() => { showSideBar(true) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-6">
                    <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </div>            
        </div>
    )
}

export function SideNavBar({
    show,
    closeSideBar
}: {
    show: boolean,
    closeSideBar: () => void
}) {
    return (
        <div className={`${show? "flex" : "hidden" } fixed h-full w-full backdrop-blur-sm dark:text-white font-mono`}>
            <div className="basis-1/3" onClick={ closeSideBar } />
            <div className="flex flex-col gap-20 justify-center items-center basis-2/3 dark:bg-gray-950">
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={ closeSideBar }
                    >{item.name}</a>
                ))}
            </div>
        </div>
    )
}