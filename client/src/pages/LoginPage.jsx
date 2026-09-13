import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setError('');
      await login(data);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="card p-8">
        <Link to="/" className="text-2xl font-display font-bold text-text-primary mb-8 block text-center hover:opacity-80 transition-opacity">
          TECHINS
        </Link>
        
        <h1 className="text-3xl font-display text-center mb-2">Welcome Back</h1>
        <p className="text-text-secondary text-center mb-8">Sign in to continue building</p>

        {error && (
          <div className="bg-accent-error/10 border border-accent-error/20 text-accent-error px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
            <input
              type="email"
              className="input"
              placeholder="your.email@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <p className="text-accent-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password && (
              <p className="text-accent-error text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-accent-primary hover:text-accent-primary-light">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-pill-accent justify-center"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent-primary hover:text-accent-primary-light font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
