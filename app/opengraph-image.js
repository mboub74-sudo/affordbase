import { ImageResponse } from 'next/og';

export const alt = 'AffordBase — free affordability calculators for Canada and the US';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#173f2b', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', fontSize: 42, fontWeight: 700 }}>AffordBase.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', fontSize: 66, fontWeight: 700 }}>Know what you can afford.</div>
        <div style={{ display: 'flex', fontSize: 30, color: '#d4e5ca' }}>Salary · Rent · Car · Home · Savings</div>
      </div>
      <div style={{ display: 'flex', fontSize: 25 }}>Free calculators for Canada and the United States</div>
    </div>,
    size
  );
}
