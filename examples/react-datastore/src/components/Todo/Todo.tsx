import React, { useState, FormEvent } from 'react';
import { Row, Col, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { EditTodo, ToggleTodo } from '../forms';
import { TodoProps } from '../../types';
import { useDeleteTodo } from '../../helpers/hooks';

export const Todo = ({ todo }: TodoProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const { deleteTodo } = useDeleteTodo();
  
  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    deleteTodo((t) => t.id('eq', todo.id))
    .then((res: any) => console.log(res))
    .catch((error: any) => console.log(error));
  };
  
  if (edit) {
    return (
      <EditTodo
        todo={todo}
        toggleEdit={() => setEdit(!edit)}
      />
    );
  }

  return (
    <Row justify="space-between">
        <Col>
          <ToggleTodo todo={todo} />
          <p>
            <b>Description: </b><br/>
            {todo.description}
          </p>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setEdit(true)}>
            <EditOutlined />
          </Button>
          <Button type="primary" onClick={handleDelete} danger>
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>
  );
};
