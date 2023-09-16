import React from 'react';

function Editor(props: { children: React.ReactNode; editorValue: string; setEditorValue: (val: string) => void }) {
    const { children, editorValue, setEditorValue } = props;

    return (
        <div className=" w-full bg-zinc-900 p-4 md:w-6/12">
            <input
                className="w-full rounded-md border-2 border-zinc-950 bg-zinc-950 p-1 outline-none transition-all focus:ring-2 focus:ring-blue-600"
                type="text"
                value={editorValue}
                onChange={(e) => setEditorValue(e.target.value)}
            />
            {children}
        </div>
    );
}

export default Editor;
