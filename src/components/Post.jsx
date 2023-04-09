import React from 'react';


export const Post = ( { data }) => {
  return (
    <div>
        <div>
            post detail
            <h1>{data?.title}</h1>
            <h3>{data?.description}</h3>
            <img src={data?.imageUrl} alt="" />
            <div dangerouslySetInnerHTML={{__html:data?.body}}></div>
        </div>

    </div>
  )
}

