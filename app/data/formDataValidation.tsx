export function validateFormData(
  password?: string,
  name?: string,
  email?: string
) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Z\s'-]{6,20}$/;

  if (name) {
    if (!nameRegex.test(name)) {
      return "Name must be 6-20 characters, and can only include letters, spaces, hyphens, and apostrophes";
    }
  }

  if (email) {
    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }
  }

  if (password) {
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character";
    }
  }

  return "passed";
}
