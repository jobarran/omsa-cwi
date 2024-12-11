import { auth } from '@/auth.config';
import { HomeSections, SectionTitle } from '@/components';


export default async function Home() {

  const session = await auth();
  
  return (
    <main className="flex flex-col items-center justify-between space-y-8">
      <SectionTitle label={'Aplicaciones'} />
      <HomeSections userRole={session?.user.role} />
    </main>
  );
}