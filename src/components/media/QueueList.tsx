interface QueueListProps {
  radarrData: any[];
  sonarrData: any[];
  lidarrData: any[];
}

export const QueueList = ({ radarrData, sonarrData, lidarrData }: QueueListProps) => {
  const RadarrIcon = serviceIcons.radarr;
  const SonarrIcon = serviceIcons.sonarr;
  const LidarrIcon = serviceIcons.lidarr;

  return (
    <Card className="relative p-dynamic-4 bg-background">
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2 text-lg flex items-center gap-2">
            <RadarrIcon className="w-5 h-5" />
            Radarr Queue
          </h3>
          {radarrData?.length ? (
            <ul className="space-y-2">
              {radarrData.map((item: any) => (
                <li key={item.id} className="text-sm">
                  {item.title} - {item.status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No movies in queue</p>
          )}
        </div>
        
        <div>
          <h3 className="font-medium mb-2 text-lg flex items-center gap-2">
            <SonarrIcon className="w-5 h-5" />
            Sonarr Queue
          </h3>
          {sonarrData?.length ? (
            <ul className="space-y-2">
              {sonarrData.map((item: any) => (
                <li key={item.id} className="text-sm">
                  {item.series.title} - {item.episode.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No shows in queue</p>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2 text-lg flex items-center gap-2">
            <LidarrIcon className="w-5 h-5" />
            Lidarr Queue
          </h3>
          {lidarrData?.length ? (
            <ul className="space-y-2">
              {lidarrData.map((item: any) => (
                <li key={item.id} className="text-sm">
                  {item.artist.artistName} - {item.album.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No music in queue</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};