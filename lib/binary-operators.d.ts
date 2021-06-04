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
/**
 * Translates the given string into a operator value.
 * Note that this method is expected to be invoked when
 * parsing a dataflow or report.
 * Thus, the input value is well-defined and must be
 * one of the given value.
 * @param op
 */
export declare function translateStringToOperator(op: string): OperatorEnum;
