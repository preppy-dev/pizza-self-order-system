import React from 'react';
import { DefaultValueType } from 'rc-select/lib/interface/generator';
import { DataEntity } from 'rc-tree/lib/interface';
import { RawValueType, FlattenDataNode, Key, LabelValueType, DataNode } from '../interface';
import { SkipType } from './useKeyValueMapping';
import { CheckedStrategy } from '../utils/strategyUtil';
interface Config {
    treeConduction: boolean;
    /** Current `value` of TreeSelect */
    value: DefaultValueType;
    showCheckedStrategy: CheckedStrategy;
    conductKeyEntities: Record<Key, DataEntity>;
    getEntityByKey: (key: Key, skipType?: SkipType, ignoreDisabledCheck?: boolean) => FlattenDataNode;
    getEntityByValue: (value: RawValueType, skipType?: SkipType, ignoreDisabledCheck?: boolean) => FlattenDataNode;
    getLabelProp: (node: DataNode) => React.ReactNode;
}
/** Return  */
export default function useSelectValues(rawValues: RawValueType[], { value, getEntityByValue, getEntityByKey, treeConduction, showCheckedStrategy, conductKeyEntities, getLabelProp, }: Config): LabelValueType[];
export {};
