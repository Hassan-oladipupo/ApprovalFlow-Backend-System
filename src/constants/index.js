module.exports = {
  customServerResponse: {
    status: 400,
    message: '',
    body: {}
  },
  
  userMessage: {
    SIGNUP_SUCCESS: 'Signup Success',
    LOGIN_SUCCESS: 'Login Success',
    DUPLICATE_EMAIL: 'User already exist with given email',
    USER_NOT_FOUND: 'User not found',
    INVALID_PASSWORD: 'Incorrect Password',
    INVALID_EMAIL: 'Invalid email format',
    WEAK_PASSWORD: 'Weak password. Password must contain at least 8 characters including uppercase, lowercase and digit',
    RESET_PASSWORD: 'Reset password link sent successfully',
    RESET_NEW_PASSWORD: 'Password reset successfully confirmed.',
    MATCH_PASSWORD: 'New password and confirm password must match.',
    INVALID_TOKEN: 'Invalid confirmation token.',
    EMAIL_ALREADY_CONFIRMED: 'Email address has already been confirmed.',
    CONFIRM_TOKEN_SUCCESS: 'Email confirmed successfully'
  },
  approvalRequestMessage: {
    APPROVAL_CREATED: 'approval sent successfully',
    APPROVAL_UPDATED: 'approval updated successfully',
    APPROVAL_NOT_FOUND: 'approval not found',
    APPROVAL_RETRIEVED: 'Approvals retrieved successfully',
    UNAUTHORIZED_APPROVER: "You are not authorized to this",
    USER_APPROVAL_EMPTY: 'No approval found for this user',
    INVALID_STATUS: 'Invalid status.',
    APPROVAL_UPDATED: (status) => `Request ${status} successfully`,
    APPROVER_NOT_FOUND: "Some approver emails not found",
    CC_EMAIL_NOT_FOUND:  'Some cc emails are not found',
    APPROVAL_REMOVED: 'Approval removed successfully'

  },
  requestValidationMessage: {
    BAD_REQUEST: 'Invalid fields',
    TOKEN_MISSING: 'Token missing from header',
    FORBIDDEN: 'Access denied. Admins only.',
  },
  databaseMessage: {
    INVALID_ID: 'Invalid Id'
  }
}
