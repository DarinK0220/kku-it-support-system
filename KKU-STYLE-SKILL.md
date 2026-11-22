# KKU Official UI Design System

This document defines the official visual and interaction standards for Khon Kaen University (KKU) web applications.

## 1. Color Palette

Use the following colors consistently across KKU web applications:

| Role | Color Name | Hex |
|---|---|---|
| Primary | Brick Red | `#A73B24` |
| Secondary | Dark Red | `#7A2817` |
| Accent | Gold | `#D4AF37` |
| Background | Light Gray | `#F8F9FA` |
| Surface | White | `#FFFFFF` |
| Text | Dark | `#1F2937` |

### Status Colors

| Status | Recommended Color | Hex |
|---|---|---|
| Pending | Amber | `#F59E0B` |
| In Progress | Blue | `#2563EB` |
| Completed | Green | `#16A34A` |

## 2. Typography

Use clean, modern sans-serif typography with a clear visual hierarchy.

Preferred font stack:

```css
font-family: "Prompt", "Sarabun", "Inter", sans-serif;
```

### Type Scale

| Element | Recommended Size | Weight |
|---|---:|---:|
| Page title | 32–36 px | 700 |
| Section title | 24–28 px | 700 |
| Card title | 18–20 px | 600 |
| Body | 16 px | 400 |
| Supporting text | 14 px | 400 |
| Label | 14 px | 600 |

Maintain sufficient contrast and line spacing. For Thai-language interfaces, favor Prompt or Sarabun and keep at least `1.5` line height for body text.

## 3. Layout and Components

### Institutional Header

- Use a clean, institutional header with recognizable KKU-style branding.
- Place the university name and application name prominently.
- Use the official KKU logo in the branding area:

```text
https://www.kku.ac.th/wp-content/uploads/2022/01/1.-official-logo-2022-27.png
```

```html
<img
  src="https://www.kku.ac.th/wp-content/uploads/2022/01/1.-official-logo-2022-27.png"
  alt="Khon Kaen University logo"
  class="brand-logo"
>
```

```css
.brand-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  flex: 0 0 48px;
}
```

- Use the Brick Red color for the branding bar or primary header structure.
- Keep navigation concise, legible, and consistently positioned.
- Use Gold only as an accent, not as a dominant background color.

### Card-Based Layout

- Organize related content in white cards on the Light Gray page background.
- Use subtle, restrained shadows so cards remain distinct without appearing heavy.
- Recommended card styling:

```css
.card {
  background: #FFFFFF;
  border: 1px solid rgba(31, 41, 55, 0.08);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(31, 41, 55, 0.08);
}
```

- Use consistent spacing, usually in multiples of 4 or 8 px.
- Keep card content aligned and avoid excessive decoration.

### Primary Buttons

- Primary action buttons must use Brick Red (`#A73B24`) as the background color.
- Use white text and maintain a clear hover state.
- Recommended styling:

```css
.button-primary {
  background: #A73B24;
  color: #FFFFFF;
  border: 1px solid #A73B24;
  border-radius: 8px;
  font-weight: 600;
}

.button-primary:hover {
  background: #7A2817;
  border-color: #7A2817;
}

.button-primary:focus-visible {
  outline: 3px solid rgba(212, 175, 55, 0.55);
  outline-offset: 2px;
}
```

- Do not use Gold for the main fill of primary buttons.
- Provide disabled, hover, and focus states for every interactive control.

### Status Badges

Use compact badges with text that clearly identifies the status:

| Status | Background | Text | Label Example |
|---|---|---|---|
| Pending | Amber | `#1F2937` or white, depending on contrast | Pending |
| In Progress | Blue | `#FFFFFF` | In Progress |
| Completed | Green | `#FFFFFF` | Completed |

Recommended badge styling:

```css
.status-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 600;
}

.status-pending {
  background: #F59E0B;
  color: #1F2937;
}

.status-in-progress {
  background: #2563EB;
  color: #FFFFFF;
}

.status-completed {
  background: #16A34A;
  color: #FFFFFF;
}
```

## 4. Accessibility and Consistency

- Maintain WCAG-compatible text and UI contrast.
- Do not communicate status by color alone; always include text or an icon.
- Use visible keyboard focus styles.
- Preserve semantic HTML and a logical heading hierarchy.
- Keep form labels visible and associate them with their controls.
- Use meaningful alt text for the official KKU logo.
- Respect reduced-motion preferences and avoid unnecessary animation.
- Use the same component patterns and spacing throughout the application.
