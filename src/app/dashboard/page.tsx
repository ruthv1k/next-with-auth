'use client';

import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const session = useSession();

  console.log(session);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
