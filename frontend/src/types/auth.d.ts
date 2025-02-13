interface SignupState {
  currentStep: number;
  formData: {
    email: string;
    password: string;
    profileImage?: File;
    githubId?: string;
    jobCategory?: string;
  };
}
