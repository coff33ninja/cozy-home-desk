import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ServiceCredentials } from "@/types/types";
import { Play, Pause, RefreshCw, Trash2 } from "lucide-react";

interface ArrControlsProps {
  service: 'radarr' | 'sonarr' | 'lidarr';
  data: any[];
  credentials: ServiceCredentials;
  onRefresh: () => void;
}

export const ArrControls = ({ service, data, credentials, onRefresh }: ArrControlsProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAction = async (action: string, itemId?: number) => {
    if (!credentials?.url || !credentials?.apiKey) {
      toast({
        title: "Configuration Error",
        description: `Please configure ${service} credentials in settings`,
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${credentials.url}/api/v3/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': credentials.apiKey,
        },
        body: itemId ? JSON.stringify({ id: itemId }) : null,
      });

      if (!response.ok) throw new Error(`${service} API error`);

      toast({
        title: "Success",
        description: `${action} completed successfully`,
      });

      onRefresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action}: ${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Queue Management</span>
          <div className="space-x-2">
            <Button size="sm" onClick={() => handleAction('queue/start')}>
              <Play className="w-4 h-4 mr-2" />
              Start Queue
            </Button>
            <Button size="sm" variant="secondary" onClick={() => handleAction('queue/pause')}>
              <Pause className="w-4 h-4 mr-2" />
              Pause Queue
            </Button>
            <Button size="sm" variant="outline" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Search Downloads</Label>
            <Input
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search downloads..."
              className="max-w-sm"
            />
          </div>

          <div className="space-y-2">
            {data?.filter(item => 
              item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item?.series?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item?.artist?.artistName?.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-2 bg-dark-card rounded-md">
                <span className="text-sm">
                  {item.title || item?.series?.title || item?.artist?.artistName}
                </span>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleAction('queue/grab', item.id)}>
                    Download Now
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleAction('queue/remove', item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};