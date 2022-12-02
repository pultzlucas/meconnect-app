export default function passwordIsInvalid(pass) {
    // More than 6 characters
    if(pass.length < 6) return 'A senha deve ter mais de 5 caracteres'

    // Must have upper letters
    if(!/[A-Z]/.test(pass)) return 'A senha deve possuir pelo menos uma letra maiúscula'

    
    // Must have lower letters
    if(!/[a-z]/.test(pass)) return 'A senha deve possuir pelo menos uma letra minúscula'
    
    console.log(pass)
    // Must have some digit
    if(!/[0-9]/.test(pass)) return 'A senha deve possuir pelo menos um dígito'
    
    return false
}