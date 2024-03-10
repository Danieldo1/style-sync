import React from 'react'

const Heading = ({title,subTitle}) => {
  return (
    <div className='w-full mb-5'>
        <p className="text-muted-foreground uppercase -mb-2">{subTitle}</p>
        <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  )
}

export default Heading