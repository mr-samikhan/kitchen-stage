const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const TEXT_PATTERN = /^(.*)$/

const ALPHA_PATTER = /^[A-Za-z0-9]*$/

const VALIDATION_PATTERNS = {
  TEXT: TEXT_PATTERN,
  EMAIL: EMAIL_PATTERN,
  PASSWORD: PASSWORD_PATTERN,
  ALPHA_NUMERIC: ALPHA_PATTER,
}

export default VALIDATION_PATTERNS
