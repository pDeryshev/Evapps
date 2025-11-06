"use client";

import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return {
    handleBack,
    router
  };
};