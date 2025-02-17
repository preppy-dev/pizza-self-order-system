import { InternalNamePath, FormInstance, InternalFormInstance, StoreValue } from './interface';
interface UpdateAction {
    type: 'updateValue';
    namePath: InternalNamePath;
    value: StoreValue;
}
interface ValidateAction {
    type: 'validateField';
    namePath: InternalNamePath;
    triggerName: string;
}
export declare type ReducerAction = UpdateAction | ValidateAction;
export declare class FormStore {
    private formHooked;
    private forceRootUpdate;
    private subscribable;
    private store;
    private fieldEntities;
    private initialValues;
    private callbacks;
    private validateMessages;
    private lastValidatePromise;
    constructor(forceRootUpdate: () => void);
    getForm: () => InternalFormInstance;
    private getInternalHooks;
    private useSubscribe;
    /**
     * First time `setInitialValues` should update store with initial value
     */
    private setInitialValues;
    private getInitialValue;
    private setCallbacks;
    private setValidateMessages;
    private timeoutId;
    private warningUnhooked;
    /**
     * Get registered field entities.
     * @param pure Only return field which has a `name`. Default: false
     */
    private getFieldEntities;
    private getFieldsMap;
    private getFieldEntitiesForNamePathList;
    private getFieldsValue;
    private getFieldValue;
    private getFieldsError;
    private getFieldError;
    private isFieldsTouched;
    private isFieldTouched;
    private isFieldsValidating;
    private isFieldValidating;
    /**
     * Reset Field with field `initialValue` prop.
     * Can pass `entities` or `namePathList` or just nothing.
     */
    private resetWithFieldInitialValue;
    private resetFields;
    private setFields;
    private getFields;
    private registerField;
    private dispatch;
    private notifyObservers;
    private updateValue;
    private setFieldsValue;
    private getDependencyChildrenFields;
    private triggerOnFieldsChange;
    private validateFields;
    private submit;
}
declare function useForm(form?: FormInstance): [FormInstance];
export default useForm;
