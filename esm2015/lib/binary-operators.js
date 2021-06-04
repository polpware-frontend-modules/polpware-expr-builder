import { safeParseBool, safeParseFloat, safeParseInt, safeParseString, tyBool, tyDate, tyNumber, tyString } from '@polpware/fe-utilities';
export var OperatorEnum;
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
export const OperatorOptions4Number = [
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
export const OperatorOptions4Bool = [
    {
        text: '==',
        value: OperatorEnum.Equal
    }, {
        text: '!=',
        value: OperatorEnum.NotEqual
    }
];
export const OperatorOptions4Text = [
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
export function interpretOperator(op, ty) {
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
 * Translates the given string into a operator value.
 * Note that this method is expected to be invoked when
 * parsing a dataflow or report.
 * Thus, the input value is well-defined and must be
 * one of the given value.
 * @param op
 */
export function translateStringToOperator(op) {
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
export function getTypeSafeValueRep(value, valueType) {
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
export function buildTypeConvertor(varName, varType) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluYXJ5LW9wZXJhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9leHByLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvYmluYXJ5LW9wZXJhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVksYUFBYSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXBKLE1BQU0sQ0FBTixJQUFZLFlBYVg7QUFiRCxXQUFZLFlBQVk7SUFDcEIseURBQWEsQ0FBQTtJQUNiLHVEQUFRLENBQUE7SUFDUixpRUFBYSxDQUFBO0lBQ2IsaURBQUssQ0FBQTtJQUNMLHVEQUFRLENBQUE7SUFDUiw2REFBVyxDQUFBO0lBQ1gsdUVBQWdCLENBQUE7SUFFaEIscURBQU8sQ0FBQTtJQUNQLDJEQUFVLENBQUE7SUFDVix5REFBUyxDQUFBO0lBQ1Qsc0RBQU8sQ0FBQTtBQUNYLENBQUMsRUFiVyxZQUFZLEtBQVosWUFBWSxRQWF2QjtBQUVELE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ2xDO1FBQ0ksSUFBSSxFQUFFLEdBQUc7UUFDVCxLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVE7S0FDL0IsRUFBRTtRQUNDLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLFlBQVksQ0FBQyxhQUFhO0tBQ3BDLEVBQUU7UUFDQyxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztLQUM1QixFQUFFO1FBQ0MsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVE7S0FDL0IsRUFBRTtRQUNDLElBQUksRUFBRSxHQUFHO1FBQ1QsS0FBSyxFQUFFLFlBQVksQ0FBQyxXQUFXO0tBQ2xDLEVBQUU7UUFDQyxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxZQUFZLENB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OlsiaW1wb3J0IHsgSVR5cGVEZWYsIHNhZmVQYXJzZUJvb2wsIHNhZmVQYXJzZUZsb2F0LCBzYWZlUGFyc2VJbnQsIHNhZmVQYXJzZVN0cmluZywgdHlCb29sLCB0eURhdGUsIHR5TnVtYmVyLCB0eVN0cmluZyB9IGZyb20gJ0Bwb2xwd2FyZS9mZS11dGlsaXRpZXMnO1xuXG5leHBvcnQgZW51bSBPcGVyYXRvckVudW0ge1xuICAgIFVuZGVmaW5lZCA9IDAsXG4gICAgTGVzc1RoYW4sXG4gICAgTGVzc1RoYW5FcXVhbCxcbiAgICBFcXVhbCxcbiAgICBOb3RFcXVhbCxcbiAgICBHcmVhdGVyVGhhbixcbiAgICBHcmVhdGVyVGhhbkVxdWFsLFxuXG4gICAgQ29udGFpbixcbiAgICBOb3RDb250YWluLFxuICAgIFN0YXJ0V2l0aCxcbiAgICBFbmRXaXRoXG59XG5cbmV4cG9ydCBjb25zdCBPcGVyYXRvck9wdGlvbnM0TnVtYmVyID0gW1xuICAgIHtcbiAgICAgICAgdGV4dDogJzwnLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkxlc3NUaGFuXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPD0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkxlc3NUaGFuRXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc9PScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uRXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICchPScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTm90RXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc+JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhblxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJz49JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhbkVxdWFsXG4gICAgfVxuXTtcblxuXG5leHBvcnQgY29uc3QgT3BlcmF0b3JPcHRpb25zNEJvb2wgPSBbXG4gICAge1xuICAgICAgICB0ZXh0OiAnPT0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkVxdWFsXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnIT0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLk5vdEVxdWFsXG4gICAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IE9wZXJhdG9yT3B0aW9uczRUZXh0ID0gW1xuICAgIHtcbiAgICAgICAgdGV4dDogJ0NvbnRhaW5zJyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5Db250YWluXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnQ29udGFpbnMgbm8nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLk5vdENvbnRhaW5cbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICdTdGFydHMgd2l0aCcsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uU3RhcnRXaXRoXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnRW5kcyB3aXRoJyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5FbmRXaXRoXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPCcsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTGVzc1RoYW5cbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc8PScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTGVzc1RoYW5FcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJz09JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5FcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJyE9JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5Ob3RFcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJz4nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPj0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuRXF1YWxcbiAgICB9XG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwcmV0T3BlcmF0b3Iob3A6IE9wZXJhdG9yRW51bSwgdHk6IElUeXBlRGVmKSB7XG4gICAgb3AgPSBzYWZlUGFyc2VJbnQob3ApO1xuICAgIGxldCBzID0gJyc7XG4gICAgc3dpdGNoIChvcCkge1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5MZXNzVGhhbjpcbiAgICAgICAgICAgIGlmICh0eSA9PSB0eVN0cmluZykge1xuICAgICAgICAgICAgICAgIHMgPSAnU3RyaW5nLkNvbXBhcmUoe2xlZnR9LCB7cmlnaHR9LCB0cnVlKSA8IDAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gJ3tsZWZ0fSA8IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uTGVzc1RoYW5FcXVhbDpcbiAgICAgICAgICAgIGlmICh0eSA9PSB0eVN0cmluZykge1xuICAgICAgICAgICAgICAgIHMgPSAnU3RyaW5nLkNvbXBhcmUoe2xlZnR9LCB7cmlnaHR9LCB0cnVlKSA8PSAwJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9ICd7bGVmdH0gPD0ge3JpZ2h0fSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5FcXVhbDpcbiAgICAgICAgICAgIGlmICh0eSA9PSB0eVN0cmluZykge1xuICAgICAgICAgICAgICAgIHMgPSAnU3RyaW5nLkNvbXBhcmUoe2xlZnR9LCB7cmlnaHR9LCB0cnVlKSA9PSAwJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9ICd7bGVmdH0gPT0ge3JpZ2h0fSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5Ob3RFcXVhbDpcbiAgICAgICAgICAgIGlmICh0eSA9PSB0eVN0cmluZykge1xuICAgICAgICAgICAgICAgIHMgPSAnU3RyaW5nLkNvbXBhcmUoe2xlZnR9LCB7cmlnaHR9LCB0cnVlKSAhPSAwJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9ICd7bGVmdH0gIT0ge3JpZ2h0fSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhbjpcbiAgICAgICAgICAgIGlmICh0eSA9PSB0eVN0cmluZykge1xuICAgICAgICAgICAgICAgIHMgPSAnU3RyaW5nLkNvbXBhcmUoe2xlZnR9LCB7cmlnaHR9LCB0cnVlKSA+IDAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gJ3tsZWZ0fSA+IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uR3JlYXRlclRoYW5FcXVhbDpcbiAgICAgICAgICAgIGlmICh0eSA9PSB0eVN0cmluZykge1xuICAgICAgICAgICAgICAgIHMgPSAnU3RyaW5nLkNvbXBhcmUoe2xlZnR9LCB7cmlnaHR9LCB0cnVlKSA+PSAwJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9ICd7bGVmdH0gPj0ge3JpZ2h0fSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5Db250YWluOlxuICAgICAgICAgICAgcyA9ICd7bGVmdH0uSW5kZXhPZih7cmlnaHR9KSAhPSAtMSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uTm90Q29udGFpbjpcbiAgICAgICAgICAgIHMgPSAne2xlZnR9LkluZGV4T2Yoe3JpZ2h0fSkgPT0gLTEnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLlN0YXJ0V2l0aDpcbiAgICAgICAgICAgIHMgPSAne2xlZnR9LlN0YXJ0c1dpdGgoe3JpZ2h0fSknO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLkVuZFdpdGg6XG4gICAgICAgICAgICBzID0gJ3tsZWZ0fS5FbmRzV2l0aCh7cmlnaHR9KSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHMgPSAnJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBzO1xufVxuXG4vKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIGEgb3BlcmF0b3IgdmFsdWUuXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2QgaXMgZXhwZWN0ZWQgdG8gYmUgaW52b2tlZCB3aGVuICBcbiAqIHBhcnNpbmcgYSBkYXRhZmxvdyBvciByZXBvcnQuIFxuICogVGh1cywgdGhlIGlucHV0IHZhbHVlIGlzIHdlbGwtZGVmaW5lZCBhbmQgbXVzdCBiZSBcbiAqIG9uZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuIFxuICogQHBhcmFtIG9wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVTdHJpbmdUb09wZXJhdG9yKG9wOiBzdHJpbmcpIHtcbiAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5MZXNzVGhhbjtcbiAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5MZXNzVGhhbkVxdWFsO1xuICAgICAgICBjYXNlICc9PSc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLkVxdWFsO1xuICAgICAgICBjYXNlICchPSc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLk5vdEVxdWFsO1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uR3JlYXRlclRoYW47XG4gICAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uR3JlYXRlclRoYW5FcXVhbDtcbiAgICAgICAgY2FzZSAnQ29udGFpbnMnOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5Db250YWluO1xuICAgICAgICBjYXNlICdEb2VzTm90Q29udGFpbic6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLk5vdENvbnRhaW47XG4gICAgICAgIGNhc2UgJ1N0YXJ0c1dpdGgnOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5TdGFydFdpdGg7XG4gICAgICAgIGNhc2UgJ0VuZHNXaXRoJzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uRW5kV2l0aDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uVW5kZWZpbmVkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgcmVwcmVzZW50YXRpb24gZm9yIHRoZSBnaXZlbiB2YWx1ZSB3aXRoIHRoZSBnaXZlbiB0eXBlLiBcbiAqIFRoZSBnaXZlbiB2YWx1ZSBpcyBhIGtub3duIHZhbHVlLCBhbmQgaXQgY2FuIGJlIG9mIG9uZSBvZiBtYW55IHR5cGVzLiBcbiAqIFR5cGljYWxseSwgdGhlIHZhbHVlIGlzIGRpcmVjdGx5IG9idGFpbmVkIGZyb20gdGhlIHVzZXIgaW5wdXQgaW4gRm9ybS4gXG4gKlxuICogT3VyIGdvYWwgaXMgcHJvZHVjdCBhIHZhbGlkIEMjIGV4cHJlc3Npb24gZm9yIHRoZSBnaXZlbiB2YWx1ZSwgd2hpbGUgcmVwc2VjdGluZyBcbiAqIHRoZSB0eXBlIGluZm9ybWF0aW9uIG9mIHRoZSB2YWx1ZS4gXG4gKiBcbiAqIFRoZSByZXByZXNlbnRhdGlvbiBpcyBhIHZhbGlkIEMjIGV4cHJlc3Npb24uIFxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gdmFsdWVUeXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlU2FmZVZhbHVlUmVwKHZhbHVlOiBhbnksIHZhbHVlVHlwZTogSVR5cGVEZWYpIHtcbiAgICBpZiAodmFsdWVUeXBlID09IHR5Qm9vbCkge1xuICAgICAgICB2YWx1ZSA9IHNhZmVQYXJzZUJvb2wodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlID09IHR5TnVtYmVyKSB7XG4gICAgICAgIHZhbHVlID0gc2FmZVBhcnNlRmxvYXQodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlID09IHR5RGF0ZSkge1xuICAgICAgICB2YWx1ZSA9IHNhZmVQYXJzZVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gJ1wiJyArIHZhbHVlICsgJ1wiJztcbiAgICAgICAgdmFsdWUgPSBgRGF0ZVRpbWUuUGFyc2UoJHt2YWx1ZX0pYDtcbiAgICB9IGVsc2UgeyAvLyBzdHJpbmcgXG4gICAgICAgIHZhbHVlID0gc2FmZVBhcnNlU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgdmFsdWUgPSAnXCInICsgdmFsdWUgKyAnXCInO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQnVpbGQgdGhlIHJpZ2h0IHR5cGUgY29udmVydG9yIChpbiBDIykgZm9yIHRoZSBnaXZlbiB2YXJpYWJsZSAoYSBzdHJpbmcpIFxuICogd2l0aCB0aGUgZ2l2ZW4gdHlwZSBpbmZvcm1hdGlvbi4gXG4gKiBcbiAqIFdoYXQgaXMgZGlmZmVyZW50IGZyb20gdGhlIGFib3ZlIGlzIHRoYXQgdGhlIGFib3ZlIGdlbmVyYXRlcyBhIHZhbGlkIGxpdGVyYWwgZnJvbSBcbiAqIGEgZ2l2ZW4ga25vd24gdmFsdWUuIFxuICogXG4gKiBJbiBjb250cmFzdCwgdGhlIGdpdmVuIHZhbHVlIGluIHRoaXMgbWV0aG9kIGlzIGEgdmFyaWFibGUgKGEgc3RyaW5nKSwgd2UgaGF2ZSB0byBnZW5lcmF0ZSBcbiAqIGEgcmlnaHQgdHlwZSBjYXN0IGZvciB0aGUgZ2l2ZW4gc3RyaW5nIHRvIHByb2R1Y2UgYSB0eXBlIHNhZmUgdmFsdWUgYXQgcnVuIHRpbWUuIFxuICogVGhlcmVmb3JlLCBcbiAqICAgLSB3ZSBkbyBub3QgcXVvdGUgdGhlIGdpdmVuIHZhbHVlLiBcbiAqIEBwYXJhbSB2YXJOYW1lXG4gKiBAcGFyYW0gdmFyVHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRUeXBlQ29udmVydG9yKHZhck5hbWU6IHN0cmluZywgdmFyVHlwZTogSVR5cGVEZWYpIHtcbiAgICBpZiAodmFyVHlwZSA9PSB0eUJvb2wpIHtcbiAgICAgICAgdmFyTmFtZSA9IGBib29sLlBhcnNlKCR7dmFyTmFtZX0pYDtcbiAgICB9IGVsc2UgaWYgKHZhclR5cGUgPT0gdHlOdW1iZXIpIHtcbiAgICAgICAgdmFyTmFtZSA9IGBkb3VibGUuUGFyc2UoJHt2YXJOYW1lfSlgO1xuICAgIH0gZWxzZSBpZiAodmFyVHlwZSA9PSB0eURhdGUpIHtcbiAgICAgICAgdmFyTmFtZSA9IGBEYXRlVGltZS5QYXJzZSgke3Zhck5hbWV9KWA7XG4gICAgfVxuICAgIHJldHVybiB2YXJOYW1lO1xufVxuIl19