import { http, createConfig, injected } from "wagmi";
import { base } from "wagmi/chains";

export const config = createConfig({
  chains: [base],
  ssr: true,
  connectors: [
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
})