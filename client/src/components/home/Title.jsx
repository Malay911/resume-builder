import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className="text-center max-w-2xl mx-auto px-4 my-6">
      <h2 className="text-3xl md:text-4xl font-bold gradient-text">{title}</h2>
      {description && (
        <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      )}
    </div>
  )
}

export default Title