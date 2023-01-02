function throwError(error: Error): void {
  console.error(error);
  alert(error?.message);
}

export default throwError;
