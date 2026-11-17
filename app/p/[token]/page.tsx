import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectByToken, listFeedback, listProjectItems } from '@/backend/workflow';
import { getInvoice } from '@/backend/invoices';
import ProjectClientView from '@/components/projects/ProjectClientView';
import InvoiceUnavailable from '@/components/invoices/InvoiceUnavailable';

// Private client project page: secret link, not indexed, no tracking, no referrer to other sites.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Your project',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

export default async function ClientProjectPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  let project;
  try {
    project = await getProjectByToken(token);
  } catch (error) {
    console.error('Client project load failed:', error);
    return <InvoiceUnavailable reason="error" />;
  }
  if (!project) notFound();

  const [items, feedback] = await Promise.all([listProjectItems(project.id), listFeedback(project.id)]).catch((error) => {
    console.error('Client project details failed:', error);
    return [[], []] as [Awaited<ReturnType<typeof listProjectItems>>, Awaited<ReturnType<typeof listFeedback>>];
  });

  let invoiceLink = '';
  if (project.invoiceId) {
    const inv = await getInvoice(project.invoiceId).catch(() => null);
    if (inv?.publicToken && inv.status !== 'draft' && inv.status !== 'void') invoiceLink = `/i/${inv.publicToken}`;
  }

  return (
    <ProjectClientView
      token={token}
      project={{
        title: project.title,
        stage: project.stage,
        clientName: project.clientName,
        clientBusiness: project.clientBusiness,
        stagingUrl: project.stagingUrl,
        liveUrl: project.liveUrl,
        roundsIncluded: project.roundsIncluded,
        launchApprovedAt: project.launchApprovedAt,
        launchApprovedName: project.launchApprovedName,
      }}
      initialItems={items}
      initialFeedback={feedback}
      invoiceLink={invoiceLink}
    />
  );
}
