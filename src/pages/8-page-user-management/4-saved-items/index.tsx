import { useSavedItems } from "./hooks/use-saved-items";
import { SavedItemCard } from "./components/saved-item-card";

const SavedItemsPage = () => {
  const { items, loading } = useSavedItems();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Saved Items</h1>
        <p className="text-sm text-muted-foreground">{items.length} marketplace listings saved</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <SavedItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SavedItemsPage;
