import './unauthorise.css'
import { useRouter } from 'next/navigation';

const Unauthorise: React.FC = () => {
    const router = useRouter();
  return (
    <main className="main">
        <div className="lock"></div>
        <div className="message text-center">
          <h1 className="text">Access denied!</h1>
          <p>You do not have permission to access this page.</p>
          <button
              className="btn btn-danger btn-block w-100 mt-2"
              onClick={() => {
                router.back();
              }}
            >
              <span className="text-capitalize">go back</span>
            </button>
        </div>
</main>
  )
}

export default Unauthorise;