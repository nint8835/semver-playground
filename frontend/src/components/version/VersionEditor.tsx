import { useQuery } from '@tanstack/react-query';
import { getParseVersionQuery } from '../../queries/queries';
import Editor from '../Editor';

function VersionEditor(props: { versionString: string; setVersionString: (val: string) => void }) {
    const { versionString, setVersionString } = props;
    const versionQuery = useQuery(getParseVersionQuery(versionString));

    return (
        <Editor setEditorValue={setVersionString} editorValue={versionString}>
            <pre
                className={`mt-2 w-full whitespace-break-spaces rounded-md p-1 ${
                    { error: 'bg-red-900', loading: 'hidden', success: 'bg-blue-900' }[versionQuery.status]
                }`}
            >
                {versionQuery.error?.message}
                {versionQuery.data && JSON.stringify(versionQuery.data, null, 2)}
            </pre>
        </Editor>
    );
}

export default VersionEditor;
