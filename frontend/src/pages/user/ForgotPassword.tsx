import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../http'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' })
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const update = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async (e: FormEvent) => {
    e.preventDefault(); setBusy(true); setMessage('')
    try {
      if (step === 1) { await API.post('/auth/forgot-password', { email: form.email }); setStep(2); setMessage('We sent a verification code to your email.') }
      else if (step === 2) { await API.post('/auth/verify-otp', { email: form.email, otp: form.otp }); setStep(3) }
      else { await API.post('/auth/reset-password', form); setMessage('Password updated. You can sign in now.'); setTimeout(() => navigate('/login'), 900) }
    } catch (error: any) { setMessage(error.response?.data?.message || 'Something went wrong. Please try again.') }
    finally { setBusy(false) }
  }
  return <main className="auth-shell"><form className="auth-card" onSubmit={submit}>
    <div className="eyebrow">SastoPasal · Account security</div><h1>{step === 1 ? 'Reset your password' : step === 2 ? 'Check your email' : 'Choose a new password'}</h1>
    <p className="auth-muted">{step === 1 ? 'Enter your account email and we’ll send a one-time code.' : step === 2 ? 'Enter the six digit code we sent you.' : 'Use a strong password you have not used elsewhere.'}</p>
    {step === 1 && <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={update} required />}
    {step === 2 && <input name="otp" inputMode="numeric" placeholder="One-time code" value={form.otp} onChange={update} required />}
    {step === 3 && <><input name="newPassword" type="password" placeholder="New password" value={form.newPassword} onChange={update} required minLength={8} /><input name="confirmPassword" type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={update} required minLength={8} /></>}
    {message && <div className="auth-message">{message}</div>}<button className="primary-button" disabled={busy}>{busy ? 'Please wait…' : step === 3 ? 'Update password' : 'Continue'}</button>
    <Link to="/login" className="auth-link">Back to sign in</Link>
  </form></main>
}
