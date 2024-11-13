import { Theme, useTheme } from "@aws-amplify/ui-react";

export const useCustomTheme = (): Theme => {
    const { tokens } = useTheme();
    const theme: Theme = {
        name: 'Auth Example Theme',
        tokens: {
            components: {
                authenticator: {
                    router: {
                        boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
                        borderWidth: '0',
                    },
                    form: {
                        padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
                    },
                },
                button: {
                    primary: {
                        backgroundColor: tokens.colors.neutral['100'],
                        _hover: {
                            backgroundColor: tokens.colors.neutral['90'],
                        },
                    },
                    link: {
                        color: tokens.colors.blue['80'],
                        _hover: {
                            backgroundColor: tokens.colors.neutral['20'],
                        },
                    },
                },
                fieldcontrol: {
                    _focus: {
                        boxShadow: `0 0 0 2px ${tokens.colors.blue['60']}`,
                    },
                },
                tabs: {
                    item: {
                        color: tokens.colors.neutral['80'],
                        _active: {
                            borderColor: tokens.colors.neutral['100'],
                            color: tokens.colors.blue['100'],
                        },
                    },
                },
            },
        },
    };
    return theme;
}