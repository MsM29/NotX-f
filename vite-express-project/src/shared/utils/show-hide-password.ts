export function showPassword(
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) {
  if (event.target instanceof HTMLDivElement) {
    event.target.classList.add("bg-[url('../images/close-eye.png')]");
    event.target.classList.remove("bg-[url('../images/open-eye.png')]");
    if (event.target.previousSibling instanceof HTMLInputElement) {
      event.target.previousSibling.type = "text";
    }
  }
}

export function hidePassword(
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) {
  if (event.target instanceof HTMLDivElement) {
    event.target.classList.add("bg-[url('../images/open-eye.png')]");
    event.target.classList.remove("bg-[url('../images/close-eye.png')]");
    if (event.target.previousSibling instanceof HTMLInputElement) {
      event.target.previousSibling.type = "password";
    }
  }
}
