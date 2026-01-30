class Feed {
    constructor() {
        this.posts = [];
        this.feedContainer = document.getElementById('feed');
        this.init();
    }

    async init() {
        await this.loadPosts();
        this.render();
    }

    async loadPosts() {
        try {
            const response = await fetch('posts/index.json');
            const data = await response.json();
            this.posts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Failed to load posts:', error);
            this.posts = [];
        }
    }

    render() {
        if (this.posts.length === 0) {
            this.feedContainer.innerHTML = '<p style="color: var(--text-muted)">No posts yet.</p>';
            return;
        }
        this.feedContainer.innerHTML = this.posts.map(post => this.renderPost(post)).join('');
    }

    renderPost(post) {
        const date = this.formatDate(post.date);
        const tags = post.tags ? post.tags.map(t => `<span class="tag">#${t}</span>`).join('') : '';
        const content = this.parseContent(post.content || '');

        return `
            <article class="post">
                <div class="post-date">${date}</div>
                <div class="post-content">${content}</div>
                ${tags ? `<div class="post-tags">${tags}</div>` : ''}
            </article>
        `;
    }

    parseContent(content) {
        if (!content) return '';
        return content
            .split('\n\n')
            .map(p => {
                // Images/GIFs: ![alt](url)
                p = p.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="post-image">');
                // Code
                p = p.replace(/`([^`]+)`/g, '<code>$1</code>');
                // Links: [text](url)
                p = p.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
                // Bold
                p = p.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                return `<p>${p}</p>`;
            })
            .join('');
    }

    formatDate(dateStr) {
        const date = new Date(dateStr + 'T12:00:00');
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 1) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new Feed());
