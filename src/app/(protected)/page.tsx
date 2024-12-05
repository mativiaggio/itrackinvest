import { Welcome } from "@/components/welcome";
import GeckoCryptoCoinList from '@/components/widgets/gecko-widget-coin-list';
import MarketTickerWidget from '@/components/widgets/gecko-widget-ticker-list';
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <>
      <div className="page-wrapper">
        <Welcome user={user} />
        <div className='flex flex-col lg:flex-row gap-2'>
        <GeckoCryptoCoinList />
        <MarketTickerWidget/>
        </div>
      </div>
    </>
  );
}
