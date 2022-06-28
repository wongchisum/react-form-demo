import type { ObjType } from './Common'

export type FormMethods = {
    getFormData: ObjType | undefined;
    getFieldValue: (key: string) => unknown;
    setFieldValue: (target: ObjType) => {
        [x: string]: unknown;
    } | undefined;
    setFormData: (target: ObjType) => void;
}

type ErrorItem = {
    name: string,
    message: string
}

export type ValidErrors = ErrorItem[]