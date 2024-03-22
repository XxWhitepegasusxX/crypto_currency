/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ethereum: any;
}