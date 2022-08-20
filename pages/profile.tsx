import type { NextPage } from 'next'
import { prisma } from '../lib/prisma';
import { useProfile } from '../src/components/Profile/hooks';
import { getSession } from '@auth0/nextjs-auth0';

const Profile: NextPage = ({ user }) => {
  console.log('---USER', user);
  return (
    <>
      <div>
        User Profile
      </div>
      <div>
        { user?.email }
      </div>
      {/* <div>
        Created At
        { profile?.createdAt }
      </div>
      <div>
        Updated At
        { profile?.updatedAt }
      </div> */}
    </>
  )
}

export const getServerSideProps = async ({ req, res, params }) => {
  const { user } = getSession(req, res);

  // const id = params.id;
  // const link = await prisma.link.findUnique({
  //   where: { id },
  //   select: {
  //     id: true,
  //     title: true,
  //     category: true,
  //     url: true,
  //     imageUrl: true,
  //     description: true,
  //   },
  // });
  return {
    props: {
      user,
    },
  };
};

export default Profile
