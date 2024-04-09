import { DeleteOutlined, EditOutlined } from "@ant-design/icons/lib/icons";
import { useTodoContext } from "../../../context/todo";
import { Popconfirm, Space, Switch, Table, Tag, message } from "antd";
import { Todo } from "../../../context/types";
import React from "react";

interface DataType extends Todo {
  tags: string[];
}

export const TableCustom: React.FC = () => {
  const { todos, handleRemoveTask, handleEditTask, handleSwitchState } =
    useTodoContext();

  const handleRemove = (id: string) => {
    handleRemoveTask(id);
    message.success("Tarea borrada exitosamente");
  };

  const handleEdit = (record: Todo) => {
    handleEditTask(record);
  };

  const handleChangeState = (record: Todo) => {
    handleSwitchState(record);
  };

  const rowClassName = (record: DataType) => {
    return record.standout ? "standout-row" : "";
  };

  const columns = [
    {
      title: "Nombre de tarea",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Prioridad",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Duración",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Estado",
      key: "state",
      render: (record: DataType) => (
        <Switch
          defaultChecked={record.state}
          onChange={() => handleChangeState(record)}
        />
      ),
    },
    {
      title: "Acciones",
      key: "action",
      render: (record: Todo) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Borrar la tarea"
            description="¿Estás seguro de borrar esta tarea?"
            onConfirm={() => handleRemove(record._id)}
            okText="Si"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowClassName={rowClassName}
      columns={columns}
      dataSource={todos.map((item) => ({
        ...item,
        tags: item.type,
        key: item._id,
      }))}
      style={{ overflow: "auto" }}
    />
  );
};
