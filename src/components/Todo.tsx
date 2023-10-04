'use client';

import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  id: string;
  task: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string, task: string) => void;
};

const Todo = ({
  id,
  task,
  complete,
  toggleTodo,
  handleDelete,
  handleEdit,
}: Props) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState('');

  return (
    <li className='w-[300px] m-4 p-2 border-2 border-white '>
      {!editing && (
        <div className='flex justify-between items-center'>
          <div>
            <input
              id={id}
              type='checkbox'
              className='cursor-pointer peer mr-4'
              defaultChecked={complete}
              onChange={(e) => toggleTodo(id, e.target.checked)}
            />
            <label
              htmlFor={id}
              className='peer-checked:line-through'
              onDoubleClick={() => setEditing((prev) => !prev)}
            >
              {task}
            </label>
          </div>
          <div>
            <button
              className='border border-white p-2 text-red-400 m-2'
              onClick={() => {
                handleDelete(id);
                router.refresh();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {editing && (
        <>
          <div className='w-full flex justify-between items-center p-2'>
            <div>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='text-black p-2'
                placeholder={task}
              />
            </div>
            <div>
              <button
                className='border border-white'
                onClick={() => {
                  setEditing(false);
                  handleEdit(id, input);
                  router.refresh();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Todo;
