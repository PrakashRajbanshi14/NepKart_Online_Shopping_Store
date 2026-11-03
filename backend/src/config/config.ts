import { config } from "dotenv"
config()

export const envConfig = {
    connectionString: process.env.DB_URI,
    port: process.env.PORT,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    companyEmail: process.env.COMPANY_EMAIL,
    companyEmailPass : process.env.COMPANY_EMAIL_PASS,
    adminUsername: process.env.ADMIN_USERNAME,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPass : process.env.ADMIN_PASS
    ,khaltiApiBaseUrl: process.env.KHALTI_API_BASE_URL || 'https://dev.khalti.com/api/v2'
    ,khaltiSecretKey: process.env.KHALTI_SECRET_KEY
    ,clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
}
