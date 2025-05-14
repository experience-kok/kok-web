'use client';

import LoadingLottie from 'public/lotties/loading.json';

import { useIsMutating } from '@tanstack/react-query';

import LottieLoader from './lottie-loader';

export default function GlobalLoading() {
  const isMutating = useIsMutating();

  return (
    <>
      {isMutating > 0 && (
        <>
          <LottieLoader
            animationData={LoadingLottie}
            className="absolute top-1/2 left-1/2 z-[999] h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform md:h-60 md:w-60"
          />
          <div className="fixed inset-0 z-[998] flex items-center justify-center bg-black opacity-50" />
        </>
      )}
    </>
  );
}
