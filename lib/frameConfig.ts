import farcasterFrame from "@farcaster/frame-wagmi-connector";
import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";

export const frameConfig = createConfig({
  chains: [base],
  ssr: true,
  connectors: [
    farcasterFrame(),
  ],
  transports: {
    [base.id]: http(),
  },
})