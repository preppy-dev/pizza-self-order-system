import { InternalNamePath, ValidateOptions, RuleObject, StoreValue } from '../interface';
/**
 * We use `async-validator` to validate the value.
 * But only check one value in a time to avoid namePath validate issue.
 */
export declare function validateRules(namePath: InternalNamePath, value: StoreValue, rules: RuleObject[], options: ValidateOptions, validateFirst: boolean, messageVariables?: Record<string, string>): Promise<string[]>;
