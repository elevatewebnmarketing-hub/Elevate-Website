import MarketPage, { marketMetadata } from '@/components/sections/MarketPage';
import { usPage } from '@/lib/market-pages';

export const metadata = marketMetadata(usPage, 'en_US');

export default function UsPage() {
  return <MarketPage config={usPage} country="United States" />;
}
