import { NextResponse } from 'next/server';
import type { FrontendTask, FrontendTaskFile } from 'libs/types';

const makeMockTask = (id: string): FrontendTask => {
  const files: FrontendTaskFile[] = [
    { id: 'f1', path: 'index.js', language: 'javascript', content: "console.log('hello')", starterContent: "console.log('hello')", solutionContent: "console.log('solution')" },
    { id: 'f2', path: 'utils.js', language: 'javascript', content: "export const add = (a,b)=>a+b;", starterContent: "export const add = (a,b)=>a+b;", solutionContent: "export const add = (a,b)=>a+b;" },
  ];

  const task: FrontendTask = {
    id,
    title: `Mock Frontend Task ${id}`,
    difficulty: 'easy',
    estimatedTimeMinutes: 15,
    author: { id: 'u1', name: 'QA Bot' },
    category: 'refactor',
    tags: ['javascript', 'beginner'],
    files,
    description: `<p>This is a mock task with ${files.length} files.</p>`,
  };

  return task;
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const task = makeMockTask(id);
    return NextResponse.json({ success: true, data: task });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
