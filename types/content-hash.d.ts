declare module 'content-hash' {
    export function decode(cid: string): Uint8Array;
    export function fromIpfs(cid: string): string;
    // Add more function signatures if you use other methods from content-hash
  }