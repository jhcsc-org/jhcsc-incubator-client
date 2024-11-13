import { ServerCog, Settings, SquareTerminal, Thermometer, ToggleLeft } from "lucide-react";

export const navConfiguration = {
    user: {
        name: "Admin",
        email: "",
        avatar: "",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Sensors",
            url: "/sensors",
            icon: Thermometer,
        },
        {
            title: "Relays",
            url: "/relays",
            icon: ToggleLeft,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
            items: [
                {
                    title: "Configure",
                    url: "/settings/configure",
                },
                {
                    title: "Logs",
                    url: "/settings/logs",
                },
            ],
        },
        {
            title: "Device",
            url: "#",
            icon: ServerCog,
        },
    ],
};