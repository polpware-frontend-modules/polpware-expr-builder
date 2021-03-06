import { tyString, tyFunction, tyArray, tyObject, tySymbol, tyDate, tyNumber, tyUndefined, tyNull, tyBool, safeParseInt, safeParseBool, safeParseFloat, safeParseString } from '@polpware/fe-utilities';

var OperatorEnum;
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
})(OperatorEnum || (OperatorEnum = {}));
const OperatorOptions4Number = [
    {
        text: '<',
        value: OperatorEnum.LessThan
    }, {
        text: '<=',
        value: OperatorEnum.LessThanEqual
    }, {
        text: '==',
        value: OperatorEnum.Equal
    }, {
        text: '!=',
        value: OperatorEnum.NotEqual
    }, {
        text: '>',
        value: OperatorEnum.GreaterThan
    }, {
        text: '>=',
        value: OperatorEnum.GreaterThanEqual
    }
];
const OperatorOptions4Bool = [
    {
        text: '==',
        value: OperatorEnum.Equal
    }, {
        text: '!=',
        value: OperatorEnum.NotEqual
    }
];
const OperatorOptions4Text = [
    {
        text: 'Contains',
        value: OperatorEnum.Contain
    }, {
        text: 'Contains no',
        value: OperatorEnum.NotContain
    }, {
        text: 'Starts with',
        value: OperatorEnum.StartWith
    }, {
        text: 'Ends with',
        value: OperatorEnum.EndWith
    }, {
        text: '<',
        value: OperatorEnum.LessThan
    }, {
        text: '<=',
        value: OperatorEnum.LessThanEqual
    }, {
        text: '==',
        value: OperatorEnum.Equal
    }, {
        text: '!=',
        value: OperatorEnum.NotEqual
    }, {
        text: '>',
        value: OperatorEnum.GreaterThan
    }, {
        text: '>=',
        value: OperatorEnum.GreaterThanEqual
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
            return OperatorEnum.LessThan;
        case '<=':
            return OperatorEnum.LessThanEqual;
        case '==':
            return OperatorEnum.Equal;
        case '!=':
            return OperatorEnum.NotEqual;
        case '>':
            return OperatorEnum.GreaterThan;
        case '>=':
            return OperatorEnum.GreaterThanEqual;
        case 'Contains':
            return OperatorEnum.Contain;
        case 'DoesNotContain':
            return OperatorEnum.NotContain;
        case 'StartsWith':
            return OperatorEnum.StartWith;
        case 'EndsWith':
            return OperatorEnum.EndWith;
        default:
            return OperatorEnum.Undefined;
    }
}
/**
 * Translates the given into a JavaSrcipt type.
 * @param ty
 */
function translateStringToType(ty) {
    switch (ty) {
        case 'tyBool':
            return tyBool;
        case 'tyNull':
            return tyNull;
        case 'tyUndefined':
            return tyUndefined;
        case 'tyNumber':
            return tyNumber;
        case 'tyString':
            return tyString;
        case 'tyDate':
            return tyDate;
        case 'tySymbol':
            return tySymbol;
        case 'tyObject':
            return tyObject;
        case 'tyArray':
            return tyArray;
        case 'tyFunction':
            return tyFunction;
        default:
            return tyString;
    }
}

/**
 * Translates into a string format for C#.
 * @param op
 * @param ty
 */
function interpretOperator(op, ty) {
    op = safeParseInt(op);
    let s = '';
    switch (op) {
        case OperatorEnum.LessThan:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) < 0';
            }
            else {
                s = '{left} < {right}';
            }
            break;
        case OperatorEnum.LessThanEqual:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) <= 0';
            }
            else {
                s = '{left} <= {right}';
            }
            break;
        case OperatorEnum.Equal:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) == 0';
            }
            else {
                s = '{left} == {right}';
            }
            break;
        case OperatorEnum.NotEqual:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) != 0';
            }
            else {
                s = '{left} != {right}';
            }
            break;
        case OperatorEnum.GreaterThan:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) > 0';
            }
            else {
                s = '{left} > {right}';
            }
            break;
        case OperatorEnum.GreaterThanEqual:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) >= 0';
            }
            else {
                s = '{left} >= {right}';
            }
            break;
        case OperatorEnum.Contain:
            s = '{left}.IndexOf({right}) != -1';
            break;
        case OperatorEnum.NotContain:
            s = '{left}.IndexOf({right}) == -1';
            break;
        case OperatorEnum.StartWith:
            s = '{left}.StartsWith({right})';
            break;
        case OperatorEnum.EndWith:
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
    if (valueType == tyBool) {
        value = safeParseBool(value);
    }
    else if (valueType == tyNumber) {
        value = safeParseFloat(value);
    }
    else if (valueType == tyDate) {
        value = safeParseString(value);
        value = '"' + value + '"';
        value = `DateTime.Parse(${value})`;
    }
    else { // string 
        value = safeParseString(value);
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
    if (varType == tyBool) {
        varName = `bool.Parse(${varName})`;
    }
    else if (varType == tyNumber) {
        varName = `double.Parse(${varName})`;
    }
    else if (varType == tyDate) {
        varName = `DateTime.Parse(${varName})`;
    }
    return varName;
}

/**
 * Computes the type safe value in Javascript.
 * @param value
 * @param valueType
 */
function getTypeSafeValue(value, valueType) {
    if (valueType == tyBool) {
        value = safeParseBool(value);
    }
    else if (valueType == tyNumber) {
        value = safeParseFloat(value);
    }
    else if (valueType == tyDate) {
        value = safeParseString(value);
        value = Date.parse(value);
    }
    else { // string 
        value = safeParseString(value);
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
    op = safeParseInt(op);
    let s = false;
    switch (op) {
        case OperatorEnum.LessThan:
            s = getTypeSafeValue(value, ty) < getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.LessThanEqual:
            s = getTypeSafeValue(value, ty) <= getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.Equal:
            s = getTypeSafeValue(value, ty) == getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.NotEqual:
            s = getTypeSafeValue(value, ty) != getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.GreaterThan:
            s = getTypeSafeValue(value, ty) > getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.GreaterThanEqual:
            s = getTypeSafeValue(value, ty) >= getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.Contain:
            s = getTypeSafeValue(value, ty).indexOf(getTypeSafeValue(expected, ty)) != -1;
            break;
        case OperatorEnum.NotContain:
            s = getTypeSafeValue(value, ty).indexOf(getTypeSafeValue(expected, ty)) == -1;
            break;
        case OperatorEnum.StartWith:
            s = getTypeSafeValue(value, ty).startsWith(getTypeSafeValue(expected, ty));
            break;
        case OperatorEnum.EndWith:
            s = getTypeSafeValue(value, ty).endsWith(getTypeSafeValue(expected, ty));
            break;
        default:
            break;
    }
    return s;
}

/*
 * Public API Surface of expr-builder
 */

/**
 * Generated bundle index. Do not edit.
 */

export { OperatorEnum, OperatorOptions4Bool, OperatorOptions4Number, OperatorOptions4Text, buildTypeConvertor, evaluateAssertion, getTypeSafeValue, getTypeSafeValueRep, interpretOperator, translateStringToOperator, translateStringToType };
//# sourceMappingURL=polpware-expr-builder.js.map
