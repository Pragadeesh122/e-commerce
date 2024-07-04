export function validateFormData(
  name: string,
  email: string,
  password: string
) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Z\s'-]{1,20}$/;

  if (!nameRegex.test(name)) {
    return "Name must be 1-20 characters, and can only include letters, spaces, hyphens, and apostrophes";
  }

  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }

  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character";
  }

  return "passed";
}
