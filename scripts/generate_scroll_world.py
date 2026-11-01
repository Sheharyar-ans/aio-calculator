import os
import subprocess
import numpy as np
from PIL import Image

BRAIN_DIR = r"C:\Users\SG\.gemini\antigravity-ide\brain\7d708dee-cec7-4c5b-93ae-9eaa748cbcf3"
HERO_DIR = r"c:\Users\SG\OneDrive\Desktop\aio\assets\hero"
os.makedirs(HERO_DIR, exist_ok=True)

IMAGE_FILES = [
    os.path.join(BRAIN_DIR, "calc_finance_diorama_1793533090223.jpg"),
    os.path.join(BRAIN_DIR, "calc_health_diorama_1793533112976.jpg"),
    os.path.join(BRAIN_DIR, "calc_math_diorama_1793533136235.jpg"),
    os.path.join(BRAIN_DIR, "calc_utility_diorama_1793533164261.jpg"),
    os.path.join(BRAIN_DIR, "calc_aio_hub_diorama_1793533202987.jpg"),
]

OUT_W, OUT_H = 1280, 720
FPS = 60

# 1. Process and save WebP & JPG posters for each section
names = ["district-0-finance", "district-1-health", "district-2-math", "district-3-utility", "district-4-aio"]
images = []

for i, (path, name) in enumerate(zip(IMAGE_FILES, names)):
    img = Image.open(path).convert("RGB")
    img_resized = img.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)
    images.append(img_resized)
    
    jpg_path = os.path.join(HERO_DIR, f"{name}.jpg")
    webp_path = os.path.join(HERO_DIR, f"{name}.webp")
    img_resized.save(jpg_path, quality=90)
    img_resized.save(webp_path, quality=85, format="WEBP")
    print(f"Saved poster {name}")

# Also save default master poster
images[0].save(os.path.join(HERO_DIR, "aio-scroll-poster.webp"), quality=88, format="WEBP")
images[0].save(os.path.join(HERO_DIR, "aio-scroll-poster.jpg"), quality=90)

# 2. Render smooth camera movement video with ffmpeg raw pipe
output_video = os.path.join(HERO_DIR, "aio-scroll-world.mp4")

cmd = [
    "ffmpeg", "-y",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-s", f"{OUT_W}x{OUT_H}",
    "-pix_fmt", "rgb24",
    "-r", str(FPS),
    "-i", "-",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-profile:v", "high",
    "-crf", "18",
    "-preset", "faster",
    "-g", "6",                # Keyframe every 6 frames = 0.1s for ultra-fast scrubbing!
    "-movflags", "+faststart",
    output_video
]

process = subprocess.Popen(cmd, stdin=subprocess.PIPE)

def smoothstep(x):
    return x * x * (3 - 2 * x)

def render_zoomed(img, zoom, pan_x=0.0, pan_y=0.0):
    w, h = img.size
    crop_w = w / zoom
    crop_h = h / zoom
    
    cx = (w / 2.0) + pan_x * (w - crop_w) * 0.5
    cy = (h / 2.0) + pan_y * (h - crop_h) * 0.5
    
    left = max(0, min(w - crop_w, cx - crop_w / 2.0))
    top = max(0, min(h - crop_h, cy - crop_h / 2.0))
    right = left + crop_w
    bottom = top + crop_h
    
    cropped = img.crop((left, top, right, bottom))
    return cropped.resize((OUT_W, OUT_H), Image.Resampling.BILINEAR)

# Timings
DWELL_FRAMES = 140   # ~2.33s per realm
TRANS_FRAMES = 70    # ~1.16s transition between realms

N = len(images)
total_frames = N * DWELL_FRAMES + (N - 1) * TRANS_FRAMES
print(f"Rendering {total_frames} frames at {FPS}fps ({total_frames/FPS:.1f}s)...")

current_frame = 0

for i in range(N):
    img_current = images[i]
    
    # Dwell in scene i: smooth gentle zoom and subtle pan
    for f in range(DWELL_FRAMES):
        t = f / float(DWELL_FRAMES)
        s = smoothstep(t)
        zoom = 1.0 + 0.10 * s
        pan_x = 0.15 * s if (i % 2 == 0) else -0.15 * s
        pan_y = 0.08 * s
        frame_img = render_zoomed(img_current, zoom, pan_x, pan_y)
        process.stdin.write(np.array(frame_img, dtype=np.uint8).tobytes())
        current_frame += 1

    # Transition to scene i+1 (if not last)
    if i < N - 1:
        img_next = images[i + 1]
        for f in range(TRANS_FRAMES):
            t = f / float(TRANS_FRAMES)
            s = smoothstep(t)
            
            # Outgoing scene zooms in further and fades out
            zoom_out = 1.10 + 0.25 * s
            frame_out = np.array(render_zoomed(img_current, zoom_out, 0.15, 0.08), dtype=np.float32)
            
            # Incoming scene zooms from wide into focus and fades in
            zoom_in = 0.88 + 0.12 * s
            frame_in = np.array(render_zoomed(img_next, zoom_in, 0.0, 0.0), dtype=np.float32)
            
            # Cross-blend
            blend = frame_out * (1.0 - s) + frame_in * s
            blended_img = np.clip(blend, 0, 255).astype(np.uint8)
            process.stdin.write(blended_img.tobytes())
            current_frame += 1

process.stdin.close()
process.wait()
print(f"Successfully generated {output_video} ({current_frame} frames)")
