import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { serviceIcons } from "@/lib/icons";
import { getSettings } from "@/lib/localStorage";
import { fetchRadarrQueue, fetchSonarrQueue, fetchLidarrQueue } from "@/lib/mediaServices";
import { ArrControls } from "@/components/arr/ArrControls";

const ArrManager = () => {
  const { toast } = useToast();
  const settings = getSettings();
  const [selectedService, setSelectedService] = useState<'radarr' | 'sonarr' | 'lidarr'>('radarr');

  const { data: radarrData, refetch: refetchRadarr } = useQuery({
    queryKey: ['radarrQueue'],
    queryFn: fetchRadarrQueue,
    refetchInterval: 30000,
  });

  const { data: sonarrData, refetch: refetchSonarr } = useQuery({
    queryKey: ['sonarrQueue'],
    queryFn: fetchSonarrQueue,
    refetchInterval: 30000,
  });

  const { data: lidarrData, refetch: refetchLidarr } = useQuery({
    queryKey: ['lidarrQueue'],
    queryFn: fetchLidarrQueue,
    refetchInterval: 30000,
  });

  const RadarrIcon = serviceIcons.radarr;
  const SonarrIcon = serviceIcons.sonarr;
  const LidarrIcon = serviceIcons.lidarr;

  return (
    <div className="container mx-auto p-dynamic-4 space-y-dynamic-4">
      <h1 className="text-dynamic-2xl font-bold mb-dynamic-8">*Arr Services Manager</h1>

      <Tabs value={selectedService} onValueChange={(value: any) => setSelectedService(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="radarr" className="text-dynamic-base">
            <div className="flex items-center gap-2">
              <RadarrIcon className="w-4 h-4" />
              Radarr
            </div>
          </TabsTrigger>
          <TabsTrigger value="sonarr" className="text-dynamic-base">
            <div className="flex items-center gap-2">
              <SonarrIcon className="w-4 h-4" />
              Sonarr
            </div>
          </TabsTrigger>
          <TabsTrigger value="lidarr" className="text-dynamic-base">
            <div className="flex items-center gap-2">
              <LidarrIcon className="w-4 h-4" />
              Lidarr
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="radarr">
          <ArrControls 
            service="radarr"
            data={radarrData}
            credentials={settings.radarrCredentials}
            onRefresh={refetchRadarr}
          />
        </TabsContent>

        <TabsContent value="sonarr">
          <ArrControls 
            service="sonarr"
            data={sonarrData}
            credentials={settings.sonarrCredentials}
            onRefresh={refetchSonarr}
          />
        </TabsContent>

        <TabsContent value="lidarr">
          <ArrControls 
            service="lidarr"
            data={lidarrData}
            credentials={settings.lidarrCredentials}
            onRefresh={refetchLidarr}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArrManager;