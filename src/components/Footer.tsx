export default function Footer() {
  return (
    <footer className="mt-12 py-8">
      <div className="max-w-6xl mx-auto px-6">
  <div className="p-6 rounded-2xl backdrop-blur-xl bg-semantic-surface-ghost border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-semantic-text-primary text-lg">DishQo — A Flavored Way To Live</div>
            <p className="text-sm text-semantic-text-muted">© {new Date().getFullYear()} Dishqo Cake. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-semantic-surface-ghost hover:shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-semantic-accent-gold"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12H20l-1.5 2.9v7A10 10 0 0 0 22 12z"/></svg>
            </a>

              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-semantic-surface-ghost hover:shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-semantic-accent-gold" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>
            </a>

              <a href="#" aria-label="WhatsApp" className="p-2 rounded-full bg-semantic-surface-ghost hover:shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-semantic-accent-gold"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .2 5 0 11.5c0 2 .5 3.8 1.5 5.5L0 24l7.2-1.9a11.4 11.4 0 0 0 4.8 1c6.6 0 11.8-5 12-11.5 0-3.2-1.3-6.2-3.5-8.1zM12 21.5c-1.4 0-2.8-.3-4.1-.9L5 20l.4-2.6A8.5 8.5 0 0 1 3.5 11.5 8.4 8.4 0 0 1 12 3.1c4.6 0 8.4 3.7 8.4 8.4 0 4.6-3.7 8.4-8.4 8.4zM17.2 14.2c-.2-.1-1.2-.6-1.4-.6-.2 0-.3 0-.5.2-.2.1-.7.4-.9.5-.2.1-.4.1-.6 0-.2-.1-.7-.3-1.3-.8-.5-.5-.9-1-1-1.2-.1-.2 0-.4.1-.6.1-.2.3-.5.4-.8.1-.2.1-.5 0-.8 0-.3-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4-.2 0-.5 0-.8 0-.3 0-.8.1-1.3.6-.5.5-1.8 1.8-1.8 4.4 0 2.5 2 4.8 2.3 5.1.3.3 4 6 10 6 1.9 0 3.8-.6 5.3-1.7-1.2-1.1-3.5-3.6-3.8-3.9z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
