import * as React from 'react';
import { Key } from './utils/itemUtil';
declare type ScrollAlign = 'top' | 'bottom' | 'auto';
declare type ScrollConfig = {
    index: number;
    align?: ScrollAlign;
} | {
    key: Key;
    align?: ScrollAlign;
};
export declare type RenderFunc<T> = (item: T, index: number, props: {
    style: React.CSSProperties;
}) => React.ReactNode;
export interface RelativeScroll {
    itemIndex: number;
    relativeTop: number;
}
export interface ScrollInfo {
    scrollTop: number;
    startItemTop: number;
    startIndex: number;
}
export interface ListProps<T> extends React.HTMLAttributes<any> {
    prefixCls?: string;
    children: RenderFunc<T>;
    data: T[];
    height?: number;
    itemHeight?: number;
    /** If not match virtual scroll condition, Set List still use height of container. */
    fullHeight?: boolean;
    itemKey: Key | ((item: T) => Key);
    component?: string | React.FC<any> | React.ComponentClass<any>;
    /** Disable scroll check. Usually used on animation control */
    disabled?: boolean;
    /** Set `false` will always use real scroll instead of virtual one */
    virtual?: boolean;
    /** When `disabled`, trigger if changed item not render. */
    onSkipRender?: () => void;
    onScroll?: React.UIEventHandler<HTMLElement>;
}
declare type Status = 'NONE' | 'MEASURE_START' | 'MEASURE_DONE' | 'SWITCH_TO_VIRTUAL' | 'SWITCH_TO_RAW';
interface ListState<T> {
    status: Status;
    scrollTop: number | null;
    /** Located item index */
    itemIndex: number;
    /** Located item bind its height percentage with the `scrollTop` */
    itemOffsetPtg: number;
    startIndex: number;
    endIndex: number;
    /**
     * Calculated by `scrollTop`.
     * We cache in the state since if `data` length change,
     * we need revert back to the located item index.
     */
    startItemTop: number;
    /**
     * Tell if is using virtual scroll
     */
    isVirtual: boolean;
    /**
     * Only used when turn virtual list to raw list
     */
    cacheScroll?: RelativeScroll;
    /**
     * Cache `data.length` to use for `disabled` status.
     */
    itemCount: number;
}
/**
 * We use class component here since typescript can not support generic in function component
 *
 * Virtual list display logic:
 * 1. scroll / initialize trigger measure
 * 2. Get location item of current `scrollTop`
 * 3. [Render] Render visible items
 * 4. Get all the visible items height
 * 5. [Render] Update top item `margin-top` to fit the position
 *
 * Algorithm:
 * We split scroll bar into equal slice. An item with whatever height occupy the same range slice.
 * When `scrollTop` change,
 * it will calculate the item percentage position and move item to the position.
 * Then calculate other item position base on the located item.
 *
 * Concept:
 *
 * # located item
 * The base position item which other items position calculate base on.
 */
declare class List<T = any> extends React.Component<ListProps<T>, ListState<T>> {
    static defaultProps: {
        itemHeight: number;
        data: any[];
    };
    rafId: number;
    listRef: React.RefObject<HTMLElement>;
    itemElements: {
        [index: number]: HTMLElement;
    };
    itemElementHeights: {
        [index: number]: number;
    };
    /**
     * Always point to the latest props if `disabled` is `false`
     */
    cachedProps: Partial<ListProps<T>>;
    /**
     * Lock scroll process with `onScroll` event.
     * This is used for `data` length change and `scrollTop` restore
     */
    lockScroll: boolean;
    constructor(props: ListProps<T>);
    static getDerivedStateFromProps(nextProps: ListProps<any>): {
        itemCount: number;
    };
    /**
     * Phase 1: Initial should sync with default scroll top
     */
    componentDidMount(): void;
    /**
     * Phase 4: Record used item height
     * Phase 5: Trigger re-render to use correct position
     */
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    /**
     * Phase 2: Trigger render since we should re-calculate current position.
     */
    onScroll: React.UIEventHandler<HTMLElement>;
    onRawScroll: React.UIEventHandler<HTMLElement>;
    triggerOnScroll: React.UIEventHandler<HTMLElement>;
    getIndexKey: (index: number, props?: Partial<ListProps<T>>) => string | number;
    getItemKey: (item: T, props?: Partial<ListProps<T>>) => Key;
    /**
     * Collect current rendered dom element item heights
     */
    collectItemHeights: (range?: {
        startIndex: number;
        endIndex: number;
    }) => void;
    scrollTo: (arg0: number | ScrollConfig) => void;
    internalScrollTo(relativeScroll: RelativeScroll): void;
    /**
     * Phase 4: Render item and get all the visible items height
     */
    renderChildren: (list: T[], startIndex: number, renderFunc: RenderFunc<T>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
    render(): JSX.Element;
}
export default List;
