import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MediaTab = () => {
  return (
    <Tabs defaultValue="arr" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="arr">*Arr Services</TabsTrigger>
        <TabsTrigger value="torrent">qBittorrent</TabsTrigger>
      </TabsList>
      <TabsContent value="arr" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>*Arr Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Placeholder for *Arr services data */}
            <div className="text-sm text-muted-foreground">
              Configure *Arr services in settings
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="torrent" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>qBittorrent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Placeholder for qBittorrent data */}
            <div className="text-sm text-muted-foreground">
              Configure qBittorrent in settings
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};