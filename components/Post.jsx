import React from 'react';


function Post( { data }) {
  return (
    <div>
        <div>
            post detail
            <h1>{title}</h1>
            <h3>{data?.description}</h3>
            <img src={data?.imageUrl} alt="" />
            <div dangerouslySetInnerHTML={{__html:data?.body}}></div>
        </div>

    </div>
  )
}

export default Post