'use client';

type Props = {
  id: string;
  task: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
};

const Todo = ({ id, task, complete, toggleTodo }: Props) => {
  return (
    <li>
      <input
        id={id}
        type='checkbox'
        className='cursor-pointer peer'
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label htmlFor={id} className='peer-checked:line-through'>
        {task}
      </label>
    </li>
  );
};

export default Todo;
