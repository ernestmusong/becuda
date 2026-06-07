import './user-not-found.css'
import { useRouter } from 'next/navigation';

const UserNotFound: React.FC = () => {
    const router = useRouter();
  return (
    <main className="main">
        <div className="message text-center">
          <h1 className="text">User not found!</h1>
          <p>The requested user with could not be found</p>
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

export default UserNotFound;