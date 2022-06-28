import FormContext from '../context'
import type { FormProps } from '../types/Form'

export default function Form(props: FormProps) {
    const { children, store } = props;
    if (!store) return null;
    return (
        <form>
            <FormContext.Provider value={store}>
                <div>{children}</div>
            </FormContext.Provider>
        </form>
    )
}