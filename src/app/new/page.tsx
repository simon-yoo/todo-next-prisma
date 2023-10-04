import Link from 'next/link';
import prisma from '../db';
import { redirect } from 'next/navigation';

const New = () => {
  const handleSubmit = async (data: FormData) => {
    'use server';
    const task = data.get('task')?.valueOf();
    if (typeof task !== 'string' || task.length == 0) {
      return new Error('Invalid input');
    }
    await prisma.todo.create({
      data: {
        task,
        complete: false,
      },
    });
    redirect('/');
  };

  return (
    <div className='flex flex-col items-center'>
      <form action={handleSubmit} className='flex flex-col gap-4 mt-12'>
        <input type='text' name='task' className='text-black' />
        <Link href='/' className='border-2 border-white text-center'>
          Cancel
        </Link>
        <button type='submit' className='border-2 border-white'>
          Create
        </button>
      </form>
    </div>
  );
};

export default New;
