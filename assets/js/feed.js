// Feed functionality
class InfragrokFeed {
    constructor() {
        this.posts = [];
        this.currentFilter = 'all';
        this.feedContainer = document.getElementById('feed');
        this.init();
    }

    async init() {
        this.showLoading();
        await this.loadPosts();
        this.renderPosts();
        this.setupTabs();
    }

    showLoading() {
        this.feedContainer.innerHTML = '<div class="loading"></div>';
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

    renderPosts() {
        const filtered = this.currentFilter === 'all' 
            ? this.posts 
            : this.posts.filter(p => p.type === this.currentFilter);

        if (filtered.length === 0) {
            this.feedContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No posts yet</h3>
                    <p>Check back soon for updates.</p>
                </div>
            `;
            return;
        }

        this.feedContainer.innerHTML = filtered.map(post => this.renderPost(post)).join('');
    }

    renderPost(post) {
        const date = this.formatDate(post.date);
        const tags = post.tags ? post.tags.map(t => `<span class="tag">#${t}</span>`).join('') : '';
        const metrics = post.metrics ? this.renderMetrics(post.metrics) : '';
        
        return `
            <article class="post" data-id="${post.id}">
                <div class="post-header">
                    <span class="post-type ${post.type}">${post.type}</span>
                    <span class="post-date">${date}</span>
                </div>
                ${post.title ? `<h2 class="post-title">${post.title}</h2>` : ''}
                <div class="post-content">
                    ${this.parseContent(post.content)}
                </div>
                ${metrics}
                ${tags ? `<div class="post-tags">${tags}</div>` : ''}
            </article>
        `;
    }

    renderMetrics(metrics) {
        const items = Object.entries(metrics).map(([label, value]) => `
            <div class="metric">
                <div class="metric-value">${value}</div>
                <div class="metric-label">${label}</div>
            </div>
        `).join('');
        return `<div class="metrics">${items}</div>`;
    }

    parseContent(content) {
        // Simple markdown-like parsing
        return content
            .split('\n\n')
            .map(p => {
                // Code blocks
                p = p.replace(/`([^`]+)`/g, '<code>$1</code>');
                // Links
                p = p.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
                // Bold
                p = p.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                return `<p>${p}</p>`;
            })
            .join('');
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h`;
        if (diffDays < 7) return `${diffDays}d`;
        
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }

    setupTabs() {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentFilter = tab.dataset.filter;
                this.renderPosts();
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new InfragrokFeed();
});
