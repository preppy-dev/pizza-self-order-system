import * as React from 'react';
import { TabPosition, RenderTabBar, TabsLocale, EditableConfig, AnimatedConfig, OnTabScroll } from '../interface';
export interface TabNavListProps {
    id: string;
    tabPosition: TabPosition;
    activeKey: string;
    rtl: boolean;
    animated?: AnimatedConfig;
    extra?: React.ReactNode;
    editable?: EditableConfig;
    moreIcon?: React.ReactNode;
    moreTransitionName?: string;
    mobile: boolean;
    tabBarGutter?: number;
    renderTabBar?: RenderTabBar;
    className?: string;
    style?: React.CSSProperties;
    locale?: TabsLocale;
    onTabClick: (activeKey: React.Key, e: React.MouseEvent | React.KeyboardEvent) => void;
    onTabScroll?: OnTabScroll;
    children?: (node: React.ReactElement) => React.ReactElement;
}
declare const _default: React.ForwardRefExoticComponent<TabNavListProps & React.RefAttributes<HTMLDivElement>>;
export default _default;
