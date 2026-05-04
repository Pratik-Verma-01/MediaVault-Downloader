import { History, Trash2 } from "lucide-react";

export interface HistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  source: string;
}

interface Props {
  items: HistoryItem[];
  onClear: (id: string) => void;
}

const HistoryCard = ({ items, onClear }: Props) => {
  return (
    <section className="glass-card mt-8 rounded-3xl p-6">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-neon-cyan" strokeWidth={2} />
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Recent Downloads</h2>
        </div>
        <span className="text-xs text-muted-foreground">{items.length} items</span>
      </header>

      <ul className="divide-y divide-white/5">
        {items.length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">No downloads yet.</li>
        )}
        {items.map((item) => (
          <li key={item.id} className="group flex items-center gap-4 py-3">
            <img
              src={item.thumbnail}
              alt=""
              className="h-12 w-20 flex-shrink-0 rounded-lg border border-white/10 object-cover"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.source}</p>
            </div>
            <button
              type="button"
              onClick={() => onClear(item.id)}
              aria-label="Remove from history"
              className="rounded-full p-2 text-muted-foreground icon-glow hover:bg-white/5"
            >
              <Trash2 className="h-4 w-4" strokeWidth={2} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HistoryCard;
