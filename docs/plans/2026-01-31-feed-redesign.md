# Feed Redesign: Ultra-Minimal Personal Feed

## Summary

Redesign infragrok from categorized posts (insights/progress/ideas) to a simple Twitter-like scrolling feed. No frills, just content.

## Header

```
Sai
Building systems, observing, learning and sharing
```

- No avatar
- No navigation tabs
- Just name + tagline

## Post Structure

Each post is identical:

```
Jan 30
Content here up to ~500 chars with **bold**,
`code`, and [links](url) supported.
#tag1 #tag2
```

- Date at top (relative or absolute)
- Content: ~500 char limit (2x Twitter)
- Inline markdown: bold, code, links
- Tags at bottom, display only (no filtering)
- No titles
- No type badges
- No metrics cards

## Visual Style

**Colors (dark theme)**
- Background: `#0d0d0d`
- Text: `#e0e0e0`
- Tags: `#4a9eff`
- Links: `#4a9eff`, underline on hover
- Date: `#666`

**Typography**
- System font stack
- Content: 16px
- Date/Tags: 14px

**Layout**
- Max-width: 600px, centered
- Posts separated by 1px `#222` divider
- Mobile-first

**No**: hover effects, shadows, cards, animations, icons

## Data Format

```json
{
  "posts": [
    {
      "date": "2026-01-30",
      "content": "Content with **bold** and [links](url).",
      "tags": ["infrastructure", "simplicity"]
    }
  ]
}
```

Removed: `id`, `type`, `title`, `metrics`

## Files to Change

1. `index.html` - Remove nav tabs, simplify header
2. `assets/css/style.css` - Strip to essentials
3. `assets/js/feed.js` - Simplify rendering logic
4. `posts/index.json` - Convert to new format
