import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Download, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Result {
  id: string;
  video_url: string;
  title: string;
  clip_start: number;
  clip_end: number;
  caption: string;
  created_at: string;
}

interface ResultsTableProps {
  results: Result[];
  onRefresh: () => void;
}

const ResultsTable = ({ results, onRefresh }: ResultsTableProps) => {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("repurpose_results")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete result",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Result removed successfully",
      });
      onRefresh();
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `clipforge-results-${Date.now()}.json`;
    link.click();

    toast({
      title: "Exported",
      description: "Results downloaded as JSON",
    });
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
    )?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (results.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">
          No results yet. Upload a video to get started!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleExportJSON}>
          <Download className="mr-2 h-4 w-4" />
          Export JSON
        </Button>
      </div>

      {results.map((result) => {
        const embedUrl = getYouTubeEmbedUrl(result.video_url);
        const timestampUrl = embedUrl
          ? `${embedUrl}?start=${Math.floor(result.clip_start)}`
          : null;

        return (
          <Card key={result.id} className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Video Preview */}
              <div className="space-y-4">
                {timestampUrl ? (
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      width="100%"
                      height="100%"
                      src={timestampUrl}
                      title={result.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Video preview unavailable</p>
                  </div>
                )}

                <a
                  href={result.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View full video
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Clip Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                  <p className="text-muted-foreground mb-4">{result.caption}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Time:</span>
                    <span className="font-medium">
                      {Math.floor(result.clip_start / 60)}:
                      {String(Math.floor(result.clip_start % 60)).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Time:</span>
                    <span className="font-medium">
                      {Math.floor(result.clip_end / 60)}:
                      {String(Math.floor(result.clip_end % 60)).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">
                      {Math.floor(result.clip_end - result.clip_start)} seconds
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(result.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ResultsTable;
