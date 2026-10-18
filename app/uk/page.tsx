import MarketPage, { marketMetadata } from '@/components/sections/MarketPage';
import { ukPage } from '@/lib/market-pages';

export const metadata = marketMetadata(ukPage, 'en_GB');

export default function UkPage() {
  return <MarketPage config={ukPage} country="United Kingdom" />;
}
