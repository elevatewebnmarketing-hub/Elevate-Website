import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0ea5e9 100%)',
          color: '#ffffff',
          padding: '72px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.9 }}>Elevate Web & Marketing</div>
        <div style={{ marginTop: 20, fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          Websites That Convert
        </div>
        <div style={{ marginTop: 24, fontSize: 34, opacity: 0.95 }}>
          Web Design, SEO, and Digital Marketing
        </div>
      </div>
    ),
    size
  );
}
