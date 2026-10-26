import { Icon } from "@iconify/react";

type AppIconProps = {
    name: string;
    size?: number;
    className?: string;
};

export default function AppIcon({
    name,
    size = 24,
    className,
}: AppIconProps) {
    return (
        <Icon
            icon={name}
            width={size}
            height={size}
            className={className}
        />
    );
}