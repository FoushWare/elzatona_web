import Link from 'next/link';

export function EmptyState() {
  return (
    <div className='text-center py-8 sm:py-12 px-4'>
      <div className='text-4xl sm:text-6xl mb-4'>🔍</div>
      <h3 className='text-lg sm:text-xl font-semibold text-foreground mb-2'>
        No learning paths found
      </h3>
      <p className='text-muted-foreground mb-4 text-sm sm:text-base'>
        Check out our other learning resources
      </p>
      <div className='flex justify-center'>
        <Link
          href='/study-plans'
          className='px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm sm:text-base'
        >
          View Study Plans
        </Link>
      </div>
    </div>
  );
}
