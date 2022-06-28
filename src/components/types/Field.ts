import type { ReactNode } from "react"

type RuleItem = {
    required?: boolean,
    message?: string
}

export type FieldProps = {
    rule?: string | RuleItem[],
    name: string,
    children: ReactNode
}

export type SubscribeItem = {
    props: FieldProps,
    callback: (...args: unknown[]) => void
}