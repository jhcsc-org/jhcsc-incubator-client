import {
    Button,
    Flex,
    Heading,
    Text,
    useAuthenticator,
    useTheme,
    View
} from "@aws-amplify/ui-react";

const authenticatorComponents = {
    Header() {
        const { tokens } = useTheme();
        return (
            <Flex
                textAlign="center" alignSelf="center" justifyContent="center" padding={tokens.space.large}
            >
                <img alt="Amplify logo" src="incubator.jpg" />
            </Flex>
        );
    },

    Footer() {
        const { tokens } = useTheme();
        return (
            <View
                textAlign="center"
                padding={tokens.space.large}
                fontSize={{ base: "12px", medium: "14px" }}
                maxWidth="100%"
            >
                <Text color={tokens.colors.neutral[80]}>
                    Copyright &copy; J.H. Cerilles State College, All Rights Reserved.
                </Text>
            </View>
        );
    },

    SignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={{ base: tokens.space.medium, large: tokens.space.xl }}
                    level={3}
                    textAlign="center"
                >
                    Sign in to your account
                </Heading>
            );
        },
        Footer() {
            const { toForgotPassword } = useAuthenticator();
            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toForgotPassword}
                        size="small"
                        variation="link"
                        width={{ base: "100%", medium: "auto" }}
                    >
                        Reset Password
                    </Button>
                </View>
            );
        },
    },

    SignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={{ base: tokens.space.medium, large: tokens.space.xl }}
                    level={3}
                    textAlign="center"
                >
                    Create a new account
                </Heading>
            );
        },
        Footer() {
            const { toSignIn } = useAuthenticator();
            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toSignIn}
                        size="small"
                        variation="link"
                        width={{ base: "100%", medium: "auto" }}
                    >
                        Back to Sign In
                    </Button>
                </View>
            );
        },
    },

    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={{ base: tokens.space.medium, large: tokens.space.xl }}
                    level={3}
                    textAlign="center"
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>
                Please check your email for the confirmation code.
            </Text>;
        },
    },

    SetupTotp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={{ base: tokens.space.medium, large: tokens.space.xl }}
                    level={3}
                    textAlign="center"
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text></Text>;
        },
    },

    ConfirmSignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={{ base: tokens.space.medium, large: tokens.space.xl }}
                    level={3}
                    textAlign="center"
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text></Text>;
        },
    },

    ForgotPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={{ base: tokens.space.medium, large: tokens.space.xl }}
                    level={3}
                    textAlign="center"
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text></Text>;
        },
    },

    ConfirmResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={{ base: tokens.space.medium, large: tokens.space.xl }}
                    level={3}
                    textAlign="center"
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text></Text>;
        },
    },
};

const authenticatorFormFields = {
    forceNewPassword: {
        password: {
            placeholder: "Enter your Password:",
        },
    },
    forgotPassword: {
        username: {
            placeholder: "Enter your email:",
        },
    },
    confirmResetPassword: {
        confirmation_code: {
            placeholder: "Enter your Confirmation Code:",
            label: "New Label",
            isRequired: false,
        },
        confirm_password: {
            placeholder: "Enter your Password Please:",
        },
    },
    setupTotp: {
        QR: {
            totpIssuer: "test issuer",
            totpUsername: "amplify_qr_test_user",
        },
        confirmation_code: {
            label: "New Label",
            placeholder: "Enter your Confirmation Code:",
            isRequired: false,
        },
    },
    confirmSignIn: {
        confirmation_code: {
            label: "New Label",
            placeholder: "Enter your Confirmation Code:",
            isRequired: false,
        },
    },
};

export { authenticatorComponents, authenticatorFormFields };
