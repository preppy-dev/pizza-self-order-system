import React, { Component } from 'react';
import { StretchType, AlignType, TransitionNameType, AnimationType, Point, MotionType } from './interface';
/**
 * Popup should follow the steps for each component work correctly:
 * measure - check for the current stretch size
 * align - let component align the position
 * aligned - re-align again in case additional className changed the size
 * afterAlign - choice next step is trigger motion or finished
 * beforeMotion - should reset motion to invisible so that CSSMotion can do normal motion
 * motion - play the motion
 * stable - everything is done
 */
declare type PopupStatus = null | 'measure' | 'align' | 'aligned' | 'afterAlign' | 'beforeMotion' | 'motion' | 'AfterMotion' | 'stable';
interface PopupProps {
    visible?: boolean;
    style?: React.CSSProperties;
    getClassNameFromAlign?: (align: AlignType) => string;
    onAlign?: (element: HTMLElement, align: AlignType) => void;
    getRootDomNode?: () => HTMLElement;
    align?: AlignType;
    destroyPopupOnHide?: boolean;
    className?: string;
    prefixCls: string;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onMouseDown?: React.MouseEventHandler<HTMLElement>;
    onTouchStart?: React.TouchEventHandler<HTMLElement>;
    stretch?: StretchType;
    children?: React.ReactNode;
    point?: Point;
    zIndex?: number;
    mask?: boolean;
    motion: MotionType;
    maskMotion: MotionType;
    animation: AnimationType;
    transitionName: TransitionNameType;
    maskAnimation: AnimationType;
    maskTransitionName: TransitionNameType;
}
interface PopupState {
    targetWidth: number;
    targetHeight: number;
    status: PopupStatus;
    prevVisible: boolean;
    alignClassName: string;
}
interface AlignRefType {
    forceAlign: () => void;
}
declare class Popup extends Component<PopupProps, PopupState> {
    state: PopupState;
    popupRef: React.RefObject<HTMLDivElement>;
    alignRef: React.RefObject<AlignRefType>;
    private nextFrameState;
    private nextFrameId;
    static getDerivedStateFromProps({ visible, ...props }: PopupProps, { prevVisible, status }: PopupState): Partial<PopupState>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    onAlign: (popupDomNode: HTMLElement, align: AlignType) => void;
    onMotionEnd: () => void;
    setStateOnNextFrame: (state: Partial<PopupState>) => void;
    getMotion: () => {
        motionName?: string | {
            none?: string;
            enter?: string;
            appear?: string;
            leave?: string;
            "appear-active"?: string;
            "enter-active"?: string;
            "leave-active"?: string;
        };
        motionAppear?: boolean;
        motionEnter?: boolean;
        motionLeave?: boolean;
        motionLeaveImmediately?: boolean;
        removeOnLeave?: boolean;
        leavedClassName?: string;
        onAppearStart?: (element: HTMLElement, event: React.TransitionEvent<HTMLElement> | React.AnimationEvent<HTMLElement>) => false | void | React.CSSProperties;
        onAppearActive?: (element: HTMLElement, event: React.TransitionEvent<HTMLElement> | React.AnimationEvent<HTMLElement>) => false | void | React.CSSProperties;
        onAppearEnd?: (element: HTMLElement, event: React.TransitionEvent<HTMLElement> | React.AnimationEvent<HTMLElement>) => false | void | React.CSSProperties;
        onEnterStart?: (element: HTMLElement, event: React.TransitionEvent<HTMLElement> | React.AnimationEvent<HTMLElement>) => false | void | React.CSSProperties;
        onEnterActive?: (element: HTMLElement, event: React.TransitionEvent<HTMLElement> | React.AnimationEvent<HTMLElement>) => false | void | React.CSSProperties;
        onEnterEnd?: (element: HTMLElement, event: React.TransitionEvent<HTMLElement> | React.AnimationEvent<HTMLElement>) => false | void | React.CSSProperties;
        onLeaveStart?: (element: HTMLElement, event: React.TransitionEvent<HTMLElement> | React.AnimationEvent<HTMLElement>) => false | void | React.CSSProperties;
        onLeaveActive?: (element: HTMLElement, event: React.TransitionEvent<HTMLElement> | React.AnimationEvent<HTMLElement>) => false | void | React.CSSProperties;
        onLeaveEnd?: (element: HTMLElement, event: React.TransitionEvent<HTMLElement> | React.AnimationEvent<HTMLElement>) => false | void | React.CSSProperties;
    };
    getAlignTarget: () => Point | (() => HTMLElement);
    getZIndexStyle(): React.CSSProperties;
    cancelFrameState: () => void;
    renderPopupElement: () => JSX.Element;
    renderMaskElement: () => JSX.Element;
    render(): JSX.Element;
}
export default Popup;
