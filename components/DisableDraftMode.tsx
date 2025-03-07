"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const DisableDraftMode = () => {
  const environment = useDraftModeEnvironment();
  const router = useRouter();

  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  const handleClick = async () => {
    await fetch("/draft-mode/disable");
    router.refresh();
  };

  return (
    <Button onClick={handleClick} variant="outline">
      Disable Draft Mode
    </Button>
  );
};
