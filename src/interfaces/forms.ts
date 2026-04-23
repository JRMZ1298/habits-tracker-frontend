export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string; // Solo en el front, no se manda al backend
}

export interface CreateHabitForm {
  name: string;
  frequency: string;
  goal: string;
  category: string;
  reminders: string[];
}
