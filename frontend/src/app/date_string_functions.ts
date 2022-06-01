export function date_to_yyyymmddString(date: Date): string {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
  
    return [date.getFullYear() + "-",
            (mm>9 ? '' : '0') + mm + "-",
            (dd>9 ? '' : '0') + dd
           ].join('');
}
  
export function yyyymmddString_to_date(string: string): Date {
    const splitedString: Array<any> = string.split('-');
    const yyyy = parseInt(splitedString[0]);
    const mm = parseInt(splitedString[1]) - 1; // -1 since zero-based
    const dd = parseInt(splitedString[2]);
    return new Date(yyyy, mm, dd);
}