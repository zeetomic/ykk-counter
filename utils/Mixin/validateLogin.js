export const validateLogin = { 
  data() {
    return {
      valid: true,
      emailRule: [
        () => !!this.email || 'Email is Required'
      ],
      passwordRule: [
        () => !!this.password || 'Password is Required'
      ],
    }
  }
}
