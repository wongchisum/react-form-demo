import type { ReactNode } from "react"
import FormStore from "../store"
import { ObjType } from "./Common"
import { ValidErrors } from "./Store"
export type FormProps<FormValue extends ObjType = any> = {
    store: FormStore,
    children: ReactNode,
    onFinish?: (formVal: FormValue) => void,
    onFinishFailed?: () => ValidErrors
}