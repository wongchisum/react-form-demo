import { createContext } from 'react'
import FormStore from '../store'
const FormContext = createContext<FormStore | undefined>(undefined);

export default FormContext;