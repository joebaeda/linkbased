"use client"

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { frameConfig } from "@/lib/frameConfig";
import { FrameSplashProvider } from "./FrameSplashProvider";
import { FrameContextProvider } from "./FrameContextProvider";


const queryClient = new QueryClient();

export default function FrameProvider({ children }: { children: React.ReactNode }) {
  return (
    <FrameSplashProvider>
      <FrameContextProvider>
        <WagmiProvider config={frameConfig}>
          <QueryClientProvider client={queryClient}>
              {/* */}
              {children}
              {/* */}
          </QueryClientProvider>
        </WagmiProvider>
      </FrameContextProvider>
    </FrameSplashProvider>
  );
}