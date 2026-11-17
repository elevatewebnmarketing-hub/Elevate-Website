import InvoiceUnavailable from '@/components/invoices/InvoiceUnavailable';

export default function ClientProjectNotFound() {
  return <InvoiceUnavailable reason="missing" what="project page" />;
}
