
import LoginInput from './LoginInput';

type PasswordInputProps = {
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export default function PasswordInput(props: PasswordInputProps) {
    return (
        <LoginInput
            label="Kata Sandi"
            type="password"
            value={props.value}
            onChange={props.onChange}
            error={props.error}
        />
    );
}
