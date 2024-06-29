import { ReactNode } from "react";
import { Button } from '@headlessui/react'

export function ButtonCustom({
    children
}: {
    children: ReactNode
}) {
    return (
        <Button className="bg-slate-300 px-5 py-3 rounded-md">{children}</Button>
    )
}