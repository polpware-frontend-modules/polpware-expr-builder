import { tyBool, tyNull, tyUndefined, tyNumber, tyString, tyDate, tySymbol, tyObject, tyArray, tyFunction } from '@polpware/fe-utilities';
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
 * Translates the given into a JavaSrcipt type.
 * @param ty
 */
export function translateStringToType(ty) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluYXJ5LW9wZXJhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BvbHB3YXJlL2V4cHItYnVpbGRlci9zcmMvbGliL2JpbmFyeS1vcGVyYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFJLE1BQU0sQ0FBTixJQUFZLFlBYVg7QUFiRCxXQUFZLFlBQVk7SUFDcEIseURBQWEsQ0FBQTtJQUNiLHVEQUFRLENBQUE7SUFDUixpRUFBYSxDQUFBO0lBQ2IsaURBQUssQ0FBQTtJQUNMLHVEQUFRLENBQUE7SUFDUiw2REFBVyxDQUFBO0lBQ1gsdUVBQWdCLENBQUE7SUFFaEIscURBQU8sQ0FBQTtJQUNQLDJEQUFVLENBQUE7SUFDVix5REFBUyxDQUFBO0lBQ1Qsc0RBQU8sQ0FBQTtBQUNYLENBQUMsRUFiVyxZQUFZLEtBQVosWUFBWSxRQWF2QjtBQUVELE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ2xDO1FBQ0ksSUFBSSxFQUFFLEdBQUc7UUFDVCxLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVE7S0FDL0IsRUFBRTtRQUNDLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLFlBQVksQ0FBQyxhQUFhO0tBQ3BDLEVBQUU7UUFDQyxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztLQUM1QixFQUFFO1FBQ0MsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVE7S0FDL0IsRUFBRTtRQUNDLElBQUksRUFBRSxHQUFHO1FBQ1QsS0FBSyxFQUFFLFlBQVksQ0FBQyxXQUFXO0tBQ2xDLEVBQUU7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QUFLLFVBQVU7WUFDWCxPQUFPLFFBQVEsQ0FBQztRQUNwQixLQUFLLFNBQVM7WUFDVixPQUFPLE9BQU8sQ0FBQztRQUNuQixLQUFLLFlBQVk7WUFDYixPQUFPLFVBQVUsQ0FBQztRQUN0QjtZQUNJLE9BQU8sUUFBUSxDQUFDO0tBQ3ZCO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5Qm9vbCwgdHlOdWxsLCB0eVVuZGVmaW5lZCwgdHlOdW1iZXIsIHR5U3RyaW5nLCB0eURhdGUsIHR5U3ltYm9sLCB0eU9iamVjdCwgdHlBcnJheSwgdHlGdW5jdGlvbiB9IGZyb20gJ0Bwb2xwd2FyZS9mZS11dGlsaXRpZXMnO1xuXG5leHBvcnQgZW51bSBPcGVyYXRvckVudW0ge1xuICAgIFVuZGVmaW5lZCA9IDAsXG4gICAgTGVzc1RoYW4sXG4gICAgTGVzc1RoYW5FcXVhbCxcbiAgICBFcXVhbCxcbiAgICBOb3RFcXVhbCxcbiAgICBHcmVhdGVyVGhhbixcbiAgICBHcmVhdGVyVGhhbkVxdWFsLFxuXG4gICAgQ29udGFpbixcbiAgICBOb3RDb250YWluLFxuICAgIFN0YXJ0V2l0aCxcbiAgICBFbmRXaXRoXG59XG5cbmV4cG9ydCBjb25zdCBPcGVyYXRvck9wdGlvbnM0TnVtYmVyID0gW1xuICAgIHtcbiAgICAgICAgdGV4dDogJzwnLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkxlc3NUaGFuXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPD0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkxlc3NUaGFuRXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc9PScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uRXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICchPScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTm90RXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc+JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhblxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJz49JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhbkVxdWFsXG4gICAgfVxuXTtcblxuXG5leHBvcnQgY29uc3QgT3BlcmF0b3JPcHRpb25zNEJvb2wgPSBbXG4gICAge1xuICAgICAgICB0ZXh0OiAnPT0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkVxdWFsXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnIT0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLk5vdEVxdWFsXG4gICAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IE9wZXJhdG9yT3B0aW9uczRUZXh0ID0gW1xuICAgIHtcbiAgICAgICAgdGV4dDogJ0NvbnRhaW5zJyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5Db250YWluXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnQ29udGFpbnMgbm8nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLk5vdENvbnRhaW5cbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICdTdGFydHMgd2l0aCcsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uU3RhcnRXaXRoXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnRW5kcyB3aXRoJyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5FbmRXaXRoXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPCcsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTGVzc1RoYW5cbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc8PScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTGVzc1RoYW5FcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJz09JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5FcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJyE9JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5Ob3RFcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJz4nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPj0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuRXF1YWxcbiAgICB9XG5dO1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIGEgb3BlcmF0b3IgdmFsdWUuXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2QgaXMgZXhwZWN0ZWQgdG8gYmUgaW52b2tlZCB3aGVuICBcbiAqIHBhcnNpbmcgYSBkYXRhZmxvdyBvciByZXBvcnQuIFxuICogVGh1cywgdGhlIGlucHV0IHZhbHVlIGlzIHdlbGwtZGVmaW5lZCBhbmQgbXVzdCBiZSBcbiAqIG9uZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuIFxuICogQHBhcmFtIG9wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVTdHJpbmdUb09wZXJhdG9yKG9wOiBzdHJpbmcpIHtcbiAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5MZXNzVGhhbjtcbiAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5MZXNzVGhhbkVxdWFsO1xuICAgICAgICBjYXNlICc9PSc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLkVxdWFsO1xuICAgICAgICBjYXNlICchPSc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLk5vdEVxdWFsO1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uR3JlYXRlclRoYW47XG4gICAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uR3JlYXRlclRoYW5FcXVhbDtcbiAgICAgICAgY2FzZSAnQ29udGFpbnMnOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5Db250YWluO1xuICAgICAgICBjYXNlICdEb2VzTm90Q29udGFpbic6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLk5vdENvbnRhaW47XG4gICAgICAgIGNhc2UgJ1N0YXJ0c1dpdGgnOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5TdGFydFdpdGg7XG4gICAgICAgIGNhc2UgJ0VuZHNXaXRoJzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uRW5kV2l0aDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uVW5kZWZpbmVkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBnaXZlbiBpbnRvIGEgSmF2YVNyY2lwdCB0eXBlLlxuICogQHBhcmFtIHR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVTdHJpbmdUb1R5cGUodHk6IHN0cmluZykge1xuICAgIHN3aXRjaCAodHkpIHtcbiAgICAgICAgY2FzZSAndHlCb29sJzpcbiAgICAgICAgICAgIHJldHVybiB0eUJvb2w7XG4gICAgICAgIGNhc2UgJ3R5TnVsbCc6XG4gICAgICAgICAgICByZXR1cm4gdHlOdWxsO1xuICAgICAgICBjYXNlICd0eVVuZGVmaW5lZCc6XG4gICAgICAgICAgICByZXR1cm4gdHlVbmRlZmluZWQ7XG4gICAgICAgIGNhc2UgJ3R5TnVtYmVyJzpcbiAgICAgICAgICAgIHJldHVybiB0eU51bWJlcjtcbiAgICAgICAgY2FzZSAndHlTdHJpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIHR5U3RyaW5nO1xuICAgICAgICBjYXNlICd0eURhdGUnOlxuICAgICAgICAgICAgcmV0dXJuIHR5RGF0ZTtcbiAgICAgICAgY2FzZSAndHlTeW1ib2wnOlxuICAgICAgICAgICAgcmV0dXJuIHR5U3ltYm9sO1xuICAgICAgICBjYXNlICd0eU9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gdHlPYmplY3Q7XG4gICAgICAgIGNhc2UgJ3R5QXJyYXknOlxuICAgICAgICAgICAgcmV0dXJuIHR5QXJyYXk7XG4gICAgICAgIGNhc2UgJ3R5RnVuY3Rpb24nOlxuICAgICAgICAgICAgcmV0dXJuIHR5RnVuY3Rpb247XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdHlTdHJpbmc7XG4gICAgfVxufVxuIl19