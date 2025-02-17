import * as React from 'react';
import { Tab, TabPosition, EditableConfig } from '../interface';
export interface TabNodeProps {
    id: string;
    prefixCls: string;
    tab: Tab;
    active: boolean;
    rtl: boolean;
    closable?: boolean;
    editable?: EditableConfig;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onResize?: (width: number, height: number, left: number, top: number) => void;
    tabBarGutter?: number;
    tabPosition: TabPosition;
    renderWrapper?: (node: React.ReactElement) => React.ReactElement;
    removeAriaLabel?: string;
    removeIcon?: React.ReactNode;
    onRemove: () => void;
    onFocus: React.FocusEventHandler;
}
declare const _default: React.ForwardRefExoticComponent<TabNodeProps & React.RefAttributes<HTMLButtonElement>>;
export default _default;
