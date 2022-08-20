import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0';

const Profile: NextPage = () => {
  const { user } = useUser();
  if (!user) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div>
        User Profile
      </div>
      <div>
        { user?.email }
      </div>
    </>
  )
}

export default Profile
