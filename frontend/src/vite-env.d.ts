/// <reference types="vite/client" />
/// <reference types="@types/golang-wasm-exec" />

declare type Version = {
    major: number;
    minor: number;
    patch: number;
    prerelease: string;
    metadata: string;
    original: string;
};

declare function parseVersion(version: string): Promise<Version>;
declare function parseConstraint(constraint: string): Promise<string>;
