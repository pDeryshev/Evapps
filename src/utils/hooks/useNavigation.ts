"use client";

import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleProfile = () => {
    router.push('/profile')
  }

  return {
    handleBack,
    handleProfile,
    router
  };
};