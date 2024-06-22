function Backdrop() {
  return (
    <div className='absolute top-0 backdrop-blur-xl flex justify-center items-center h-screen w-full space-x-2'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-8 w-8 bg-[#036666] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-8 w-8 bg-[#036666] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-8 w-8 bg-[#036666] rounded-full animate-bounce'></div>
</div>
  )
}

export default Backdrop
