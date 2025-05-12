import { RefresherEventDetail } from "@ionic/react";

export default function useRefresh(refreshers: { (): void }[]) {
  const handleRefresh = (e: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      refreshers.forEach((refresher) => {
        refresher();
      });
      e.detail.complete();
    }, 2000);
  };

  return handleRefresh;
}

