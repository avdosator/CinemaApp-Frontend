export type AuthResponse = {
    jwt: string,
    expiresIn: number,
    refreshToken: string
}