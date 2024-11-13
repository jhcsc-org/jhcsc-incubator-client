import { Button } from "./ui/button";


type TSignOutProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signOut: ((data?: any) => void) | undefined;
}

const ButtonSignOut: React.FC<TSignOutProps> = ({ signOut }) => {
    return (
        <Button onClick={signOut}>Sign Out</Button>
    )
}

export default ButtonSignOut