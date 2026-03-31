import { useSavedBuilds } from "./hooks/use-saved-builds";
import { BuildCard } from "./components/build-card";

const SavedBuildsPage = () => {
  const { builds, loading } = useSavedBuilds();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-36 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Saved Builds</h1>
        <p className="text-sm text-muted-foreground">{builds.length} configurations saved</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {builds.map((build) => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>
    </div>
  );
};

export default SavedBuildsPage;
