import { useEffect, useState } from 'react';

async function loadWasm(): Promise<void> {
    const goWasm = new Go();
    const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject);
    goWasm.run(result.instance);
}

function App() {
    const [wasmLoading, setWasmLoading] = useState(true);
    const [parsedVersion, setParsedVersion] = useState(null);

    useEffect(() => {
        loadWasm().then(() => setWasmLoading(false));
    }, [setWasmLoading]);

    useEffect(() => {
        if (!wasmLoading) {
            parseVersion('1.2.3').then(setParsedVersion);
        }
    }, [wasmLoading, setParsedVersion]);

    return wasmLoading ? <div>Loading...</div> : <pre>{JSON.stringify(parsedVersion, null, 4)}</pre>;
}

export default App;
