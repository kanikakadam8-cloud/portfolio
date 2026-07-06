# AI-mode images — how to add them

When the site's **AI toggle** is switched on, every image tries to load its
AI-generated twin from a mirror folder. **If the twin doesn't exist, the real
photo is shown instead** — so the site never breaks. You can fill these in
gradually.

## The rule: same path, same filename

To give any image an AI version, drop your AI-generated file at the **same
relative path and filename**, but under the `-ai` folder.

| Real image | AI version goes here |
|---|---|
| `images/mascot/mascot-front.png` | `images-ai/mascot/mascot-front.png` |
| `images/profile/kanika-profile.jpeg` | `images-ai/profile/kanika-profile.jpeg` |
| `work-experience/images/mad-hatter-lamp/mad-hatter-lamp-final.jpg` | `work-experience/images-ai/mad-hatter-lamp/mad-hatter-lamp-final.jpg` |
| `work-experience/images/curved-table/curved-table-cover.png` | `work-experience/images-ai/curved-table/curved-table-cover.png` |

Keep the **exact same filename and extension**. Match the aspect ratio of the
original reasonably closely so layouts stay clean.

## Priorities (highest visual impact first)

1. `images-ai/mascot/mascot-front.png` — the home mascot
2. Every `*-cover.*` in `work-experience/images-ai/<project>/` — the cards & marquee
3. `images-ai/profile/kanika-profile.jpeg` — the About photo
4. The rest of each project's images (for the case-study pages)

## Notes
- Folders are pre-created and mirror the real structure.
- You do not need to add all images — anything missing falls back to the photo.
- After adding images, just refresh; no code change needed.
