import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, InputNumber, Select, Typography } from "antd";
import { Todo } from "../../../context/types";
import { useTodoContext } from "../../../context/todo";

const { Option } = Select;

const taskTypes = [
  { value: "work", label: "Trabajo" },
  { value: "study", label: "Estudio" },
  { value: "exercise", label: "Ejercicio" },
  { value: "personal", label: "Personal" },
  { value: "shopping", label: "Compras" },
  { value: "miscellaneous", label: "Varios" },
];

const taskDurations = [
  { value: "5", label: "5 minutos" },
  { value: "15", label: "15 minutos" },
  { value: "30", label: "30 minutos" },
  { value: "60", label: "1 hora" },
  { value: "120", label: "2 horas" },
  { value: "240", label: "4 horas" },
  { value: "480", label: "8 horas" },
  { value: "1440", label: "1 día" },
  { value: "4320", label: "3 días" },
  { value: "10080", label: "1 semana" },
];

export const Formularium: React.FC = () => {
  const todoContext = useTodoContext();
  const [form] = Form.useForm();
  const formfill = todoContext.edit;

  useEffect(() => {
    if (formfill) {
      form.setFieldsValue(formfill);
    }
  }, [form, formfill]);

  const onFinish = (values: Todo) => {
    if (formfill?._id) {
      todoContext.handleUploadTask(values);
    } else {
      todoContext.handleAddTask(values);
    }
    form.resetFields();
  };

  return (
    <>
      <Typography.Title level={4} style={{ padding: "0px 20px" }}>
        Creación de Todos
      </Typography.Title>
      <Form layout="horizontal" style={{ padding: "30px 20px " }} onFinish={onFinish} form={form}>
        <Form.Item name="_id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="state" initialValue={false} hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Nombre de tarea vacío" }]}
        >
          <Input placeholder="Ingresa el nombre" />
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true, message: "Tipo de tarea vacío" }]}
        >
          <Select mode="tags" placeholder="Selecciona tipo de tarea">
            {taskTypes.map((type) => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="priority"
          rules={[
            {
              validator: (_, value) => {
                if (value < 1 || value > 5) {
                  return Promise.reject("Valor permitido (1 - 5)");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber placeholder="Ingresa la prioridad" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="duration"
          rules={[{ required: true, message: "Duración de tarea vacía" }]}
        >
          <Select allowClear placeholder="Selecciona la duración">
            {taskDurations.map((duration) => (
              <Option key={duration.value} value={duration.value}>
                {duration.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="standout" valuePropName="checked">
          <Checkbox>Destacar ?</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {formfill ? "Editar tarea" : "Crear tarea"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
