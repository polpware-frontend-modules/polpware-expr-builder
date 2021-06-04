import { ITypeDef } from '@polpware/fe-utilities';
import { OperatorEnum } from './binary-operators';
/**
 * Computes the type safe value in Javascript.
 * @param value
 * @param valueType
 */
export declare function getTypeSafeValue(value: any, valueType: ITypeDef): any;
/**
 * Evalutes the given assertion if it holds.
 * @param value
 * @param op
 * @param ty
 * @param expected
 */
export declare function evaluateAssertion(value: any, op: OperatorEnum, ty: ITypeDef, expected: any): boolean;
