import { useEffect, useState } from "react";
import { getStudioSettings, studio, type StudioSettings } from "@/data/site";

export const useStudioSettings = (): StudioSettings => {
  const [settings, setSettings] = useState<StudioSettings>(studio);

  useEffect(() => {
    const refresh = () => setSettings(getStudioSettings());
    refresh();
    window.addEventListener("studio-settings-changed", refresh);
    return () => window.removeEventListener("studio-settings-changed", refresh);
  }, []);

  return settings;
};
