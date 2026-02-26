'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (!email || !password) {
        setError('Please fill in all fields')
        return
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email')
        return
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }

      // On success, redirect to dashboard
      console.log('Login successful:', { email, password })
      // In a real app, you would redirect here
      // router.push('/dashboard')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold">🍕</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">FoodHub</h1>
              <p className="text-orange-100 text-sm">Admin Dashboard</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div>
            <h2 className="text-5xl font-bold text-white mb-4">Welcome Back</h2>
            <p className="text-orange-100 text-lg leading-relaxed">Manage your food delivery business with powerful tools and real-time insights</p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-white text-opacity-80 text-sm">© 2024 FoodHub Admin. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">🍕</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white text-center">Admin Portal</h1>
              <p className="text-orange-100 text-center text-sm mt-2">Food Delivery Management</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-50 rounded-lg px-4 py-3">
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@fooddelivery.com"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-gray-300 text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400 transition duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-zinc-800 border border-zinc-700 rounded accent-orange-500 cursor-pointer"
                  />
                  <span className="text-gray-400 group-hover:text-gray-300 transition duration-200">Remember me</span>
                </label>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium transition duration-200">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-200 transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="px-8 py-4 bg-black bg-opacity-50 border-t border-zinc-800">
              <p className="text-gray-400 text-xs text-center">
                © 2024 Food Delivery Admin. All rights reserved. | v1.0.0
              </p>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              🔒 Your login is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
