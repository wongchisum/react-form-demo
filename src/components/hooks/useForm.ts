import { useRef } from 'react';
import type { ObjType } from '../types/Common'
import FormStore from '../store'

// 在React hooks的运行期间创建一个单例(FormStore)
// 这个单例主要对表单进行收集和校验
export default function useForm<FormValue extends ObjType>(val: FormValue) {
    const formRef = useRef<FormStore>();

    if (!formRef.current) {
        if (val) {
            const store = new FormStore(val)
            // Todo:只暴露内部的一些方法给外部使用
            // 实现一个getInternals方法
            formRef.current = store;
        }

    }

    return formRef.current as FormStore;
}