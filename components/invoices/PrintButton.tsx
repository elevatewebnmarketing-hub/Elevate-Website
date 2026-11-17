'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="px-5 py-2 bg-[#0B1F3A] text-white font-semibold rounded-lg hover:bg-[#13305a]"
    >
      Download PDF
    </button>
  );
}
