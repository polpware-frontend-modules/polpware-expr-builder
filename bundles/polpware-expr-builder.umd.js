(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polpware/fe-utilities')) :
    typeof define === 'function' && define.amd ? define('@polpware/expr-builder', ['exports', '@polpware/fe-utilities'], factory) :
    (global = global || self, factory((global.polpware = global.polpware || {}, global.polpware['expr-builder'] = {}), global.feUtilities));
}(this, (function (exports, feUtilities) { 'use strict';

    (function (OperatorEnum) {
        OperatorEnum[OperatorEnum["Undefined"] = 0] = "Undefined";
        OperatorEnum[OperatorEnum["LessThan"] = 1] = "LessThan";
        OperatorEnum[OperatorEnum["LessThanEqual"] = 2] = "LessThanEqual";
        OperatorEnum[OperatorEnum["Equal"] = 3] = "Equal";
        OperatorEnum[OperatorEnum["NotEqual"] = 4] = "NotEqual";
        OperatorEnum[OperatorEnum["GreaterThan"] = 5] = "GreaterThan";
        OperatorEnum[OperatorEnum["GreaterThanEqual"] = 6] = "GreaterThanEqual";
        OperatorEnum[OperatorEnum["Contain"] = 7] = "Contain";
        OperatorEnum[OperatorEnum["NotContain"] = 8] = "NotContain";
        OperatorEnum[OperatorEnum["StartWith"] = 9] = "StartWith";
        OperatorEnum[OperatorEnum["EndWith"] = 10] = "EndWith";
    })(exports.OperatorEnum || (exports.OperatorEnum = {}));
    var OperatorOptions4Number = [
        {
            text: '<',
            value: exports.OperatorEnum.LessThan
        }, {
            text: '<=',
            value: exports.OperatorEnum.LessThanEqual
        }, {
            text: '==',
            value: exports.OperatorEnum.Equal
        }, {
            text: '!=',
            value: exports.OperatorEnum.NotEqual
        }, {
            text: '>',
            value: exports.OperatorEnum.GreaterThan
        }, {
            text: '>=',
            value: exports.OperatorEnum.GreaterThanEqual
        }
    ];
    var OperatorOptions4Bool = [
        {
            text: '==',
            value: exports.OperatorEnum.Equal
        }, {
            text: '!=',
            value: exports.OperatorEnum.NotEqual
        }
    ];
    var OperatorOptions4Text = [
        {
            text: 'Contains',
            value: exports.OperatorEnum.Contain
        }, {
            text: 'Contains no',
            value: exports.OperatorEnum.NotContain
        }, {
            text: 'Starts with',
            value: exports.OperatorEnum.StartWith
        }, {
            text: 'Ends with',
            value: exports.OperatorEnum.EndWith
        }, {
            text: '<',
            value: exports.OperatorEnum.LessThan
        }, {
            text: '<=',
            value: exports.OperatorEnum.LessThanEqual
        }, {
            text: '==',
            value: exports.OperatorEnum.Equal
        }, {
            text: '!=',
            value: exports.OperatorEnum.NotEqual
        }, {
            text: '>',
            value: exports.OperatorEnum.GreaterThan
        }, {
            text: '>=',
            value: exports.OperatorEnum.GreaterThanEqual
        }
    ];
    /**
     * Translates the given string into a operator value.
     * Note that this method is expected to be invoked when
     * parsing a dataflow or report.
     * Thus, the input value is well-defined and must be
     * one of the given value.
     * @param op
     */
    function translateStringToOperator(op) {
        switch (op) {
            case '<':
                return exports.OperatorEnum.LessThan;
            case '<=':
                return exports.OperatorEnum.LessThanEqual;
            case '==':
                return exports.OperatorEnum.Equal;
            case '!=':
                return exports.OperatorEnum.NotEqual;
            case '>':
                return exports.OperatorEnum.GreaterThan;
            case '>=':
                return exports.OperatorEnum.GreaterThanEqual;
            case 'Contains':
                return exports.OperatorEnum.Contain;
            case 'DoesNotContain':
                return exports.OperatorEnum.NotContain;
            case 'StartsWith':
                return exports.OperatorEnum.StartWith;
            case 'EndsWith':
                return exports.OperatorEnum.EndWith;
            default:
                return exports.OperatorEnum.Undefined;
        }
    }

    /**
     * Translates into a string format for C#.
     * @param op
     * @param ty
     */
    function interpretOperator(op, ty) {
        op = feUtilities.safeParseInt(op);
        var s = '';
        switch (op) {
            case exports.OperatorEnum.LessThan:
                if (ty == feUtilities.tyString) {
                    s = 'String.Compare({left}, {right}, true) < 0';
                }
                else {
                    s = '{left} < {right}';
                }
                break;
            case exports.OperatorEnum.LessThanEqual:
                if (ty == feUtilities.tyString) {
                    s = 'String.Compare({left}, {right}, true) <= 0';
                }
                else {
                    s = '{left} <= {right}';
                }
                break;
            case exports.OperatorEnum.Equal:
                if (ty == feUtilities.tyString) {
                    s = 'String.Compare({left}, {right}, true) == 0';
                }
                else {
                    s = '{left} == {right}';
                }
                break;
            case exports.OperatorEnum.NotEqual:
                if (ty == feUtilities.tyString) {
                    s = 'String.Compare({left}, {right}, true) != 0';
                }
                else {
                    s = '{left} != {right}';
                }
                break;
            case exports.OperatorEnum.GreaterThan:
                if (ty == feUtilities.tyString) {
                    s = 'String.Compare({left}, {right}, true) > 0';
                }
                else {
                    s = '{left} > {right}';
                }
                break;
            case exports.OperatorEnum.GreaterThanEqual:
                if (ty == feUtilities.tyString) {
                    s = 'String.Compare({left}, {right}, true) >= 0';
                }
                else {
                    s = '{left} >= {right}';
                }
                break;
            case exports.OperatorEnum.Contain:
                s = '{left}.IndexOf({right}) != -1';
                break;
            case exports.OperatorEnum.NotContain:
                s = '{left}.IndexOf({right}) == -1';
                break;
            case exports.OperatorEnum.StartWith:
                s = '{left}.StartsWith({right})';
                break;
            case exports.OperatorEnum.EndWith:
                s = '{left}.EndsWith({right})';
                break;
            default:
                s = '';
                break;
        }
        return s;
    }
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
    function getTypeSafeValueRep(value, valueType) {
        if (valueType == feUtilities.tyBool) {
            value = feUtilities.safeParseBool(value);
        }
        else if (valueType == feUtilities.tyNumber) {
            value = feUtilities.safeParseFloat(value);
        }
        else if (valueType == feUtilities.tyDate) {
            value = feUtilities.safeParseString(value);
            value = '"' + value + '"';
            value = "DateTime.Parse(" + value + ")";
        }
        else { // string 
            value = feUtilities.safeParseString(value);
            value = '"' + value + '"';
        }
        return value;
    }
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
    function buildTypeConvertor(varName, varType) {
        if (varType == feUtilities.tyBool) {
            varName = "bool.Parse(" + varName + ")";
        }
        else if (varType == feUtilities.tyNumber) {
            varName = "double.Parse(" + varName + ")";
        }
        else if (varType == feUtilities.tyDate) {
            varName = "DateTime.Parse(" + varName + ")";
        }
        return varName;
    }

    /**
     * Computes the type safe value in Javascript.
     * @param value
     * @param valueType
     */
    function getTypeSafeValue(value, valueType) {
        if (valueType == feUtilities.tyBool) {
            value = feUtilities.safeParseBool(value);
        }
        else if (valueType == feUtilities.tyNumber) {
            value = feUtilities.safeParseFloat(value);
        }
        else if (valueType == feUtilities.tyDate) {
            value = feUtilities.safeParseString(value);
            value = Date.parse(value);
        }
        else { // string 
            value = feUtilities.safeParseString(value);
        }
        return value;
    }
    /**
     * Evalutes the given assertion if it holds.
     * @param value
     * @param op
     * @param ty
     * @param expected
     */
    function evaluateAssertion(value, op, ty, expected) {
        op = feUtilities.safeParseInt(op);
        var s = false;
        switch (op) {
            case exports.OperatorEnum.LessThan:
                s = getTypeSafeValue(value, ty) < getTypeSafeValue(expected, ty);
                break;
            case exports.OperatorEnum.LessThanEqual:
                s = getTypeSafeValue(value, ty) <= getTypeSafeValue(expected, ty);
                break;
            case exports.OperatorEnum.Equal:
                s = getTypeSafeValue(value, ty) == getTypeSafeValue(expected, ty);
                break;
            case exports.OperatorEnum.NotEqual:
                s = getTypeSafeValue(value, ty) != getTypeSafeValue(expected, ty);
                break;
            case exports.OperatorEnum.GreaterThan:
                s = getTypeSafeValue(value, ty) > getTypeSafeValue(expected, ty);
                break;
            case exports.OperatorEnum.GreaterThanEqual:
                s = getTypeSafeValue(value, ty) >= getTypeSafeValue(expected, ty);
                break;
            case exports.OperatorEnum.Contain:
                s = getTypeSafeValue(value, ty).indexOf(getTypeSafeValue(expected, ty)) != -1;
                break;
            case exports.OperatorEnum.NotContain:
                s = getTypeSafeValue(value, ty).indexOf(getTypeSafeValue(expected, ty)) == -1;
                break;
            case exports.OperatorEnum.StartWith:
                s = getTypeSafeValue(value, ty).startsWith(getTypeSafeValue(expected, ty));
                break;
            case exports.OperatorEnum.EndWith:
                s = getTypeSafeValue(value, ty).endsWith(getTypeSafeValue(expected, ty));
                break;
            default:
                break;
        }
        return s;
    }

    exports.OperatorOptions4Bool = OperatorOptions4Bool;
    exports.OperatorOptions4Number = OperatorOptions4Number;
    exports.OperatorOptions4Text = OperatorOptions4Text;
    exports.buildTypeConvertor = buildTypeConvertor;
    exports.evaluateAssertion = evaluateAssertion;
    exports.getTypeSafeValue = getTypeSafeValue;
    exports.getTypeSafeValueRep = getTypeSafeValueRep;
    exports.interpretOperator = interpretOperator;
    exports.translateStringToOperator = translateStringToOperator;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polpware-expr-builder.umd.js.map
