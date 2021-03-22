import React from 'react';
import { List } from 'antd';

export default ({ todos }) => {

  return (
    <List.Item button>
      <ListItemText primary={todo} secondary={date} />
      <Button
        onClick={(e) => setOpen(true)}
      >
        Edit
  </Button>
      <span className="space"></span>
      <Button
        onClick={deleteTodo}
      >
        Remove
  </Button>
    </List.Item>
  )
}