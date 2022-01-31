import { getUnixTime, formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import { es } from 'date-fns/locale';

export function getElapsedTime(date: number): string {
    const dateFormat = fromUnixTime(date);
    const result = formatDistanceToNowStrict(
        dateFormat,
        {locale: es}
      );
      if (result.includes("segundo")) {
          return "Justo ahora";
      } 

    return `Hace ${result}`;
}

export function getCurrentDateInNumber(): number {
    return getUnixTime(new Date());
}