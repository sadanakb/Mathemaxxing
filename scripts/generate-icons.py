#!/usr/bin/env python3
"""Generate PWA icon PNGs from scratch (no dependencies)."""
import struct, zlib, os, math

def create_png(width, height, filepath):
    """Create a PNG icon with orange circle background and white M letter."""
    def pixel_color(x, y, w, h):
        cx, cy = w / 2, h / 2
        r = min(w, h) / 2
        dx, dy = x - cx, y - cy
        dist = math.sqrt(dx * dx + dy * dy)

        if dist > r:
            return (0, 0, 0, 0)

        # Anti-aliasing at edge
        alpha = 255
        if dist > r - 1.5:
            alpha = int(255 * max(0, (r - dist) / 1.5))

        # Orange gradient
        t = (x + y) / (w + h)
        rr = int(255 * (1 - t) + 255 * t)
        gg = int(139 * (1 - t) + 107 * t)
        bb = int(85 * (1 - t) + 53 * t)

        # M letter geometry
        margin = w * 0.22
        top = h * 0.25
        bottom = h * 0.75
        letter_w = w - 2 * margin
        stroke = letter_w * 0.16

        lx = x - margin
        ly = y - top
        lh = bottom - top

        is_m = False
        if top <= y <= bottom and margin <= x <= w - margin and lh > 0:
            if lx <= stroke:
                is_m = True
            elif lx >= letter_w - stroke:
                is_m = True
            elif lx <= letter_w / 2:
                diag_x = (ly / lh) * (letter_w / 2)
                if abs(lx - diag_x) < stroke * 0.8:
                    is_m = True
            else:
                diag_x = letter_w - (ly / lh) * (letter_w / 2)
                if abs(lx - diag_x) < stroke * 0.8:
                    is_m = True

        if is_m:
            return (255, 255, 255, alpha)

        return (rr, gg, bb, alpha)

    raw = bytearray()
    for y in range(height):
        raw.append(0)  # filter byte
        for x in range(width):
            r, g, b, a = pixel_color(x, y, width, height)
            raw.extend([r, g, b, a])

    def chunk(chunk_type, data):
        c = chunk_type + data
        crc = struct.pack('>I', zlib.crc32(c) & 0xFFFFFFFF)
        return struct.pack('>I', len(data)) + c + crc

    sig = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr = chunk(b'IHDR', ihdr_data)
    compressed = zlib.compress(bytes(raw), 9)
    idat = chunk(b'IDAT', compressed)
    iend = chunk(b'IEND', b'')

    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'wb') as f:
        f.write(sig + ihdr + idat + iend)

    print(f'Created {filepath} ({os.path.getsize(filepath)} bytes)')


if __name__ == '__main__':
    base = os.path.join(os.path.dirname(__file__), '..', 'public', 'icons')
    create_png(192, 192, os.path.join(base, 'icon-192.png'))
    create_png(512, 512, os.path.join(base, 'icon-512.png'))
    print('Done!')
