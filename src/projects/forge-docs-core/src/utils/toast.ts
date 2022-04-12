export function showToast(message: string, duration?: number): void {
  const toast = document.createElement('forge-toast');
  toast.message = message;
  if (duration !== undefined) {
    toast.duration = duration;
  }
  document.body.appendChild(toast);
}
