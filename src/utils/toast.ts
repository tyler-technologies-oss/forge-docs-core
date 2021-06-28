export function showToast(message: string) {
  const toast = document.createElement('tcw-toast');
  toast.message = message;
  document.body.appendChild(toast);
}
