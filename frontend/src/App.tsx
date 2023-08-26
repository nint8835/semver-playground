import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

async function loadWasm(): Promise<null> {
    const goWasm = new Go();
    const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject);
    // noinspection ES6MissingAwait
    goWasm.run(result.instance);
    return null;
}

const loadWasmQuery: UseQueryOptions = { queryKey: ['loadWasm'], queryFn: loadWasm };

function App() {
    const wasmLoading = useQuery(loadWasmQuery);

    return wasmLoading.isLoading ? <div>Loading...</div> : <pre>WASM loaded</pre>;
}

export default App;
