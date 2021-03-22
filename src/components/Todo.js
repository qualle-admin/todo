import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import api from '../api';
import styled from 'styled-components';
import moment from 'moment';

import { Button, Input, Layout } from 'antd';

const { Header, Content } = Layout;

const StyledContent = styled(Content)(({
  padding: '20px',
}));

const StyledHeaderTag = styled.h1(({
  color: 'white',
}));

const InputGroup = styled(Input.Group)(({
  display: 'flex',
}));

const StyledInput = styled(Input)(({
  marginRight: '5px',
  textAlign: 'left !important',
}));

const Todo = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.collection('todos')
      .orderBy('date', 'desc')
      .onSnapshot(({ docs }) => {
        const todos = docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTodos(
          todos.map(({ id, todo, date }) => ({
            id,
            todo,
            date,
          }))
        );
      });
  }, []);

  const handleChange = (e) => setInput(e.target.value);

  const addTodos = (e) => {
    e.preventDefault();

    if (input) {
      api.collection('todos').add({
        todo: input,
        date: moment().toISOString(),
      });

      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <Layout>
      <Header>
        <StyledHeaderTag>
          Todo App
          <span role="img" aria-label="fire">
            🔥
          </span>
        </StyledHeaderTag>
      </Header>
      <StyledContent>
        <InputGroup>
          <StyledInput
            label="Add a todo..."
            type="text"
            variant="outlined"
            value={input}
            onChange={handleChange}
          />
          <Button
            onClick={addTodos}
            type="submit"
            disabled={!input}
          >
            Add
          </Button>
        </InputGroup>

        <TodoList todos={todos} />
      </StyledContent>
    </Layout >
  );
}

export default Todo;
