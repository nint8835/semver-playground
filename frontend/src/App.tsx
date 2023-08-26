import { Transition } from '@headlessui/react';
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

    return (
        <>
            <Transition
                show={wasmLoading.isLoading}
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center bg-zinc-900"
            >
                <div className="h-16 w-16 animate-spin rounded-full border-t-2  border-t-blue-600" />
            </Transition>

            {wasmLoading.isFetched && (
                <div className="flex h-screen w-screen flex-col items-center justify-center italic">
                    Insert app here
                </div>
            )}
        </>
    );
}

export default App;
