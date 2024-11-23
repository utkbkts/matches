export function getErrorMessage(error: unknown): string | null {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as any).data;
    if (typeof data.message === "string") {
      return data.message;
    }
  }

  return null;
}
