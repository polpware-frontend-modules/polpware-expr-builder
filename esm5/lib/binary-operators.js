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
export var OperatorOptions4Number = [
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
export var OperatorOptions4Bool = [
    {
        text: '==',
        value: OperatorEnum.Equal
    }, {
        text: '!=',
        value: OperatorEnum.NotEqual
    }
];
export var OperatorOptions4Text = [
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
    var s = '';
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
        value = "DateTime.Parse(" + value + ")";
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
        varName = "bool.Parse(" + varName + ")";
    }
    else if (varType == tyNumber) {
        varName = "double.Parse(" + varName + ")";
    }
    else if (varType == tyDate) {
        varName = "DateTime.Parse(" + varName + ")";
    }
    return varName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluYXJ5LW9wZXJhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9leHByLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvYmluYXJ5LW9wZXJhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVksYUFBYSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXBKLE1BQU0sQ0FBTixJQUFZLFlBYVg7QUFiRCxXQUFZLFlBQVk7SUFDcEIseURBQWEsQ0FBQTtJQUNiLHVEQUFRLENBQUE7SUFDUixpRUFBYSxDQUFBO0lBQ2IsaURBQUssQ0FBQTtJQUNMLHVEQUFRLENBQUE7SUFDUiw2REFBVyxDQUFBO0lBQ1gsdUVBQWdCLENBQUE7SUFFaEIscURBQU8sQ0FBQTtJQUNQLDJEQUFVLENBQUE7SUFDVix5REFBUyxDQUFBO0lBQ1Qsc0RBQU8sQ0FBQTtBQUNYLENBQUMsRUFiVyxZQUFZLEtBQVosWUFBWSxRQWF2QjtBQUVELE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUFHO0lBQ2xDO1FBQ0ksSUFBSSxFQUFFLEdBQUc7UUFDVCxLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVE7S0FDL0IsRUFBRTtRQUNDLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLFlBQVksQ0FBQyxhQUFhO0tBQ3BDLEVBQUU7UUFDQyxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztLQUM1QixFQUFFO1FBQ0MsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVE7S0FDL0IsRUFBRTtRQUNDLElBQUksRUFBRSxHQUFHO1FBQ1QsS0FBSyxFQUFFLFlBQVksQ0FBQyxXQUFXO0tBQ2xDLEVBQUU7UUFDQyxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxZQUFZLENB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IjpbImltcG9ydCB7IElUeXBlRGVmLCBzYWZlUGFyc2VCb29sLCBzYWZlUGFyc2VGbG9hdCwgc2FmZVBhcnNlSW50LCBzYWZlUGFyc2VTdHJpbmcsIHR5Qm9vbCwgdHlEYXRlLCB0eU51bWJlciwgdHlTdHJpbmcgfSBmcm9tICdAcG9scHdhcmUvZmUtdXRpbGl0aWVzJztcblxuZXhwb3J0IGVudW0gT3BlcmF0b3JFbnVtIHtcbiAgICBVbmRlZmluZWQgPSAwLFxuICAgIExlc3NUaGFuLFxuICAgIExlc3NUaGFuRXF1YWwsXG4gICAgRXF1YWwsXG4gICAgTm90RXF1YWwsXG4gICAgR3JlYXRlclRoYW4sXG4gICAgR3JlYXRlclRoYW5FcXVhbCxcblxuICAgIENvbnRhaW4sXG4gICAgTm90Q29udGFpbixcbiAgICBTdGFydFdpdGgsXG4gICAgRW5kV2l0aFxufVxuXG5leHBvcnQgY29uc3QgT3BlcmF0b3JPcHRpb25zNE51bWJlciA9IFtcbiAgICB7XG4gICAgICAgIHRleHQ6ICc8JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5MZXNzVGhhblxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJzw9JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5MZXNzVGhhbkVxdWFsXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPT0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkVxdWFsXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnIT0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLk5vdEVxdWFsXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPicsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uR3JlYXRlclRoYW5cbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc+PScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uR3JlYXRlclRoYW5FcXVhbFxuICAgIH1cbl07XG5cblxuZXhwb3J0IGNvbnN0IE9wZXJhdG9yT3B0aW9uczRCb29sID0gW1xuICAgIHtcbiAgICAgICAgdGV4dDogJz09JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5FcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJyE9JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5Ob3RFcXVhbFxuICAgIH1cbl07XG5cbmV4cG9ydCBjb25zdCBPcGVyYXRvck9wdGlvbnM0VGV4dCA9IFtcbiAgICB7XG4gICAgICAgIHRleHQ6ICdDb250YWlucycsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uQ29udGFpblxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJ0NvbnRhaW5zIG5vJyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5Ob3RDb250YWluXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnU3RhcnRzIHdpdGgnLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLlN0YXJ0V2l0aFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJ0VuZHMgd2l0aCcsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uRW5kV2l0aFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJzwnLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkxlc3NUaGFuXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPD0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkxlc3NUaGFuRXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc9PScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uRXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICchPScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTm90RXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc+JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhblxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJz49JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhbkVxdWFsXG4gICAgfVxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVycHJldE9wZXJhdG9yKG9wOiBPcGVyYXRvckVudW0sIHR5OiBJVHlwZURlZikge1xuICAgIG9wID0gc2FmZVBhcnNlSW50KG9wKTtcbiAgICBsZXQgcyA9ICcnO1xuICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uTGVzc1RoYW46XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPCAwJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9ICd7bGVmdH0gPCB7cmlnaHR9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLkxlc3NUaGFuRXF1YWw6XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPD0gMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9IDw9IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uRXF1YWw6XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPT0gMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9ID09IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uTm90RXF1YWw6XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgIT0gMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9ICE9IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uR3JlYXRlclRoYW46XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPiAwJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9ICd7bGVmdH0gPiB7cmlnaHR9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuRXF1YWw6XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPj0gMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9ID49IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uQ29udGFpbjpcbiAgICAgICAgICAgIHMgPSAne2xlZnR9LkluZGV4T2Yoe3JpZ2h0fSkgIT0gLTEnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLk5vdENvbnRhaW46XG4gICAgICAgICAgICBzID0gJ3tsZWZ0fS5JbmRleE9mKHtyaWdodH0pID09IC0xJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5TdGFydFdpdGg6XG4gICAgICAgICAgICBzID0gJ3tsZWZ0fS5TdGFydHNXaXRoKHtyaWdodH0pJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5FbmRXaXRoOlxuICAgICAgICAgICAgcyA9ICd7bGVmdH0uRW5kc1dpdGgoe3JpZ2h0fSknO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzID0gJyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhIG9wZXJhdG9yIHZhbHVlLlxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIGlzIGV4cGVjdGVkIHRvIGJlIGludm9rZWQgd2hlbiAgXG4gKiBwYXJzaW5nIGEgZGF0YWZsb3cgb3IgcmVwb3J0LiBcbiAqIFRodXMsIHRoZSBpbnB1dCB2YWx1ZSBpcyB3ZWxsLWRlZmluZWQgYW5kIG11c3QgYmUgXG4gKiBvbmUgb2YgdGhlIGdpdmVuIHZhbHVlLiBcbiAqIEBwYXJhbSBvcFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlU3RyaW5nVG9PcGVyYXRvcihvcDogc3RyaW5nKSB7XG4gICAgc3dpdGNoIChvcCkge1xuICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uTGVzc1RoYW47XG4gICAgICAgIGNhc2UgJzw9JzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uTGVzc1RoYW5FcXVhbDtcbiAgICAgICAgY2FzZSAnPT0nOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5FcXVhbDtcbiAgICAgICAgY2FzZSAnIT0nOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5Ob3RFcXVhbDtcbiAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuO1xuICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuRXF1YWw7XG4gICAgICAgIGNhc2UgJ0NvbnRhaW5zJzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uQ29udGFpbjtcbiAgICAgICAgY2FzZSAnRG9lc05vdENvbnRhaW4nOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5Ob3RDb250YWluO1xuICAgICAgICBjYXNlICdTdGFydHNXaXRoJzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uU3RhcnRXaXRoO1xuICAgICAgICBjYXNlICdFbmRzV2l0aCc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLkVuZFdpdGg7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLlVuZGVmaW5lZDtcbiAgICB9XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIHJlcHJlc2VudGF0aW9uIGZvciB0aGUgZ2l2ZW4gdmFsdWUgd2l0aCB0aGUgZ2l2ZW4gdHlwZS4gXG4gKiBUaGUgZ2l2ZW4gdmFsdWUgaXMgYSBrbm93biB2YWx1ZSwgYW5kIGl0IGNhbiBiZSBvZiBvbmUgb2YgbWFueSB0eXBlcy4gXG4gKiBUeXBpY2FsbHksIHRoZSB2YWx1ZSBpcyBkaXJlY3RseSBvYnRhaW5lZCBmcm9tIHRoZSB1c2VyIGlucHV0IGluIEZvcm0uIFxuICpcbiAqIE91ciBnb2FsIGlzIHByb2R1Y3QgYSB2YWxpZCBDIyBleHByZXNzaW9uIGZvciB0aGUgZ2l2ZW4gdmFsdWUsIHdoaWxlIHJlcHNlY3RpbmcgXG4gKiB0aGUgdHlwZSBpbmZvcm1hdGlvbiBvZiB0aGUgdmFsdWUuIFxuICogXG4gKiBUaGUgcmVwcmVzZW50YXRpb24gaXMgYSB2YWxpZCBDIyBleHByZXNzaW9uLiBcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIHZhbHVlVHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZVNhZmVWYWx1ZVJlcCh2YWx1ZTogYW55LCB2YWx1ZVR5cGU6IElUeXBlRGVmKSB7XG4gICAgaWYgKHZhbHVlVHlwZSA9PSB0eUJvb2wpIHtcbiAgICAgICAgdmFsdWUgPSBzYWZlUGFyc2VCb29sKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PSB0eU51bWJlcikge1xuICAgICAgICB2YWx1ZSA9IHNhZmVQYXJzZUZsb2F0KHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PSB0eURhdGUpIHtcbiAgICAgICAgdmFsdWUgPSBzYWZlUGFyc2VTdHJpbmcodmFsdWUpO1xuICAgICAgICB2YWx1ZSA9ICdcIicgKyB2YWx1ZSArICdcIic7XG4gICAgICAgIHZhbHVlID0gYERhdGVUaW1lLlBhcnNlKCR7dmFsdWV9KWA7XG4gICAgfSBlbHNlIHsgLy8gc3RyaW5nIFxuICAgICAgICB2YWx1ZSA9IHNhZmVQYXJzZVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gJ1wiJyArIHZhbHVlICsgJ1wiJztcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEJ1aWxkIHRoZSByaWdodCB0eXBlIGNvbnZlcnRvciAoaW4gQyMpIGZvciB0aGUgZ2l2ZW4gdmFyaWFibGUgKGEgc3RyaW5nKSBcbiAqIHdpdGggdGhlIGdpdmVuIHR5cGUgaW5mb3JtYXRpb24uIFxuICogXG4gKiBXaGF0IGlzIGRpZmZlcmVudCBmcm9tIHRoZSBhYm92ZSBpcyB0aGF0IHRoZSBhYm92ZSBnZW5lcmF0ZXMgYSB2YWxpZCBsaXRlcmFsIGZyb20gXG4gKiBhIGdpdmVuIGtub3duIHZhbHVlLiBcbiAqIFxuICogSW4gY29udHJhc3QsIHRoZSBnaXZlbiB2YWx1ZSBpbiB0aGlzIG1ldGhvZCBpcyBhIHZhcmlhYmxlIChhIHN0cmluZyksIHdlIGhhdmUgdG8gZ2VuZXJhdGUgXG4gKiBhIHJpZ2h0IHR5cGUgY2FzdCBmb3IgdGhlIGdpdmVuIHN0cmluZyB0byBwcm9kdWNlIGEgdHlwZSBzYWZlIHZhbHVlIGF0IHJ1biB0aW1lLiBcbiAqIFRoZXJlZm9yZSwgXG4gKiAgIC0gd2UgZG8gbm90IHF1b3RlIHRoZSBnaXZlbiB2YWx1ZS4gXG4gKiBAcGFyYW0gdmFyTmFtZVxuICogQHBhcmFtIHZhclR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVHlwZUNvbnZlcnRvcih2YXJOYW1lOiBzdHJpbmcsIHZhclR5cGU6IElUeXBlRGVmKSB7XG4gICAgaWYgKHZhclR5cGUgPT0gdHlCb29sKSB7XG4gICAgICAgIHZhck5hbWUgPSBgYm9vbC5QYXJzZSgke3Zhck5hbWV9KWA7XG4gICAgfSBlbHNlIGlmICh2YXJUeXBlID09IHR5TnVtYmVyKSB7XG4gICAgICAgIHZhck5hbWUgPSBgZG91YmxlLlBhcnNlKCR7dmFyTmFtZX0pYDtcbiAgICB9IGVsc2UgaWYgKHZhclR5cGUgPT0gdHlEYXRlKSB7XG4gICAgICAgIHZhck5hbWUgPSBgRGF0ZVRpbWUuUGFyc2UoJHt2YXJOYW1lfSlgO1xuICAgIH1cbiAgICByZXR1cm4gdmFyTmFtZTtcbn1cbiJdfQ==