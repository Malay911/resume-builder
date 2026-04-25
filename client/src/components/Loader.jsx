import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-3' style={{ background: 'var(--bg-body)' }}>
      <div className="flex items-center gap-1.5">
        <div className="size-3 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="size-3 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="size-3 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <p className="text-sm font-medium text-slate-400">Loading...</p>
    </div>
  )
}

export default Loader