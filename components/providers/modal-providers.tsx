"use client";

import { useEffect, useState } from "react";
import SettingsModal from "../modals/SettingsModal";
import CoverImageModal from "../modals/CoverImageModal";

export default function ModalProviders() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
}
