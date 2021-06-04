import { ITypeDef } from '@polpware/fe-utilities';
export declare enum OperatorEnum {
    Undefined = 0,
    LessThan = 1,
    LessThanEqual = 2,
    Equal = 3,
    NotEqual = 4,
    GreaterThan = 5,
    GreaterThanEqual = 6,
    Contain = 7,
    NotContain = 8,
    StartWith = 9,
    EndWith = 10
}
export declare const OperatorOptions4Number: {
    text: string;
    value: OperatorEnum;
}[];
export declare const OperatorOptions4Bool: {
    text: string;
    value: OperatorEnum;
}[];
export declare const OperatorOptions4Text: {
    text: string;
    value: OperatorEnum;
}[];
export declare function interpretOperator(op: OperatorEnum, ty: ITypeDef): string;
/**
 * Translates the given string into a operator value.
 * Note that this method is expected to be invoked when
 * parsing a dataflow or report.
 * Thus, the input value is well-defined and must be
 * one of the given value.
 * @param op
 */
export declare function translateStringToOperator(op: string): OperatorEnum;
/**
 * Computes the representation for the given value with the given type.
 * The given value is a known value, and it can be of one of many types.
 * Typically, the value is directly obtained from the user input in Form.
 *
 * Our goal is product a valid C# expression for the given value, while repsecting
 * the type information of the value.
 *
 * The representation is a valid C# expression.
 * @param value
 * @param valueType
 */
export declare function getTypeSafeValueRep(value: any, valueType: ITypeDef): any;
/**
 * Build the right type convertor (in C#) for the given variable (a string)
 * with the given type information.
 *
 * What is different from the above is that the above generates a valid literal from
 * a given known value.
 *
 * In contrast, the given value in this method is a variable (a string), we have to generate
 * a right type cast for the given string to produce a type safe value at run time.
 * Therefore,
 *   - we do not quote the given value.
 * @param varName
 * @param varType
 */
export declare function buildTypeConvertor(varName: string, varType: ITypeDef): string;
