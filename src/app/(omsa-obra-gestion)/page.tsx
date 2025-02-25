import { auth } from '@/auth.config';
import { HomeSections } from '@/components';
// import { RunSeedButton } from '@/components/seed/RunSeedButton';

export default async function Home() {

  const session = await auth();
  
  return (
    <main className="flex flex-col items-center justify-between space-y-8 mt-10">
      <HomeSections userRole={session?.user.role} />
      {/* <RunSeedButton /> */}
    </main>
  );
}
