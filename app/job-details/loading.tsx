function loading() {
  return (
      <div className="flex h-[100dvh] flex-col items-center justify-center gap-8 px-4 text-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-50" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading your job details...</p>
      </div>
    )
}

export default loading
