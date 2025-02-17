import React from 'react';
import { RefOptionListProps } from 'rc-select/lib/OptionList';
import { FlattenDataNode, RawValueType, DataNode } from './interface';
export interface OptionListProps<OptionsType extends object[]> {
    prefixCls: string;
    id: string;
    options: OptionsType;
    flattenOptions: FlattenDataNode[];
    height: number;
    itemHeight: number;
    virtual?: boolean;
    values: Set<RawValueType>;
    multiple: boolean;
    open: boolean;
    defaultActiveFirstOption?: boolean;
    notFoundContent?: React.ReactNode;
    menuItemSelectedIcon?: any;
    childrenAsData: boolean;
    searchValue: string;
    onSelect: (value: RawValueType, option: {
        selected: boolean;
    }) => void;
    onToggleOpen: (open?: boolean) => void;
    /** Tell Select that some value is now active to make accessibility work */
    onActiveValue: (value: RawValueType, index: number) => void;
    onScroll: React.UIEventHandler<HTMLDivElement>;
    onMouseEnter: () => void;
}
declare const RefOptionList: React.ForwardRefExoticComponent<OptionListProps<DataNode[]> & React.RefAttributes<RefOptionListProps>>;
export default RefOptionList;
