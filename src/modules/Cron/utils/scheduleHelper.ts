export function getSchedule(defaultSchedule: string): string {
  return process.env.APP_ENV === 'TEST' ? '* * * * *' : defaultSchedule;
}
