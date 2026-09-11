import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSession, signUp, invalidateSessionCache } from '../lib/api.js'

export default function Signup() {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (session) {
    navigate('/apply', { replace: true })
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const { error: authError } = await signUp.email(
        { email, password, name },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => {
            setLoading(false)
            invalidateSessionCache()
            navigate('/apply')
          },
          onError: (ctx) => {
            setLoading(false)
            setError(ctx.error.message || 'Failed to create account')
          },
        }
      )

      if (authError) {
        setError(authError.message || 'Failed to create account')
        setLoading(false)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-2">
            Create Account
          </h1>
          <p className="font-body-md text-body-md text-secondary">
            Join us and explore opportunities across the GCC
          </p>
        </div>

        <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-body-sm text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-lg">person</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-lg">mail</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-lg">lock</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Min 8 characters"
                />
              </div>
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-lg">lock</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-label-md py-3 rounded-lg hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  Create Account
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 font-body-sm text-body-sm text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:text-emerald-500 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
