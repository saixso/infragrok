# infragrok

A minimal personal feed for infrastructure insights, progress tracking, and ideas.

**Live:** [saixso.github.io/infragrok](https://saixso.github.io/infragrok)

## Adding Posts

Edit `posts/index.json` and add a new entry:

```json
{
  "id": "007",
  "type": "insight",        // insight | progress | idea
  "date": "2026-02-01",
  "title": "Optional Title",
  "content": "Your content here. Supports **bold**, `code`, and [links](url).",
  "tags": ["tag1", "tag2"],
  "metrics": {              // optional, for progress posts
    "Label": "Value"
  }
}
```

## Post Types

- **insight** — Learnings, observations, hot takes
- **progress** — Metrics, milestones, tracking
- **idea** — Raw ideas, experiments, explorations

## Local Development

```bash
# Serve locally (requires Python)
python -m http.server 8000

# Or use any static server
npx serve .
```

## Deploy

Push to `main` branch. GitHub Pages will automatically deploy from root.
