import React from 'react';
export interface SliderProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    prefixCls?: string;
    onChange?: (value: number) => void;
    onBeforeChange?: (value: number) => void;
    onAfterChange?: (value: number) => void;
    vertical?: boolean;
    included?: boolean;
    disabled?: boolean;
    reverse?: boolean;
    minimumTrackStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties;
    handleStyle?: React.CSSProperties;
    tabIndex?: number;
    ariaLabelForHandle?: string;
    ariaLabelledByForHandle?: string;
    ariaValueTextFormatterForHandle?: string;
    startPoint?: number;
    handle: (props: {
        className: string;
        prefixCls?: string;
        vertical?: boolean;
        offset: number;
        value: number;
        dragging?: boolean;
        disabled?: boolean;
        min?: number;
        max?: number;
        reverse?: boolean;
        index: number;
        tabIndex?: number;
        ariaLabel: string;
        ariaLabelledBy: string;
        ariaValueTextFormatter: string;
        style?: React.CSSProperties;
        ref?: React.Ref<any>;
    }) => React.ReactElement;
}
export interface SliderState {
    value: number;
    dragging: boolean;
}
declare const _default: {
    new (props: any): {
        [x: string]: any;
        componentDidMount(): void;
        componentWillUnmount(): void;
        onMouseDown: (e: any) => void;
        onTouchStart: (e: any) => void;
        onFocus: (e: any) => void;
        onBlur: (e: any) => void;
        onMouseUp: () => void;
        onMouseMove: (e: any) => void;
        onTouchMove: (e: any) => void;
        onKeyDown: (e: any) => void;
        onClickMarkLabel: (e: any, value: any) => void;
        getSliderStart(): any;
        getSliderLength(): any;
        addDocumentTouchEvents(): void;
        addDocumentMouseEvents(): void;
        removeDocumentEvents(): void;
        focus(): void;
        blur(): void;
        calcValue(offset: any): any;
        calcValueByPos(position: any): any;
        calcOffset(value: any): number;
        saveSlider: (slider: any) => void;
        saveHandle(index: any, handle: any): void;
        render(): JSX.Element;
    };
    [x: string]: any;
    displayName: string;
    defaultProps: any;
};
export default _default;
