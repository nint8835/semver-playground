import React from 'react';

function Editor(props: {
    children: React.ReactNode;
    editorValue: string;
    setEditorValue: (val: string) => void;
    title: string;
}) {
    const { children, editorValue, setEditorValue, title } = props;

    return (
        <div className="m-2 w-full rounded-lg bg-zinc-900 p-4 md:w-6/12">
            <h3 className="text-l pb-2 font-bold">{title}</h3>
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
