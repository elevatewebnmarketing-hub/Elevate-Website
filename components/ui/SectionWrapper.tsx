interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Plain section. Sections used to fade in from opacity 0 on scroll, which left large blank areas until each one
 * entered the viewport (fast scrolling, anchor links, full-page captures, low-end phones). Content is now visible
 * by default.
 */
export default function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
