import React from 'react';
import { ActionType, AlignType, BuildInPlacements, TransitionNameType, AnimationType, MotionType } from './interface';
export interface TriggerProps {
    children: React.ReactElement;
    action?: ActionType | ActionType[];
    showAction?: ActionType[];
    hideAction?: ActionType[];
    getPopupClassNameFromAlign?: (align: AlignType) => string;
    onPopupVisibleChange?: (visible: boolean) => void;
    afterPopupVisibleChange?: (visible: boolean) => void;
    popup: React.ReactNode | (() => React.ReactNode);
    popupStyle?: React.CSSProperties;
    prefixCls?: string;
    popupClassName?: string;
    className?: string;
    popupPlacement?: string;
    builtinPlacements?: BuildInPlacements;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    zIndex?: number;
    focusDelay?: number;
    blurDelay?: number;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    getDocument?: () => HTMLDocument;
    forceRender?: boolean;
    destroyPopupOnHide?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    onPopupAlign?: (element: HTMLElement, align: AlignType) => void;
    popupAlign?: AlignType;
    popupVisible?: boolean;
    defaultPopupVisible?: boolean;
    autoDestroy?: boolean;
    stretch?: string;
    alignPoint?: boolean;
    /** Set popup motion. You can ref `rc-animate` for more info. */
    popupMotion?: MotionType;
    /** Set mask motion. You can ref `rc-animate` for more info. */
    maskMotion?: MotionType;
    /** @deprecated Please us `popupMotion` instead. */
    popupTransitionName?: TransitionNameType;
    /** @deprecated Please us `popupMotion` instead. */
    popupAnimation?: AnimationType;
    /** @deprecated Please us `maskMotion` instead. */
    maskTransitionName?: TransitionNameType;
    /** @deprecated Please us `maskMotion` instead. */
    maskAnimation?: string;
    /**
     * @private Get trigger DOM node.
     * Used for some component is function component which can not access by `findDOMNode`
     */
    getTriggerDOMNode?: (node: React.ReactInstance) => HTMLElement;
}
/**
 * Internal usage. Do not use in your code since this will be removed.
 */
export declare function generateTrigger(PortalComponent: any): React.ComponentClass<TriggerProps>;
export { BuildInPlacements };
declare const _default: React.ComponentClass<TriggerProps, any>;
export default _default;
