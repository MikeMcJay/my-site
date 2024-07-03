import { ReactNode } from "react";
import { Button } from '@headlessui/react'

export function ButtonCustom({
    children
}: {
    children: ReactNode
}) {
    return (
        <Button className="custom-button">{children}</Button>
    )
}