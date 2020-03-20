export const validateLoginPhone = { 
  data() {
    return {
      valid: true,
      phoneRule: [
        () => !!this.phone || 'Phone Number is Required'
      ],
      passwordRule: [
        () => !!this.password || 'Password is Required'
      ],
    }
  }
}
