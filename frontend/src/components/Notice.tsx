import React from 'react';

function Notice({ children }: { children: React.ReactNode }) {
    return <div className="mt-2 italic text-zinc-400">{children}</div>;
}

export default Notice;
