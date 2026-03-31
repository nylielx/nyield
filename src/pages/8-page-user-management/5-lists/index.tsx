import { useLists } from "./hooks/use-lists";
import { ListCard } from "./components/list-card";

const ListsPage = () => {
  const { lists, loading } = useLists();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-40 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Lists</h1>
        <p className="text-sm text-muted-foreground">{lists.length} collections</p>
      </div>
      <div className="space-y-4">
        {lists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
