import type { ObjType } from "../types/Common";
import type { SubscribeItem } from '../types/Field'
import type { ValidErrors } from '../types/Store';


export default class FormStore {
    // 表单值
    formData?: ObjType = undefined;
    // 订阅事件
    subs: SubscribeItem[] = [];
    // 回调事件
    callbacks: ObjType = {};
    constructor(data: ObjType) {
        this.formData = data;
    }

    // 注册订阅事件
    registerSubcribe(sub: SubscribeItem) {
        this.subs.push(sub)
        // 返回一个取消订阅事件的函数
        return () => {
            this.subs = [...this.subs].filter(subItem => {
                return subItem.props.name !== sub.props.name
            })
        }
    }

    // 获取表单值
    getFormData() {
        if (!this.formData) return;
        return { ...this.formData }
    }

    // 获取表单项对应的值
    getFieldValue(key: string) {
        return this.formData?.[key];
    }

    // 处理表单项数据变化
    setFieldValue(target: ObjType) {
        const keys = Object.keys(target).filter(key => key);
        if (this.formData) {
            this.formData = {
                ...this.formData,
                ...target
            }

            // 表单数据更新，找出变动了的项，触发订阅
            this.subs.filter(sub => {
                return keys.some((key: string) => key === sub.props.name);
            }).filter(sub => {
                sub?.callback?.()
            })
        }
    }

    // 更新表单值
    setFormData(target: ObjType) {
        this.formData = { ...target }
    }

    // 返回内部的方法给外部使用
    getInternalMethods() {
        return {
            getFormData: this.getFormData,
            getFieldValue: this.getFieldValue,
            setFieldValue: this.setFieldValue,
            setFormData: this.setFormData,
            registerSubcribe: this.registerSubcribe
        }
    }

    // 处理表单校验
    validate() {
        let errors: ValidErrors = [];

        const formValues = this.getFormData() as ObjType;
        // 简单实现非空校验
        this.subs.forEach((sub) => {
            const { rule, name } = sub.props;
            if (rule && Array.isArray(rule)) {
                rule.forEach((validRule) => {
                    const { required, message = '' } = validRule;
                    if (required && (!formValues[name])) {
                        errors.push({ name, message })
                    }
                })
            }
        })

        return errors;
    }

    // 增加回调事件
    setCallbacks(newCallbacks: ObjType) {
        this.callbacks = {
            ...this.callbacks,
            ...newCallbacks
        }
    }
}