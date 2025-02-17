import * as React from 'react';
import { FormInstance, InternalNamePath, Meta, NamePath, Rule, Store, StoreValue, EventArgs } from './interface';
export declare type ShouldUpdate = boolean | ((prevValues: Store, nextValues: Store, info: {
    source?: string;
}) => boolean);
interface ChildProps {
    [name: string]: any;
}
export interface InternalFieldProps {
    children?: React.ReactElement | ((control: ChildProps, meta: Meta, form: FormInstance) => React.ReactNode);
    /**
     * Set up `dependencies` field.
     * When dependencies field update and current field is touched,
     * will trigger validate rules and render.
     */
    dependencies?: NamePath[];
    getValueFromEvent?: (...args: EventArgs) => StoreValue;
    name?: InternalNamePath;
    normalize?: (value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue;
    rules?: Rule[];
    shouldUpdate?: ShouldUpdate;
    trigger?: string;
    validateTrigger?: string | string[] | false;
    validateFirst?: boolean;
    valuePropName?: string;
    getValueProps?: (value: StoreValue) => object;
    messageVariables?: Record<string, string>;
    initialValue?: any;
    onReset?: () => void;
}
export interface FieldProps extends Omit<InternalFieldProps, 'name'> {
    name?: NamePath;
    /** @private Passed by Form.List props. */
    isListField?: boolean;
}
export interface FieldState {
    resetCount: number;
}
declare const WrapperField: React.FC<FieldProps>;
export default WrapperField;
