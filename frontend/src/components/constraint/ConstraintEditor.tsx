import { useQuery } from '@tanstack/react-query';
import { getParseConstraintQuery } from '../../queries/queries';

function ConstraintEditor(props: { constraintString: string; setConstraintString: (val: string) => void }) {
    const { constraintString, setConstraintString } = props;
    const constraintQuery = useQuery(getParseConstraintQuery(constraintString));

    return (
        <div className=" w-full bg-zinc-900 p-4 md:w-6/12">
            <input
                className="w-full rounded-md border-2 border-zinc-950 bg-zinc-950 p-1 outline-none transition-all focus:ring-2 focus:ring-blue-600"
                type="text"
                value={constraintString}
                onChange={(e) => setConstraintString(e.target.value)}
            />
            <pre
                className={`mt-2 w-full whitespace-break-spaces rounded-md p-1 ${
                    { error: 'bg-red-900', loading: 'hidden', success: 'bg-blue-900' }[constraintQuery.status]
                }`}
            >
                {constraintQuery.error?.message}
                {constraintQuery.data && JSON.stringify(constraintQuery.data, null, 2)}
            </pre>
        </div>
    );
}

export default ConstraintEditor;
