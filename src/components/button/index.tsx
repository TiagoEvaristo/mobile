import { TouchableOpacity, TouchableOpacityProps, Text, TextProps, ActivityIndicator} from "react-native";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";

import { s } from "./styles";
import {colors} from "@/styles/theme";

type ButtonProps = TouchableOpacityProps & {
    loading?: boolean;
}

function Button({children, style, loading = false, ...rest}: ButtonProps){
    return (
        <TouchableOpacity activeOpacity={0.8} style={[s.container, style]} disabled={loading} {...rest}>
            {loading ? <ActivityIndicator color={colors.gray[100]} size="small"/> : children}
        </TouchableOpacity>
    );
}

function Title({children}: TextProps){
    return (
        <Text style={s.title}>{children}</Text>
    );
}

type IconProps = {
    icon: React.ComponentType<TablerIconProps>;
}

function Icon({icon: Icon}: IconProps){
    return (
        <Icon size={24} color={colors.gray[100]}/>
    );

}

Button.Title = Title;
Button.Icon = Icon;

export {Button};