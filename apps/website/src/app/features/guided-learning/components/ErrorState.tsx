"use client";

interface ErrorStateProps {
  readonly message: string;
}

export function ErrorState(props: Readonly<ErrorStateProps>) {
  const { message } = props;
  return (
    <div className="col-span-full text-center py-8">
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl">
        <strong className="font-semibold">Error:</strong> {message}
      </div>
    </div>
  );
}
