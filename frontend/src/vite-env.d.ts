/// <reference types="vite/client" />
/// <reference types="@types/golang-wasm-exec" />

declare global {
    type Version = {
        major: number;
        minor: number;
        patch: number;
        prerelease: string;
        metadata: string;
        original: string;
    };
}

declare function parseVersion(version: string): Promise<Version>;
