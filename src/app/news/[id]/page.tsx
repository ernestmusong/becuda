"use client"

import React, { useState, useEffect } from 'react';
import { events } from '@/data/news';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/components/common/loading';

export default function page ({ params }:{params: {id: string}}) {
  const [event, setEvent] = useState<any>(null);
  useEffect(() => {
    const article = events?.find((e) => e.id === params.id)
    console.log('article', article)
    setEvent(article)
  }, [params.id])
  if (event === null) return <div className="spinner-wrapper text-center vh-100"><Loading /></div>
  return(
    <div className="container-fluid post-detail">
      <div className="row">
        <div className="col- my-3 col-md-6 p-0 mx-auto">
            <div>
                <Image 
                    src={event.img} 
                    alt="event"
                    className="img-fluid"
                    height={210}
                    width={700}
                    />
            </div>
        </div>
        {/* project text */}
        <div className="col-10 my-3 mx-auto  col-md-6  text-capitalize">
          <h1 style={{ color: 'Var(--heroWhite)' }}>
            {event.title}
            {' '}
          </h1>
           {event?.body.map((b: string) => <p style={{ color: 'Var(--softWhite)' }}>{b}</p>)}
          <div>
            <Link href="/news">
              <button type="button" className=" btn btn-small btns">back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}