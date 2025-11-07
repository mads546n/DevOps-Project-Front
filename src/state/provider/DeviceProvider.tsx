import { DeviceContext } from "../context/DeviceContext";
import { useDevice } from "../hook/useDevice";

interface Props {
    children: React.ReactNode;
}

export function DeviceProvider({ children }: Props) {
    const info = useDevice();
    return (
        <DeviceContext.Provider value={info}>{children}</DeviceContext.Provider>
    );
}
