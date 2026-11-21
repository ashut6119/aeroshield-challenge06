import os
import subprocess
import wave
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont
import win32com.client

# Video Configuration
WIDTH = 1920
HEIGHT = 1080
FPS = 25

OUTPUT_DIR = os.path.abspath("demo_video_assets")
os.makedirs(OUTPUT_DIR, exist_ok=True)
FINAL_VIDEO_PATH = os.path.abspath("AeroShield_Project_Demo_Walkthrough.mp4")

# Fonts
FONT_TITLE = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 52)
FONT_SUBTITLE = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 30)
FONT_HEADING = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 26)
FONT_BODY = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 22)
FONT_BADGE = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 18)
FONT_SMALL = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 16)

# Scenes Data
SCENES = [
    {
        "id": 1,
        "step_label": "CHALLENGE 06 INTRODUCTION",
        "title": "AeroShield: AI Urban Air Quality Assistant",
        "subtitle": "Google for Developers PromptWars Virtual • Winter Smog Defense for Families",
        "cards": [
            {
                "title": "The Severe Winter Smog Crisis",
                "color": "#ef4444",
                "items": [
                    "Thermal Inversion Trap: Cold ground air is capped beneath warm atmosphere.",
                    "PM2.5 Spikes: Particulate density exceeds 350-450 ug/m3 (24x WHO limit).",
                    "High Family Risk: Toddlers breathe 2x faster; elderly face cardiac stress."
                ]
            },
            {
                "title": "AeroShield Dual-Mission Solution",
                "color": "#10b981",
                "items": [
                    "AI Low-Emission Routines: Decouples school & cooking from peak smog hours.",
                    "Indoor Air Hacks Studio: DIY Corsi-Rosenthal CADR filtration at 1/5th cost.",
                    "Powered by Google Gemini 2.0: Strict JSON schemas & clinical guardrails."
                ]
            }
        ],
        "speech": "Welcome to AeroShield, an AI Urban Air Quality Assistant built for Challenge 06 of Google for Developers PromptWars Virtual. Every winter, major urban regions face severe smog crises caused by radiation temperature inversions that trap toxic PM 2.5 particulates at ground level. AeroShield empowers families to survive winter smog through personalized low-emission routines, diurnal inversion scheduling, and hospital-grade indoor air hacks."
    },
    {
        "id": 2,
        "step_label": "STEP 1 • METEOROLOGICAL MONITORING",
        "title": "Real-Time Smog Dashboard & The Diurnal Trough",
        "subtitle": "Exploiting Solar Atmospheric Mixing Windows to Protect Families",
        "cards": [
            {
                "title": "Hyperlocal Sensor Station (Anand Vihar, New Delhi)",
                "color": "#8b5cf6",
                "items": [
                    "AQI 418 (Severe+ Emergency) • Primary Pollutant: PM2.5 at 365 ug/m3.",
                    "Surface Temperature: 13 C • Humidity: 86% • Calm Wind (4.2 km/h).",
                    "Open-Meteo Live API + Global Hotspots (Delhi, Lahore, Beijing, Salt Lake City)."
                ]
            },
            {
                "title": "The 24-Hour Diurnal Inversion Curve",
                "color": "#38bdf8",
                "items": [
                    "06:00 - 09:00 AM Peak: Inversion lid is lowest; dangerous to jog or vent.",
                    "01:30 - 03:30 PM Diurnal Trough: Sunlight breaks inversion lid; PM2.5 drops ~40%!",
                    "AeroShield Action: Automatically shifts family transit into this exact safe window."
                ]
            }
        ],
        "speech": "Step 1 is our real-time Smog Dashboard. AeroShield integrates live air quality sensor feeds across urban hotspots like New Delhi, Lahore, and Salt Lake City. More importantly, it models the 24-hour Diurnal Temperature Inversion curve. Notice that between 1:30 PM and 3:30 PM, solar warming breaks the cold atmospheric lid, creating a diurnal trough where PM 2.5 drops by nearly 40 percent. AeroShield actively schedules indispensable outdoor tasks and room air exchanges into this exact safe window."
    },
    {
        "id": 3,
        "step_label": "STEP 2 • FAMILY PROFILING",
        "title": "Family Smog Vulnerability Matrix",
        "subtitle": "Personalized Risk Calculation Beyond Generic Weather Forecasts",
        "cards": [
            {
                "title": "Household Demographics & Physiology",
                "color": "#f59e0b",
                "items": [
                    "Toddlers (0-5 yrs): Higher respiratory rate; alveolar lungs still developing.",
                    "Elderly (65+ yrs) & COPD: Heightened systemic pulmonary and cardiac inflammation.",
                    "Pre-existing Conditions: Asthma, bronchitis, and allergies flagged for rescue inhalers."
                ]
            },
            {
                "title": "Housing Envelope & Vulnerability Score (85/100)",
                "color": "#ec4899",
                "items": [
                    "Window Tightness: Single-pane drafts cause stack-effect particulate pull.",
                    "Kitchen Dynamics: Unvented oil cooking creates extreme indoor aerosol spikes.",
                    "Sanctuary Zoning: Focuses limited purifiers into the primary sleeping bedroom."
                ]
            }
        ],
        "speech": "Step 2 is our Family Smog Vulnerability Matrix. Generic air quality advice fails because family risk varies dramatically. Toddlers breathe twice as fast as adults relative to body weight, and seniors face severe cardiovascular stress. AeroShield evaluates household demographics, window draftiness, kitchen exhaust efficiency, and existing purifiers to calculate a tailored vulnerability score and prescribe immediate protective zoning."
    },
    {
        "id": 4,
        "step_label": "STEP 3 • AI ROUTINE GENERATION",
        "title": "Gemini AI 24-Hour Low-Emission Routine",
        "subtitle": "Direct Habit Decoupling • High-Emission vs. AeroShield Routine",
        "cards": [
            {
                "title": "Morning & Commute Habit Decoupling",
                "color": "#ef4444",
                "items": [
                    "Default High-Risk Habit: Idling car with heater on at school drop-off gates.",
                    "AeroShield Low-Emission Routine: Neighbor carpool + zero-idling school zone.",
                    "Health Hack: Molded N95/KF94 respirators (cloth masks leak over 70% PM2.5)."
                ]
            },
            {
                "title": "Kitchen & Cleaning Protocol",
                "color": "#10b981",
                "items": [
                    "Negative-Pressure Cooking: Run exhaust 2 mins prior; lids on; avoid night frying.",
                    "Damp-Mop Protocol: Strictly no dry sweeping (brooms resuspend settled micro-dust).",
                    "Adherence Tracker: Interactive checkboxes with celebratory confetti feedback!"
                ]
            }
        ],
        "speech": "Step 3 is our AI-generated 24-Hour Low-Emission Routine, powered by Google Gemini. The system decouples high-emission habits from peak smog hours. It enforces zero engine idling at school gates, schedules negative-pressure cooking to prevent indoor frying spikes, and mandates a damp-mop cleaning protocol to prevent particulate resuspension. Families can track daily adherence with interactive milestones."
    },
    {
        "id": 5,
        "step_label": "STEP 4 • INDOOR HACKS STUDIO",
        "title": "Indoor Air Hacks Studio & DIY CADR Purifier",
        "subtitle": "Hospital-Grade Clean Air Delivery Rate (CADR) for Under $70",
        "cards": [
            {
                "title": "Interactive Corsi-Rosenthal CADR Calculator",
                "color": "#10b981",
                "items": [
                    "Formula: Required CADR (CFM) = (Room Volume in cu ft * Target ACH) / 60.",
                    "Example 220 sq ft room at 5 ACH requires 168 CFM clean air flow.",
                    "DIY 4-Filter Comparetto Cube: 4x MERV-13 filters + 20\" box fan = 420 CFM!",
                    "Build Cost: $65 total (matches or outperforms $400+ commercial units)."
                ]
            },
            {
                "title": "Zero-Cost Sealing & Dangerous Myth Busters",
                "color": "#f59e0b",
                "items": [
                    "Damp-Towel Door Barrier: Blocks cold street-level particulate infiltration.",
                    "Myth: 'Houseplants filter winter smog' -> False: Overwatering breeds mold spores.",
                    "Myth: 'Ionizers clean air' -> False: Ionizers emit harmful respiratory ozone (O3)."
                ]
            }
        ],
        "speech": "Step 4 is our Indoor Air Hacks Studio. Many families cannot afford multiple commercial air purifiers. Our interactive CADR calculator sizes a DIY Corsi-Rosenthal box using four MERV-13 furnace filters, a box fan, and a cardboard shroud. This setup delivers 420 CFM of clean air for under 70 dollars, outperforming commercial purifiers that cost over 400 dollars. The studio also busts dangerous myths, explaining why houseplants cannot filter PM 2.5 and warning against hazardous ozone ionizers."
    },
    {
        "id": 6,
        "step_label": "STEP 5 • PROMPT ARCHITECTURE & SUMMARY",
        "title": "Prompt Architecture & Submission Excellence",
        "subtitle": "Google for Developers PromptWars Virtual • Top 400 Submission",
        "cards": [
            {
                "title": "Prompt Engineering & Evaluation Scorecard",
                "color": "#6366f1",
                "items": [
                    "Master System Persona: Pediatric Pulmonology + Filtration + Sustainable Transit.",
                    "Chain-of-Thought (CoT): 4-step sequence (Vulnerability -> Inversion -> Habit -> CADR).",
                    "Strict JSON Schema: Eliminates hallucination for reliable production rendering.",
                    "Zero-Setup Fallback: High-fidelity heuristics work out-of-the-box with or without API key."
                ]
            },
            {
                "title": "Project Deliverables & Repository",
                "color": "#10b981",
                "items": [
                    "1-Page Printable Emergency Fridge Card: One-click family emergency plan.",
                    "GitHub Repository: https://github.com/ashut6119/aeroshield-challenge06",
                    "Ready for Vercel deployment and PromptWars dashboard evaluation!"
                ]
            }
        ],
        "speech": "Finally, AeroShield was built for PromptWars evaluation transparency. Our dedicated Prompt Architecture modal discloses our master system instructions, Chain-of-Thought reasoning steps, and strict JSON schemas, paired with a zero-setup fallback engine. Families can export a one-page emergency survival plan for their refrigerator with a single click. AeroShield is fully built, tested, and ready for submission to claim a Top 400 rank in Google for Developers PromptWars. Thank you!"
    }
]

def render_scene_slide(scene, output_path):
    # 1920x1080 canvas
    img = Image.new("RGB", (WIDTH, HEIGHT), color="#090d16")
    draw = ImageDraw.Draw(img)

    # Gradient-like background cards
    draw.rectangle([0, 0, WIDTH, HEIGHT], fill="#090d16")
    
    # Outer decorative glow
    draw.rounded_rectangle([30, 30, WIDTH - 30, HEIGHT - 30], radius=24, outline="#1e293b", width=2)

    # Top Brand Header
    draw.rounded_rectangle([60, 50, 340, 95], radius=12, fill="#064e3b", outline="#10b981", width=1)
    draw.text((80, 62), "AeroShield AI", fill="#ffffff", font=FONT_HEADING)
    draw.text((250, 66), "Challenge 06", fill="#6ee7b7", font=FONT_BADGE)

    # Step label & Timecode
    draw.rounded_rectangle([WIDTH - 460, 50, WIDTH - 60, 95], radius=12, fill="#1e1b4b", outline="#6366f1", width=1)
    draw.text((WIDTH - 440, 62), f"SCENE {scene['id']}/6 • {scene['step_label']}", fill="#c7d2fe", font=FONT_BADGE)

    # Main Title & Subtitle Card
    draw.rounded_rectangle([60, 120, WIDTH - 60, 245], radius=18, fill="#0f172a", outline="#334155", width=2)
    draw.text((90, 138), scene["title"], fill="#ffffff", font=FONT_TITLE)
    draw.text((90, 202), scene["subtitle"], fill="#34d399", font=FONT_SUBTITLE)

    # Two Main Presentation Columns
    col_w = (WIDTH - 150) // 2
    for idx, card in enumerate(scene["cards"]):
        cx = 60 + idx * (col_w + 30)
        cy = 270
        cw = col_w
        ch = 720

        # Card container
        draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=20, fill="#0b1120", outline=card["color"], width=2)

        # Card Header Pill
        draw.rounded_rectangle([cx + 25, cy + 25, cx + cw - 25, cy + 85], radius=12, fill="#1e293b")
        draw.text((cx + 45, cy + 38), card["title"], fill=card["color"], font=FONT_HEADING)

        # Items
        item_y = cy + 115
        for item in card["items"]:
            # bullet icon
            draw.text((cx + 35, item_y), ">", fill=card["color"], font=FONT_BODY)
            
            # wrap text
            words = item.split(" ")
            line = ""
            for word in words:
                test_line = line + word + " "
                bbox = draw.textbbox((0, 0), test_line, font=FONT_BODY)
                if (bbox[2] - bbox[0]) > (cw - 110):
                    draw.text((cx + 65, item_y), line, fill="#e2e8f0", font=FONT_BODY)
                    line = word + " "
                    item_y += 36
                else:
                    line = test_line
            if line:
                draw.text((cx + 65, item_y), line, fill="#e2e8f0", font=FONT_BODY)
                item_y += 48
            else:
                item_y += 18

    # Bottom Footer Watermark
    draw.text((60, 1020), "Google for Developers • PromptWars Virtual • Challenge 06: Urban Air Quality Assistant", fill="#64748b", font=FONT_SMALL)
    draw.text((WIDTH - 420, 1020), "Model: Google Gemini 2.0 Flash • 1080p HD", fill="#64748b", font=FONT_SMALL)

    img.save(output_path, "PNG")
    print(f"Rendered slide: {output_path}")

def generate_speech_wav(text, output_wav_path):
    speaker = win32com.client.Dispatch("SAPI.SpVoice")
    stream = win32com.client.Dispatch("SAPI.SpFileStream")
    stream.Open(output_wav_path, 3, False) # 3 = SSFMCreateForWrite
    speaker.AudioOutputStream = stream
    speaker.Rate = 0  # Normal speed
    speaker.Volume = 100
    speaker.Speak(text)
    stream.Close()
    print(f"Generated audio: {output_wav_path}")

def get_audio_duration(wav_path):
    with wave.open(wav_path, 'r') as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        return frames / float(rate)

def build_scene_video(scene_img, scene_audio, output_mp4, duration):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    # Add 1.2s padding so the slide doesn't cut abruptly after voiceover finishes
    total_duration = duration + 1.2

    cmd = [
        ffmpeg_exe,
        "-y",
        "-loop", "1",
        "-framerate", str(FPS),
        "-i", scene_img,
        "-i", scene_audio,
        "-c:v", "libx264",
        "-tune", "stillimage",
        "-t", str(total_duration),
        "-c:a", "aac",
        "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        output_mp4
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f"Created scene video: {output_mp4} ({total_duration:.1f}s)")

def main():
    print("=== Generating Official Project Demo Video for Challenge 06 ===")
    scene_mp4s = []

    for scene in SCENES:
        sid = scene["id"]
        img_path = os.path.join(OUTPUT_DIR, f"scene_{sid}.png")
        audio_path = os.path.join(OUTPUT_DIR, f"scene_{sid}_audio.wav")
        scene_mp4_path = os.path.join(OUTPUT_DIR, f"scene_{sid}.mp4")

        # 1. Render Graphic Slide
        render_scene_slide(scene, img_path)

        # 2. Generate Audio Narration
        generate_speech_wav(scene["speech"], audio_path)

        # 3. Measure duration
        dur = get_audio_duration(audio_path)

        # 4. Compile Scene MP4
        build_scene_video(img_path, audio_path, scene_mp4_path, dur)
        scene_mp4s.append(scene_mp4_path)

    # 5. Concatenate all scenes into final video
    concat_list_path = os.path.join(OUTPUT_DIR, "concat_list.txt")
    with open(concat_list_path, "w") as f:
        for p in scene_mp4s:
            # Escape path for ffmpeg concat
            escaped = p.replace("\\", "/")
            f.write(f"file '{escaped}'\n")

    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    print("Concatenating all scenes into final 1080p MP4...")
    concat_cmd = [
        ffmpeg_exe,
        "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_list_path,
        "-c", "copy",
        "-movflags", "+faststart",
        FINAL_VIDEO_PATH
    ]
    subprocess.run(concat_cmd, check=True)

    size_mb = os.path.getsize(FINAL_VIDEO_PATH) / (1024 * 1024)
    print(f"\nSUCCESS! Demo Video created: {FINAL_VIDEO_PATH}")
    print(f"File size: {size_mb:.2f} MB")

if __name__ == "__main__":
    main()
