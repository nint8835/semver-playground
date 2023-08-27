import { useQuery } from '@tanstack/react-query';
import { getParseVersionQuery } from '../../queries/queries';

function VersionEditor(props: { versionString: string; setVersionString: (val: string) => void }) {
    const { versionString, setVersionString } = props;
    const versionQuery = useQuery(getParseVersionQuery(versionString));

    return (
        <div className=" w-full bg-zinc-900 p-4 md:w-6/12">
            <input
                className="w-full rounded-md border-2 border-zinc-950 bg-zinc-950 p-1 outline-none transition-all focus:ring-2 focus:ring-blue-600"
                type="text"
                value={versionString}
                onChange={(e) => setVersionString(e.target.value)}
            />
            <pre
                className={`mt-2 w-full whitespace-break-spaces rounded-md p-1 ${
                    { error: 'bg-red-900', loading: 'hidden', success: 'bg-blue-900' }[versionQuery.status]
                }`}
            >
                {versionQuery.error?.message}
                {versionQuery.data && JSON.stringify(versionQuery.data, null, 2)}
            </pre>
        </div>
    );
}

export default VersionEditor;
