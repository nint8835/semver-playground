import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ConstraintEditor from '../components/constraint/ConstraintEditor.tsx';
import VersionEditor from '../components/version/VersionEditor';
import { getMatchVersionQuery, getParseConstraintQuery, getParseVersionQuery } from '../queries/queries.ts';

function MainRoute() {
    const [versionString, setVersionString] = useState('');
    const [constraintString, setConstraintString] = useState('');
    const versionQuery = useQuery(getParseVersionQuery(versionString));
    const constraintQuery = useQuery(getParseConstraintQuery(constraintString));
    const matchQuery = useQuery(getMatchVersionQuery(versionQuery.data!, constraintQuery.data!));

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <VersionEditor versionString={versionString} setVersionString={setVersionString} />
                <ConstraintEditor constraintString={constraintString} setConstraintString={setConstraintString} />
            </div>

            {matchQuery.data && (
                <pre className="mt-2 w-full whitespace-break-spaces rounded-md bg-blue-900 p-1">
                    {JSON.stringify(matchQuery.data, null, 2)}
                </pre>
            )}
        </>
    );
}

export default MainRoute;