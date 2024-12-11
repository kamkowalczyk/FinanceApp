'use client';

import React from 'react'

const ResponsiveGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">Item 1</div>
      <div className="bg-white p-4 rounded shadow">Item 2</div>
      <div className="bg-white p-4 rounded shadow">Item 3</div>
    </div>
  )
}

export default ResponsiveGrid