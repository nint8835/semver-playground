package main

import (
	"syscall/js"

	"github.com/Masterminds/semver/v3"
)

func versionToMap(version *semver.Version) map[string]any {
	return map[string]any{
		"original":   version.Original(),
		"major":      version.Major(),
		"minor":      version.Minor(),
		"patch":      version.Patch(),
		"prerelease": version.Prerelease(),
		"metadata":   version.Metadata(),
	}
}

func versionFromMap(version map[string]any) *semver.Version {
	return semver.New(
		version["major"].(uint64),
		version["minor"].(uint64),
		version["patch"].(uint64),
		version["prerelease"].(string),
		version["metadata"].(string),
	)
}

func promisify(originalFunc func(this js.Value, args []js.Value) (any, error)) js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		handler := js.FuncOf(func(_ js.Value, innerArgs []js.Value) any {
			resolve := innerArgs[0]
			reject := innerArgs[1]

			go func() {
				result, err := originalFunc(this, args)
				if err != nil {
					errorConstructor := js.Global().Get("Error")
					errorObject := errorConstructor.New(err.Error())
					reject.Invoke(errorObject)
				} else {
					resolve.Invoke(js.ValueOf(result))
				}
			}()

			return nil
		})

		promiseConstructor := js.Global().Get("Promise")
		return promiseConstructor.New(handler)
	})
}

func parseVersionFunc(this js.Value, args []js.Value) (any, error) {
	version, err := semver.StrictNewVersion(args[0].String())
	if err != nil {
		return nil, err
	}
	return versionToMap(version), nil
}

func parseConstraintFunc(this js.Value, args []js.Value) (any, error) {
	constraint, err := semver.NewConstraint(args[0].String())
	if err != nil {
		return nil, err
	}

	return constraint.String(), nil
}

func main() {
	ch := make(chan struct{}, 0)
	js.Global().Set("parseVersion", promisify(parseVersionFunc))
	js.Global().Set("parseConstraint", promisify(parseConstraintFunc))
	<-ch
}
