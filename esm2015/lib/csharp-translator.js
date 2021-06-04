import { safeParseBool, safeParseFloat, safeParseInt, safeParseString, tyBool, tyDate, tyNumber, tyString } from '@polpware/fe-utilities';
import { OperatorEnum } from './binary-operators';
/**
 * Translates into a string format for C#.
 * @param op
 * @param ty
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NoYXJwLXRyYW5zbGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvZXhwci1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL2NzaGFycC10cmFuc2xhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBWSxhQUFhLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEosT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsRUFBZ0IsRUFBRSxFQUFZO0lBQzVELEVBQUUsR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1gsUUFBUSxFQUFFLEVBQUU7UUFDUixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDJDQUEyQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNILENBQUMsR0FBRyxrQkFBa0IsQ0FBQzthQUMxQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxhQUFhO1lBQzNCLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDRDQUE0QyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILENBQUMsR0FBRyxtQkFBbUIsQ0FBQzthQUMzQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxLQUFLO1lBQ25CLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDRDQUE0QyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILENBQUMsR0FBRyxtQkFBbUIsQ0FBQzthQUMzQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDRDQUE0QyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILENBQUMsR0FBRyxtQkFBbUIsQ0FBQzthQUMzQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxXQUFXO1lBQ3pCLElBQUksRUFBRSxJQUFJLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxHQUFHLDJDQUEyQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNILENBQUMsR0FBRyxrQkFBa0IsQ0FBQzthQUMxQjtZQUVELE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxnQkFBZ0I7WUFDOUIsSUFBSSxFQUFFLElBQUksUUFBUSxFQUFFO2dCQUNoQixDQUFDLEdBQUcsNENBQTRDLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO2FBQzNCO1lBRUQsTUFBTTtRQUNWLEtBQUssWUFBWSxDQUFDLE9BQU87WUFDckIsQ0FBQyxHQUFHLCtCQUErQixDQUFDO1lBQ3BDLE1BQU07UUFDVixLQUFLLFlBQVksQ0FBQyxVQUFVO1lBQ3hCLENBQUMsR0FBRywrQkFBK0IsQ0FBQztZQUNwQyxNQUFNO1FBQ1YsS0FBSyxZQUFZLENBQUMsU0FBUztZQUN2QixDQUFDLEdBQUcsNEJBQTRCLENBQUM7WUFDakMsTUFBTTtRQUNWLEtBQUssWUFBWSxDQUFDLE9BQU87WUFDckIsQ0FBQyxHQUFHLDBCQUEwQixDQUFDO1lBQy9CLE1BQU07UUFDVjtZQUNJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDUCxNQUFNO0tBQ2I7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxLQUFVLEVBQUUsU0FBbUI7SUFDL0QsSUFBSSxTQUFTLElBQUksTUFBTSxFQUFFO1FBQ3JCLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7U0FBTSxJQUFJLFNBQVMsSUFBSSxRQUFRLEVBQUU7UUFDOUIsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqQztTQUFNLElBQUksU0FBUyxJQUFJLE1BQU0sRUFBRTtRQUM1QixLQUFLLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUMxQixLQUFLLEdBQUcsa0JBQWtCLEtBQUssR0FBRyxDQUFDO0tBQ3RDO1NBQU0sRUFBRSxVQUFVO1FBQ2YsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7S0FDN0I7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxPQUFlLEVBQUUsT0FBaUI7SUFDakUsSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFO1FBQ25CLE9BQU8sR0FBRyxjQUFjLE9BQU8sR0FBRyxDQUFDO0tBQ3RDO1NBQU0sSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO1FBQzVCLE9BQU8sR0FBRyxnQkFBZ0IsT0FBTyxHQUFHLENBQUM7S0FDeEM7U0FBTSxJQUFJLE9BQU8sSUFBSSxNQUFNLEVBQUU7UUFDMUIsT0FBTyxHQUFHLGtCQUFrQixPQUFPLEdBQUcsQ0FBQztLQUMxQztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHlwZURlZiwgc2FmZVBhcnNlQm9vbCwgc2FmZVBhcnNlRmxvYXQsIHNhZmVQYXJzZUludCwgc2FmZVBhcnNlU3RyaW5nLCB0eUJvb2wsIHR5RGF0ZSwgdHlOdW1iZXIsIHR5U3RyaW5nIH0gZnJvbSAnQHBvbHB3YXJlL2ZlLXV0aWxpdGllcyc7XG5pbXBvcnQgeyBPcGVyYXRvckVudW0gfSBmcm9tICcuL2JpbmFyeS1vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgaW50byBhIHN0cmluZyBmb3JtYXQgZm9yIEMjLlxuICogQHBhcmFtIG9wXG4gKiBAcGFyYW0gdHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVycHJldE9wZXJhdG9yKG9wOiBPcGVyYXRvckVudW0sIHR5OiBJVHlwZURlZikge1xuICAgIG9wID0gc2FmZVBhcnNlSW50KG9wKTtcbiAgICBsZXQgcyA9ICcnO1xuICAgIHN3aXRjaCAob3ApIHtcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uTGVzc1RoYW46XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPCAwJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9ICd7bGVmdH0gPCB7cmlnaHR9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLkxlc3NUaGFuRXF1YWw6XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPD0gMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9IDw9IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uRXF1YWw6XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPT0gMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9ID09IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uTm90RXF1YWw6XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgIT0gMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9ICE9IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uR3JlYXRlclRoYW46XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPiAwJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9ICd7bGVmdH0gPiB7cmlnaHR9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLkdyZWF0ZXJUaGFuRXF1YWw6XG4gICAgICAgICAgICBpZiAodHkgPT0gdHlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzID0gJ1N0cmluZy5Db21wYXJlKHtsZWZ0fSwge3JpZ2h0fSwgdHJ1ZSkgPj0gMCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSAne2xlZnR9ID49IHtyaWdodH0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPcGVyYXRvckVudW0uQ29udGFpbjpcbiAgICAgICAgICAgIHMgPSAne2xlZnR9LkluZGV4T2Yoe3JpZ2h0fSkgIT0gLTEnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlcmF0b3JFbnVtLk5vdENvbnRhaW46XG4gICAgICAgICAgICBzID0gJ3tsZWZ0fS5JbmRleE9mKHtyaWdodH0pID09IC0xJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5TdGFydFdpdGg6XG4gICAgICAgICAgICBzID0gJ3tsZWZ0fS5TdGFydHNXaXRoKHtyaWdodH0pJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9wZXJhdG9yRW51bS5FbmRXaXRoOlxuICAgICAgICAgICAgcyA9ICd7bGVmdH0uRW5kc1dpdGgoe3JpZ2h0fSknO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzID0gJyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgcmVwcmVzZW50YXRpb24gZm9yIHRoZSBnaXZlbiB2YWx1ZSB3aXRoIHRoZSBnaXZlbiB0eXBlLiBcbiAqIFRoZSBnaXZlbiB2YWx1ZSBpcyBhIGtub3duIHZhbHVlLCBhbmQgaXQgY2FuIGJlIG9mIG9uZSBvZiBtYW55IHR5cGVzLiBcbiAqIFR5cGljYWxseSwgdGhlIHZhbHVlIGlzIGRpcmVjdGx5IG9idGFpbmVkIGZyb20gdGhlIHVzZXIgaW5wdXQgaW4gRm9ybS4gXG4gKlxuICogT3VyIGdvYWwgaXMgcHJvZHVjdCBhIHZhbGlkIEMjIGV4cHJlc3Npb24gZm9yIHRoZSBnaXZlbiB2YWx1ZSwgd2hpbGUgcmVwc2VjdGluZyBcbiAqIHRoZSB0eXBlIGluZm9ybWF0aW9uIG9mIHRoZSB2YWx1ZS4gXG4gKiBcbiAqIFRoZSByZXByZXNlbnRhdGlvbiBpcyBhIHZhbGlkIEMjIGV4cHJlc3Npb24uIFxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gdmFsdWVUeXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlU2FmZVZhbHVlUmVwKHZhbHVlOiBhbnksIHZhbHVlVHlwZTogSVR5cGVEZWYpIHtcbiAgICBpZiAodmFsdWVUeXBlID09IHR5Qm9vbCkge1xuICAgICAgICB2YWx1ZSA9IHNhZmVQYXJzZUJvb2wodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlID09IHR5TnVtYmVyKSB7XG4gICAgICAgIHZhbHVlID0gc2FmZVBhcnNlRmxvYXQodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlID09IHR5RGF0ZSkge1xuICAgICAgICB2YWx1ZSA9IHNhZmVQYXJzZVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gJ1wiJyArIHZhbHVlICsgJ1wiJztcbiAgICAgICAgdmFsdWUgPSBgRGF0ZVRpbWUuUGFyc2UoJHt2YWx1ZX0pYDtcbiAgICB9IGVsc2UgeyAvLyBzdHJpbmcgXG4gICAgICAgIHZhbHVlID0gc2FmZVBhcnNlU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgdmFsdWUgPSAnXCInICsgdmFsdWUgKyAnXCInO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQnVpbGQgdGhlIHJpZ2h0IHR5cGUgY29udmVydG9yIChpbiBDIykgZm9yIHRoZSBnaXZlbiB2YXJpYWJsZSAoYSBzdHJpbmcpIFxuICogd2l0aCB0aGUgZ2l2ZW4gdHlwZSBpbmZvcm1hdGlvbi4gXG4gKiBcbiAqIFdoYXQgaXMgZGlmZmVyZW50IGZyb20gdGhlIGFib3ZlIGlzIHRoYXQgdGhlIGFib3ZlIGdlbmVyYXRlcyBhIHZhbGlkIGxpdGVyYWwgZnJvbSBcbiAqIGEgZ2l2ZW4ga25vd24gdmFsdWUuIFxuICogXG4gKiBJbiBjb250cmFzdCwgdGhlIGdpdmVuIHZhbHVlIGluIHRoaXMgbWV0aG9kIGlzIGEgdmFyaWFibGUgKGEgc3RyaW5nKSwgd2UgaGF2ZSB0byBnZW5lcmF0ZSBcbiAqIGEgcmlnaHQgdHlwZSBjYXN0IGZvciB0aGUgZ2l2ZW4gc3RyaW5nIHRvIHByb2R1Y2UgYSB0eXBlIHNhZmUgdmFsdWUgYXQgcnVuIHRpbWUuIFxuICogVGhlcmVmb3JlLCBcbiAqICAgLSB3ZSBkbyBub3QgcXVvdGUgdGhlIGdpdmVuIHZhbHVlLiBcbiAqIEBwYXJhbSB2YXJOYW1lXG4gKiBAcGFyYW0gdmFyVHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRUeXBlQ29udmVydG9yKHZhck5hbWU6IHN0cmluZywgdmFyVHlwZTogSVR5cGVEZWYpIHtcbiAgICBpZiAodmFyVHlwZSA9PSB0eUJvb2wpIHtcbiAgICAgICAgdmFyTmFtZSA9IGBib29sLlBhcnNlKCR7dmFyTmFtZX0pYDtcbiAgICB9IGVsc2UgaWYgKHZhclR5cGUgPT0gdHlOdW1iZXIpIHtcbiAgICAgICAgdmFyTmFtZSA9IGBkb3VibGUuUGFyc2UoJHt2YXJOYW1lfSlgO1xuICAgIH0gZWxzZSBpZiAodmFyVHlwZSA9PSB0eURhdGUpIHtcbiAgICAgICAgdmFyTmFtZSA9IGBEYXRlVGltZS5QYXJzZSgke3Zhck5hbWV9KWA7XG4gICAgfVxuICAgIHJldHVybiB2YXJOYW1lO1xufVxuIl19