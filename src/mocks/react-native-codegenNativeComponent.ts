// Stub for react-native/Libraries/Utilities/codegenNativeComponent
// react-native-safe-area-context calls this at module load to produce a
// component (e.g. RNCSafeAreaView). On web we just need a passthrough that
// renders children — the actual safe-area logic comes from the package's
// web entry, not this spec file.
import { View } from "react-native";

const codegenNativeComponent = () => View;
export default codegenNativeComponent;
