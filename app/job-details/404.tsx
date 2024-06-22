import Link from "next/link"

function Page404() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center gap-8 px-4 text-center w-full">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">404</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        href="/job"
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        prefetch={false}
      >
        Go back home
      </Link>
    </div>
  )
}

export default Page404
