import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { getParseVersionQuery } from '../../queries/queries';
import Editor from '../Editor';

function VersionEditor(props: { versionString: string; setVersionString: (val: string) => void }) {
    const { versionString, setVersionString } = props;
    const versionQuery = useDeferredValue(useQuery(getParseVersionQuery(versionString)));

    return (
        <Editor setEditorValue={setVersionString} editorValue={versionString} title="Version">
            <div className="mt-2 w-full rounded-xl border-2 border-zinc-600">
                <table className="w-full">
                    {[
                        { name: 'Major', value: versionQuery.data?.major },
                        { name: 'Minor', value: versionQuery.data?.minor },
                        { name: 'Patch', value: versionQuery.data?.patch },
                        { name: 'Prerelease', value: versionQuery.data?.prerelease },
                        { name: 'Metadata', value: versionQuery.data?.metadata },
                    ]
                        .filter(({ value }) => value)
                        .map(({ name, value }) => (
                            <tr className="border-t-2 border-t-zinc-600 first:border-t-0">
                                <td className="border-r-2 border-zinc-600 p-2 font-bold">{name}</td>
                                <td className="p-2">
                                    <code>{value}</code>
                                </td>
                            </tr>
                        ))}
                </table>
            </div>

            {versionQuery.error && (
                <pre
                    className={`mt-2 w-full whitespace-break-spaces rounded-md p-1 ${
                        { error: 'bg-red-900', loading: 'hidden', success: 'bg-blue-900' }[versionQuery.status]
                    }`}
                >
                    {versionQuery.error?.message}
                </pre>
            )}
        </Editor>
    );
}

export default VersionEditor;
