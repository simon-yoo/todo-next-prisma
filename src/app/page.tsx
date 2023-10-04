import Link from 'next/link';
import prisma from './db';
import Todo from '@/components/Todo';

function fetchTodos() {
  return prisma.todo.findMany();
}

const toggleTodo = async (id: string, complete: boolean) => {
  'use server';
  await prisma.todo.update({ where: { id }, data: { complete } });
};

const handleDelete = async (id: string) => {
  'use server';
  await prisma.todo.delete({ where: { id } });
};

const handleEdit = async (id: string, task: string) => {
  'use server';
  await prisma.todo.update({ where: { id }, data: { task } });
};

const Home = async () => {
  const todos = await fetchTodos();
  return (
    <div className='flex flex-col gap-4 items-center justify-center mt-12'>
      <h1 className='text-4xl'>Home</h1>
      <Link href='/new' className='border-2 border-white p-4'>
        New Todos
      </Link>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
