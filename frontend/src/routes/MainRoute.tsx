import ConstraintEditor from '../components/constraint/ConstraintEditor.tsx';
import VersionEditor from '../components/version/VersionEditor';

function MainRoute() {
    return (
        <>
            <VersionEditor />
            <ConstraintEditor />
        </>
    );
}

export default MainRoute;
