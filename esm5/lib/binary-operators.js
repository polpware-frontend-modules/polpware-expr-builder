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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluYXJ5LW9wZXJhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9leHByLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvYmluYXJ5LW9wZXJhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQU4sSUFBWSxZQWFYO0FBYkQsV0FBWSxZQUFZO0lBQ3BCLHlEQUFhLENBQUE7SUFDYix1REFBUSxDQUFBO0lBQ1IsaUVBQWEsQ0FBQTtJQUNiLGlEQUFLLENBQUE7SUFDTCx1REFBUSxDQUFBO0lBQ1IsNkRBQVcsQ0FBQTtJQUNYLHVFQUFnQixDQUFBO0lBRWhCLHFEQUFPLENBQUE7SUFDUCwyREFBVSxDQUFBO0lBQ1YseURBQVMsQ0FBQTtJQUNULHNEQUFPLENBQUE7QUFDWCxDQUFDLEVBYlcsWUFBWSxLQUFaLFlBQVksUUFhdkI7QUFFRCxNQUFNLENBQUMsSUFBTSxzQkFBc0IsR0FBRztJQUNsQztRQUNJLElBQUksRUFBRSxHQUFHO1FBQ1QsS0FBSyxFQUFFLFlBQVksQ0FBQyxRQUFRO0tBQy9CLEVBQUU7UUFDQyxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxZQUFZLENBQUMsYUFBYTtLQUNwQyxFQUFFO1FBQ0MsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7S0FDNUIsRUFBRTtRQUNDLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLFlBQVksQ0FBQyxRQUFRO0tBQy9CLEVBQUU7UUFDQyxJQUFJLEVBQUUsR0FBRztRQUNULEtBQUssRUFBRSxZQUFZLENBQUMsV0FBVztLQUNsQyxFQUFFO1FBQ0MsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsWUFBWSxDQUFDLGdCQUFnQjtLQUN2QztDQUNKLENBQUM7QUFHRixNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRztJQUNoQztRQUNJLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLO0tBQzVCLEVBQUU7UUFDQyxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxZQUFZLENBQUMsUUFBUTtLQUMvQjtDQUNKLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRztJQUNoQztRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxZQUFZLENBQUMsT0FBTztLQUM5QixFQUFFO1FBQ0MsSUFBSSxFQUFFLGFBQWE7UUFDbkIsS0FBSyxFQUFFLFlBQVksQ0FBQyxVQUFVO0tBQ2pDLEVBQUU7UUFDQyxJQUFJLEVBQUUsYUFBYTtRQUNuQixLQUFLLEVBQUUsWUFBWSxDQUFDLFNBQVM7S0FDaEMsRUFBRTtRQUNDLElBQUksRUFBRSxXQUFXO1FBQ2pCLEtBQUssRUFBRSxZQUFZLENBQUMsT0FBTztLQUM5QixFQUFFO1FBQ0MsSUFBSSxFQUFFLEdBQUc7UUFDVCxLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVE7S0FDL0IsRUFBRTtRQUNDLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLFlBQVksQ0FBQyxhQUFhO0tBQ3BDLEVBQUU7UUFDQyxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztLQUM1QixFQUFFO1FBQ0MsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVE7S0FDL0IsRUFBRTtRQUNDLElBQUksRUFBRSxHQUFHO1FBQ1QsS0FBSyxFQUFFLFlBQVksQ0FBQyxXQUFXO0tBQ2xDLEVBQUU7UUFDQyxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxZQUFZLENBQUMsZ0JBQWdCO0tBQ3ZDO0NBQ0osQ0FBQztBQUVGOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQUMsRUFBVTtJQUNoRCxRQUFRLEVBQUUsRUFBRTtRQUNSLEtBQUssR0FBRztZQUNKLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxLQUFLLElBQUk7WUFDTCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFDdEMsS0FBSyxJQUFJO1lBQ0wsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzlCLEtBQUssSUFBSTtZQUNMLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxLQUFLLEdBQUc7WUFDSixPQUFPLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDcEMsS0FBSyxJQUFJO1lBQ0wsT0FBTyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7UUFDekMsS0FBSyxVQUFVO1lBQ1gsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ2hDLEtBQUssZ0JBQWdCO1lBQ2pCLE9BQU8sWUFBWSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxLQUFLLFlBQVk7WUFDYixPQUFPLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDbEMsS0FBSyxVQUFVO1lBQ1gsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ2hDO1lBQ0ksT0FBTyxZQUFZLENBQUMsU0FBUyxDQUFDO0tBQ3JDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIE9wZXJhdG9yRW51bSB7XG4gICAgVW5kZWZpbmVkID0gMCxcbiAgICBMZXNzVGhhbixcbiAgICBMZXNzVGhhbkVxdWFsLFxuICAgIEVxdWFsLFxuICAgIE5vdEVxdWFsLFxuICAgIEdyZWF0ZXJUaGFuLFxuICAgIEdyZWF0ZXJUaGFuRXF1YWwsXG5cbiAgICBDb250YWluLFxuICAgIE5vdENvbnRhaW4sXG4gICAgU3RhcnRXaXRoLFxuICAgIEVuZFdpdGhcbn1cblxuZXhwb3J0IGNvbnN0IE9wZXJhdG9yT3B0aW9uczROdW1iZXIgPSBbXG4gICAge1xuICAgICAgICB0ZXh0OiAnPCcsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTGVzc1RoYW5cbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc8PScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTGVzc1RoYW5FcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJz09JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5FcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJyE9JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5Ob3RFcXVhbFxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJz4nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPj0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuRXF1YWxcbiAgICB9XG5dO1xuXG5cbmV4cG9ydCBjb25zdCBPcGVyYXRvck9wdGlvbnM0Qm9vbCA9IFtcbiAgICB7XG4gICAgICAgIHRleHQ6ICc9PScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uRXF1YWxcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICchPScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTm90RXF1YWxcbiAgICB9XG5dO1xuXG5leHBvcnQgY29uc3QgT3BlcmF0b3JPcHRpb25zNFRleHQgPSBbXG4gICAge1xuICAgICAgICB0ZXh0OiAnQ29udGFpbnMnLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkNvbnRhaW5cbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICdDb250YWlucyBubycsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uTm90Q29udGFpblxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJ1N0YXJ0cyB3aXRoJyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5TdGFydFdpdGhcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICdFbmRzIHdpdGgnLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkVuZFdpdGhcbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc8JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5MZXNzVGhhblxuICAgIH0sIHtcbiAgICAgICAgdGV4dDogJzw9JyxcbiAgICAgICAgdmFsdWU6IE9wZXJhdG9yRW51bS5MZXNzVGhhbkVxdWFsXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPT0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLkVxdWFsXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnIT0nLFxuICAgICAgICB2YWx1ZTogT3BlcmF0b3JFbnVtLk5vdEVxdWFsXG4gICAgfSwge1xuICAgICAgICB0ZXh0OiAnPicsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uR3JlYXRlclRoYW5cbiAgICB9LCB7XG4gICAgICAgIHRleHQ6ICc+PScsXG4gICAgICAgIHZhbHVlOiBPcGVyYXRvckVudW0uR3JlYXRlclRoYW5FcXVhbFxuICAgIH1cbl07XG5cbi8qKlxuICogVHJhbnNsYXRlcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gYSBvcGVyYXRvciB2YWx1ZS5cbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCBpcyBleHBlY3RlZCB0byBiZSBpbnZva2VkIHdoZW4gIFxuICogcGFyc2luZyBhIGRhdGFmbG93IG9yIHJlcG9ydC4gXG4gKiBUaHVzLCB0aGUgaW5wdXQgdmFsdWUgaXMgd2VsbC1kZWZpbmVkIGFuZCBtdXN0IGJlIFxuICogb25lIG9mIHRoZSBnaXZlbiB2YWx1ZS4gXG4gKiBAcGFyYW0gb3BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZVN0cmluZ1RvT3BlcmF0b3Iob3A6IHN0cmluZykge1xuICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLkxlc3NUaGFuO1xuICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLkxlc3NUaGFuRXF1YWw7XG4gICAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uRXF1YWw7XG4gICAgICAgIGNhc2UgJyE9JzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uTm90RXF1YWw7XG4gICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhbjtcbiAgICAgICAgY2FzZSAnPj0nOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhbkVxdWFsO1xuICAgICAgICBjYXNlICdDb250YWlucyc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLkNvbnRhaW47XG4gICAgICAgIGNhc2UgJ0RvZXNOb3RDb250YWluJzpcbiAgICAgICAgICAgIHJldHVybiBPcGVyYXRvckVudW0uTm90Q29udGFpbjtcbiAgICAgICAgY2FzZSAnU3RhcnRzV2l0aCc6XG4gICAgICAgICAgICByZXR1cm4gT3BlcmF0b3JFbnVtLlN0YXJ0V2l0aDtcbiAgICAgICAgY2FzZSAnRW5kc1dpdGgnOlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5FbmRXaXRoO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIE9wZXJhdG9yRW51bS5VbmRlZmluZWQ7XG4gICAgfVxufVxuIl19