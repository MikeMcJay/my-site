import { ReactNode } from "react";
import { Button } from '@headlessui/react'

export function ButtonCustom({
    children,
    onClick
}: {
    children: ReactNode,
    onClick: () => void
}) {
    return (
        <Button onClick={onClick} className="custom-button">{children}</Button>
    )
}