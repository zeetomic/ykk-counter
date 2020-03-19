export const validation = { 
  data() {
    return {
      valid: true,
      approval_codeRule: [
        () => !!this.approval_code || 'Approval Code is Required'
      ],
      receipt_noRule: [
        () => !!this.receipt_no || 'Receipt NO is Required'
      ],
      amountRule: [
        () => !!this.amount || 'Amount is Required'
      ]
    }
  }
}
