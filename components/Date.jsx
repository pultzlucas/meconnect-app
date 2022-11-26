import { useEffect } from "react";
import { Text } from "react-native";
import { format, register } from 'timeago.js';
import { pt_BR } from 'timeago.js/lib/lang';

export default function Date({ date, style }) {
    useEffect(() => {
        register('pt_BR', pt_BR)
    }, [])
    return (
        <Text style={style}>{format(date, 'pt_BR')}</Text>
    )
}
