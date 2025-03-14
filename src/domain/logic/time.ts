export function getGreetingMessage(date: Date): string {
  const hours = date.getHours()

  switch (true) {
    case hours >= 5 && hours < 12:
      return 'Good Morning'
    case hours >= 12 && hours < 18:
      return 'Good Afternoon'
    case hours >= 18 && hours < 22:
      return 'Good Evening'
    default:
      return 'Good Night'
  }
}
