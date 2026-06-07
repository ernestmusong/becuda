'use client'

import '../unauthorise/unauthorise.css'
import { useRouter } from 'next/navigation';

interface PageProps {
  text: string
}

const NotFound: React.FC<PageProps> = ({text}) => {
  const router = useRouter();
  return (
        <div className="main">
          <div className="error">
            <div>4</div>
            <div className="zero"></div>
            <div>4</div>
         </div>
         <div className="text2 text-capitalize">{text}</div>
         <button
              className="btn btn-danger btn-block mt-2"
              onClick={() => {
                router.back();
              }}
            >
              <span className="text-capitalize">go back</span>
            </button>
      </div>
  )
}

export default NotFound;