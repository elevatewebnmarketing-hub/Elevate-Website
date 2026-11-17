import InvoiceUnavailable from '@/components/invoices/InvoiceUnavailable';

export default function ClientInvoiceNotFound() {
  return <InvoiceUnavailable reason="missing" />;
}
