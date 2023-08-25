import { useEffect, useState } from 'react';

async function loadWasm(): Promise<void> {
    const goWasm = new Go();
    const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject);
    goWasm.run(result.instance);
}

function App() {
    const [wasmLoading, setWasmLoading] = useState(true);

    useEffect(() => {
        loadWasm().then(() => setWasmLoading(false));
    });

    return wasmLoading ? <div>Loading...</div> : <div>WASM loaded!</div>;
}

export default App;
