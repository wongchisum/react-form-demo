
import FormStore from '../store'
import FormContext from '../context'
import { cloneElement, useContext, useEffect } from 'react';
import useForceUpdate from '../hooks/useForceUpdate';
import type { ReactElement, SyntheticEvent } from 'react';
import type { FieldProps } from '../types/Field'

export default function Field(props: FieldProps) {
    const store = useContext(FormContext) as FormStore;
    const { children, name } = props;
    const forceUpdate = useForceUpdate();

    if (!store) return null;

    useEffect(() => {
        const unregisterSubscribe = store.registerSubcribe({
            props,
            callback: forceUpdate
        });

        return () => {
            unregisterSubscribe()
        }
    }, [])


    // 需要劫持onChange和value，实现数据的受控
    const ContolledField = cloneElement(children as ReactElement, {
        // Todo:修复无法使用getFieldValue去获取当前字段的数据
        // value: store.getFieldValue(name),

        value: store.getFieldValue(name),
        onChange: (event: SyntheticEvent<HTMLInputElement>) => {
            const { value } = event.currentTarget
            store?.setFieldValue({ [name]: value })
        }
    })
    return (
        <div>
            {ContolledField}
        </div>
    )
}