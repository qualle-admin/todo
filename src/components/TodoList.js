import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  Avatar,
  Button,
  Input,
  List,
  Modal,
} from 'antd';

import { UserOutlined } from '@ant-design/icons';

import api from '../api';
import moment from 'moment';

const StyledList = styled(List)(({
  marginTop: '20px',
}));

const StyledListItem = styled(List.Item)(({
  '.ant-list-item-meta': {
    alignItems: 'center',
  }
}));

const InputGroup = styled(Input.Group)(({
  display: 'flex',
}));

const StyledInput = styled(Input)(({
  marginRight: '5px',
  textAlign: 'left !important',
}));

const TodoList = ({ todos }) => {
  const [openTodo, setOpenTodo] = useState(null);
  const [input, setInput] = useState('');

  const deleteTodo = (id) =>
    api.collection('todos').doc(id).delete();

  const handleClose = () => {
    setInput('');
    setOpenTodo(null);
  };

  const updateTodo = useCallback(async () => {
    const { id } = openTodo;

    await api.collection('todos').doc(id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setInput('');
    setOpenTodo(null);
  });

  return (
    <div>
      <Modal title="Edit Todo" visible={openTodo} onCancel={handleClose} footer={null}>
        <InputGroup>
          <StyledInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={updateTodo}
            type="submit"
            disabled={!input}
          >
            Update
          </Button>
        </InputGroup>
      </Modal>

      <StyledList
        dataSource={todos}
        renderItem={({ id, todo, date }) => (
          <StyledListItem
            actions={[
              <Button onClick={(e) => setOpenTodo({ id })}> Edit </Button>,
              <Button onClick={() => deleteTodo(id)}> Remove </Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size="large" icon={<UserOutlined />} />}
              title={todo}
            />
            <div>{moment(date).fromNow()}</div>
          </StyledListItem>
        )}
      />
    </div>
  );
}

export default TodoList;
