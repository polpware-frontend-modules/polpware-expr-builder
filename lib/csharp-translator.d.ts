import { ITypeDef } from '@polpware/fe-utilities';
import { OperatorEnum } from './binary-operators';
/**
 * Translates into a string format for C#.
 * @param op
 * @param ty
 */
export declare function interpretOperator(op: OperatorEnum, ty: ITypeDef): string;
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
