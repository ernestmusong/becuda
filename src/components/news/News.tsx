import { Title } from "../common/Headings";
import { events } from "@/data/news";
import Image from 'next/image';
import Link from 'next/link';

const News: React.FC = () => {
    return (
       <main>
            <section className="container">
              <Title title="news"/>
                <div className="posts-container mx-auto">
                {events?.map((event) => {
                    return(
                        <article className="mx-auto post-container">
                            <div className="post-img-wrapper bg-success">
                                <Image 
                                    className="img-fluid"
                                    src={event.img}
                                    alt="article"
                                    width={500}
                                    height={210}
                                    />
                            </div>
                        <div className="post-tiltle-wrapper py-1">
                            <h4 className="heading text-capitalize">{event.title}</h4>
                            <p>{event.desc}</p>
                        </div>
                        <div className="post-footer d-flex justify-content-between">
                            <p className="text-uppercase text-danger">{event.date}</p>
                            <Link href={`/news/${event.id}`}>
                              <button className=" btn btns text-uppercase">read more</button>
                            </Link>
                        </div>
                        </article>
                    )
                })}
                </div>
             
            </section>
       </main>
       
    );
  };
  
  export default News;