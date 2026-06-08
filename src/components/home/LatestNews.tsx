import { Title2 } from "../common/Headings";
import { events } from "@/data/news";
import Image from 'next/image';
import Link from 'next/link';

const LatestNews: React.FC = () => {
    const latestEvents = events.slice(- 3);
    return (
       <main>
            <section className="container">
              <Title2 title="latest news"/>
                <div className="posts-container mx-auto">
                {latestEvents?.map((event) => {
                    return(
                        <article className="mx-auto post-container">
                            <div className="post-img-wrapper">
                                <Image 
                                    className="img-fluid post-img"
                                    src={event.img}
                                    alt="article"
                                    width={500}
                                    height={500}
                                    />
                            </div>
                        <div className="post-tiltle-wrapper py-1">
                            <h4 className="heading text-capitalize">{event.title}</h4>
                            <p>{event.desc}</p>
                        </div>
                        <div className="post-footer d-flex justify-content-between">
                            <p className="text-uppercase text-danger">{event.date}</p>
                            <Link href={`/news/${event.id}`}>
                              <button className=" btn btn-small btns text-uppercase">read more</button>
                            </Link>
                        </div>
                        </article>
                    )
                })}
                </div>
                  <Link  href="/news" className="mx-auto home-btn">go to news page</Link>
            </section>
       </main>
       
    );
  };
  
  export default LatestNews;