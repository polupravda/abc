import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export const SpeakerIcon = ({ className }: { className?: string }) => (
  <FontAwesomeIcon icon={faVolumeHigh} className={className} />
);
