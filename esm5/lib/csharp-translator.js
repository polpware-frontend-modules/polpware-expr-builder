import { safeParseBool, safeParseFloat, safeParseInt, safeParseString, tyBool, tyDate, tyNumber, tyString } from '@polpware/fe-utilities';
import { OperatorEnum } from './binary-operators';
/**
 * Translates into a string format for C#.
 * @param op
 * @param ty
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NoYXJwLXRyYW5zbGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvZXhwci1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL2NzaGFycC10cmFuc2xhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBWSxhQUFhLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEosT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsRUFBZ0IsRUFBRSxFQUFZO0lBQzVELEVBQUUsR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1gsUUFBUSxFQUFFLEVBQUU7UUFDUixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDJDQUEyQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNILENBQUMsR0FBRyxrQkFBa0IsQ0FBQzthQUMxQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxhQUFhO1lBQzNCLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDRDQUE0QyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILENBQUMsR0FBRyxtQkFBbUIsQ0FBQzthQUMzQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxLQUFLO1lBQ25CLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDRDQUE0QyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILENBQUMsR0FBRyxtQkFBbUIsQ0FBQzthQUMzQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDRDQUE0QyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILENBQUMsR0FBRyxtQkFBbUIsQ0FBQzthQUMzQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxXQUFXO1lBQ3pCLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDJDQUEyQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNILENBQUMsR0FBRyxrQkFBa0IsQ0FBQzthQUMxQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxnQkFBZ0I7WUFDOUIsSUFBSSxFQUFFLElBQUksUUFBUSxFQUFFO2dCQUNoQixDQUFDLEdBQUcsNENBQTRDLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO2FBQzNCO1lBRUQsTUFBTTtRQUNWLEtBQUssWUFBWSxDQUFDLE9BQU87WUFDckIsQ0FBQyxHQUFHLCtCQUErQixDQUFDO1lBQ3BDLE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxVQUFVO1lBQ3hCLENBQUMsR0FBRywrQkFBK0IsQ0FBQztZQUNwQyxNQUFNO1FBQ1YsS0FBSyxZQUFZLENBQUMsU0FBUztZQUN2QixDQUFDLEdBQUcsNEJBQTRCLENBQUM7WUFDakMsTUFBTTtRQUNWLEtBQUssWUFBWSxDQUFDLE9BQU87WUFDckIsQ0FBQyxHQUFHLDBCQUEwQixDQUFDO1lBQy9CLE1BQU07UUFDVjtZQUNJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDUCxNQUFNO0tBQ2I7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxLQUFVLEVBQUUsU0FBbUI7SUFDL0QsSUFBSSxTQUFTLElBQUksTUFBTSxFQUFFO1FBQ3JCLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7U0FBTSxJQUFJLFNBQVMsSUFBSSxRQUFRLEVBQUU7UUFDOUIsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqQztTQUFNLElBQUksU0FBUyxJQUFJLE1BQU0sRUFBRTtRQUM1QixLQUFLLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUMxQixLQUFLLEdBQUcsb0JBQWtCLEtBQUssTUFBRyxDQUFDO0tBQ3RDO1NBQU0sRUFBRSxVQUFVO1FBQ2YsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7S0FDN0I7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxPQUFlLEVBQUUsT0FBaUI7SUFDakUsSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFO1FBQ25CLE9BQU8sR0FBRyxnQkFBYyxPQUFPLE1BQUcsQ0FBQztLQUN0QztTQUFNLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBRTtRQUM1QixPQUFPLEdBQUcsa0JBQWdCLE9BQU8sTUFBRyxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFO1FBQzFCLE9BQU8sR0FBRyxvQkFBa0IsT0FBTyxNQUFHLENBQUM7S0FDMUM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVR5cGVEZWYsIHNhZmVQYXJzZUJvb2wsIHNhZmVQYXJzZUZsb2F0LCBzYWZlUGFyc2VJbnQsIHNhZmVQYXJzZVN0cmluZywgdHlCb29sLCB0eURhdGUsIHR5TnVtYmVyLCB0eVN0cmluZyB9IGZyb20gJ0Bwb2xwd2FyZS9mZS11dGlsaXRpZXMnO1xuaW1wb3J0IHsgT3BlcmF0b3JFbnVtIH0gZnJvbSAnLi9iaW5hcnktb3BlcmF0b3JzJztcblxuLyoqXG4gKiBUcmFuc2xhdGVzIGludG8gYSBzdHJpbmcgZm9ybWF0IGZvciBDIy5cbiAqIEBwYXJhbSBvcFxuICogQHBhcmFtIHR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnByZXRPcGVyYXRvcihvcDogT3BlcmF0b3JFbnVtLCB0eTogSVR5cGVEZWYpIHtcbiAgICBvcCA9IHNhZmVQYXJzZUludChvcCk7XG4gICAgbGV0IHMgPSAnJztcbiAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLkxlc3NUaGFuOlxuICAgICAgICAgICAgaWYgKHR5ID09IHR5U3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcyA9ICdTdHJpbmcuQ29tcGFyZSh7bGVmdH0sIHtyaWdodH0sIHRydWUpIDwgMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9IDwge3JpZ2h0fSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5MZXNzVGhhbkVxdWFsOlxuICAgICAgICAgICAgaWYgKHR5ID09IHR5U3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcyA9ICdTdHJpbmcuQ29tcGFyZSh7bGVmdH0sIHtyaWdodH0sIHRydWUpIDw9IDAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gJ3tsZWZ0fSA8PSB7cmlnaHR9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLkVxdWFsOlxuICAgICAgICAgICAgaWYgKHR5ID09IHR5U3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcyA9ICdTdHJpbmcuQ29tcGFyZSh7bGVmdH0sIHtyaWdodH0sIHRydWUpID09IDAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gJ3tsZWZ0fSA9PSB7cmlnaHR9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLk5vdEVxdWFsOlxuICAgICAgICAgICAgaWYgKHR5ID09IHR5U3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcyA9ICdTdHJpbmcuQ29tcGFyZSh7bGVmdH0sIHtyaWdodH0sIHRydWUpICE9IDAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gJ3tsZWZ0fSAhPSB7cmlnaHR9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuOlxuICAgICAgICAgICAgaWYgKHR5ID09IHR5U3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcyA9ICdTdHJpbmcuQ29tcGFyZSh7bGVmdH0sIHtyaWdodH0sIHRydWUpID4gMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9ID4ge3JpZ2h0fSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5HcmVhdGVyVGhhbkVxdWFsOlxuICAgICAgICAgICAgaWYgKHR5ID09IHR5U3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcyA9ICdTdHJpbmcuQ29tcGFyZSh7bGVmdH0sIHtyaWdodH0sIHRydWUpID49IDAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gJ3tsZWZ0fSA+PSB7cmlnaHR9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLkNvbnRhaW46XG4gICAgICAgICAgICBzID0gJ3tsZWZ0fS5JbmRleE9mKHtyaWdodH0pICE9IC0xJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5Ob3RDb250YWluOlxuICAgICAgICAgICAgcyA9ICd7bGVmdH0uSW5kZXhPZih7cmlnaHR9KSA9PSAtMSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uU3RhcnRXaXRoOlxuICAgICAgICAgICAgcyA9ICd7bGVmdH0uU3RhcnRzV2l0aCh7cmlnaHR9KSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uRW5kV2l0aDpcbiAgICAgICAgICAgIHMgPSAne2xlZnR9LkVuZHNXaXRoKHtyaWdodH0pJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcyA9ICcnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHM7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIHJlcHJlc2VudGF0aW9uIGZvciB0aGUgZ2l2ZW4gdmFsdWUgd2l0aCB0aGUgZ2l2ZW4gdHlwZS4gXG4gKiBUaGUgZ2l2ZW4gdmFsdWUgaXMgYSBrbm93biB2YWx1ZSwgYW5kIGl0IGNhbiBiZSBvZiBvbmUgb2YgbWFueSB0eXBlcy4gXG4gKiBUeXBpY2FsbHksIHRoZSB2YWx1ZSBpcyBkaXJlY3RseSBvYnRhaW5lZCBmcm9tIHRoZSB1c2VyIGlucHV0IGluIEZvcm0uIFxuICpcbiAqIE91ciBnb2FsIGlzIHByb2R1Y3QgYSB2YWxpZCBDIyBleHByZXNzaW9uIGZvciB0aGUgZ2l2ZW4gdmFsdWUsIHdoaWxlIHJlcHNlY3RpbmcgXG4gKiB0aGUgdHlwZSBpbmZvcm1hdGlvbiBvZiB0aGUgdmFsdWUuIFxuICogXG4gKiBUaGUgcmVwcmVzZW50YXRpb24gaXMgYSB2YWxpZCBDIyBleHByZXNzaW9uLiBcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIHZhbHVlVHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZVNhZmVWYWx1ZVJlcCh2YWx1ZTogYW55LCB2YWx1ZVR5cGU6IElUeXBlRGVmKSB7XG4gICAgaWYgKHZhbHVlVHlwZSA9PSB0eUJvb2wpIHtcbiAgICAgICAgdmFsdWUgPSBzYWZlUGFyc2VCb29sKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PSB0eU51bWJlcikge1xuICAgICAgICB2YWx1ZSA9IHNhZmVQYXJzZUZsb2F0KHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PSB0eURhdGUpIHtcbiAgICAgICAgdmFsdWUgPSBzYWZlUGFyc2VTdHJpbmcodmFsdWUpO1xuICAgICAgICB2YWx1ZSA9ICdcIicgKyB2YWx1ZSArICdcIic7XG4gICAgICAgIHZhbHVlID0gYERhdGVUaW1lLlBhcnNlKCR7dmFsdWV9KWA7XG4gICAgfSBlbHNlIHsgLy8gc3RyaW5nIFxuICAgICAgICB2YWx1ZSA9IHNhZmVQYXJzZVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gJ1wiJyArIHZhbHVlICsgJ1wiJztcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEJ1aWxkIHRoZSByaWdodCB0eXBlIGNvbnZlcnRvciAoaW4gQyMpIGZvciB0aGUgZ2l2ZW4gdmFyaWFibGUgKGEgc3RyaW5nKSBcbiAqIHdpdGggdGhlIGdpdmVuIHR5cGUgaW5mb3JtYXRpb24uIFxuICogXG4gKiBXaGF0IGlzIGRpZmZlcmVudCBmcm9tIHRoZSBhYm92ZSBpcyB0aGF0IHRoZSBhYm92ZSBnZW5lcmF0ZXMgYSB2YWxpZCBsaXRlcmFsIGZyb20gXG4gKiBhIGdpdmVuIGtub3duIHZhbHVlLiBcbiAqIFxuICogSW4gY29udHJhc3QsIHRoZSBnaXZlbiB2YWx1ZSBpbiB0aGlzIG1ldGhvZCBpcyBhIHZhcmlhYmxlIChhIHN0cmluZyksIHdlIGhhdmUgdG8gZ2VuZXJhdGUgXG4gKiBhIHJpZ2h0IHR5cGUgY2FzdCBmb3IgdGhlIGdpdmVuIHN0cmluZyB0byBwcm9kdWNlIGEgdHlwZSBzYWZlIHZhbHVlIGF0IHJ1biB0aW1lLiBcbiAqIFRoZXJlZm9yZSwgXG4gKiAgIC0gd2UgZG8gbm90IHF1b3RlIHRoZSBnaXZlbiB2YWx1ZS4gXG4gKiBAcGFyYW0gdmFyTmFtZVxuICogQHBhcmFtIHZhclR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVHlwZUNvbnZlcnRvcih2YXJOYW1lOiBzdHJpbmcsIHZhclR5cGU6IElUeXBlRGVmKSB7XG4gICAgaWYgKHZhclR5cGUgPT0gdHlCb29sKSB7XG4gICAgICAgIHZhck5hbWUgPSBgYm9vbC5QYXJzZSgke3Zhck5hbWV9KWA7XG4gICAgfSBlbHNlIGlmICh2YXJUeXBlID09IHR5TnVtYmVyKSB7XG4gICAgICAgIHZhck5hbWUgPSBgZG91YmxlLlBhcnNlKCR7dmFyTmFtZX0pYDtcbiAgICB9IGVsc2UgaWYgKHZhclR5cGUgPT0gdHlEYXRlKSB7XG4gICAgICAgIHZhck5hbWUgPSBgRGF0ZVRpbWUuUGFyc2UoJHt2YXJOYW1lfSlgO1xuICAgIH1cbiAgICByZXR1cm4gdmFyTmFtZTtcbn1cbiJdfQ==