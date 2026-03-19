import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(120deg, #0f172a 0%, #1e293b 45%, #3b82f6 100%)',
          color: '#ffffff',
          padding: '72px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: 26, opacity: 0.9 }}>Elevate Web & Marketing</div>
        <div style={{ marginTop: 18, fontSize: 68, fontWeight: 700, lineHeight: 1.06 }}>
          Build a Better Website
        </div>
        <div style={{ marginTop: 20, fontSize: 32, opacity: 0.95 }}>
          SEO-focused design for business growth
        </div>
      </div>
    ),
    size
  );
}
