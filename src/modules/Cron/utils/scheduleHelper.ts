export function getSchedule(defaultSchedule: string): string {
  return process.env.MODE === 'TEST' ? '* * * * *' : defaultSchedule;
}
