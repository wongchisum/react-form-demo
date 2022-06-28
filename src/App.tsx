import Form, { Field, useForm } from "./components";
import FormStore from './components/store';

type FormType = {
  name: string,
  message: string
}

const nameRule = [{ message: "名称不能为空！", required: true }]

export default function App() {
  const form = useForm<FormType>({ name: "Wong", message: "Hello Wong!" });
  return (
    <div>
      <Form store={form}>
        <Field name="name" rule={nameRule}>
          <input type="text" />
        </Field>
        <Field name="message">
          <input type="text" />
        </Field>


      </Form>

      <button onClick={() => form.validate()}>测试校验</button>
    </div>
  );
}
