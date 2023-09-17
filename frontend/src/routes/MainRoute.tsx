import { Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { useDeferredValue, useState } from 'react';
import ConstraintEditor from '../components/ConstraintEditor';
import ResultVisualizer from '../components/ResultVisualizer';
import VersionEditor from '../components/VersionEditor';
import { getMatchVersionQuery, getParseConstraintQuery, getParseVersionQuery } from '../queries/queries';

function MainRoute() {
    const [versionString, setVersionString] = useState('');
    const [constraintString, setConstraintString] = useState('');
    const versionQuery = useDeferredValue(useQuery(getParseVersionQuery(versionString)));
    const constraintQuery = useQuery({ ...getParseConstraintQuery(constraintString), keepPreviousData: true });
    const matchQuery = useQuery({
        ...getMatchVersionQuery(versionQuery.data!, constraintQuery.data!),
        keepPreviousData: true,
    });

    return (
        <div className="w-screen p-2">
            <div className="flex flex-col gap-4 md:flex-row">
                <VersionEditor versionString={versionString} setVersionString={setVersionString} />
                <ConstraintEditor constraintString={constraintString} setConstraintString={setConstraintString} />
            </div>

            <Transition
                show={versionQuery.isSuccess && constraintQuery.isSuccess && matchQuery.isSuccess}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <ResultVisualizer constraint={constraintQuery.data || ''} reasons={matchQuery.data || []} />
            </Transition>
        </div>
    );
}

export default MainRoute;
