import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuthStore from '../store/authStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuthStore();
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setError('');
      await registerUser(data);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="card p-8">
        <Link to="/" className="text-2xl font-display font-bold text-text-primary mb-8 block text-center hover:opacity-80 transition-opacity">
          TECHINS
        </Link>
        
        <h1 className="text-3xl font-display text-center mb-2">Create Account</h1>
        <p className="text-text-secondary text-center mb-8">Join the hardware community</p>

        {error && (
          <div className="bg-accent-error/10 border border-accent-error/20 text-accent-error px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
            <input
              type="text"
              className="input"
              placeholder="John Doe"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              })}
            />
            {errors.name && (
              <p className="text-accent-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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
              placeholder="At least 6 characters"
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

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Confirm Password</label>
            <input
              type="password"
              className="input"
              placeholder="Confirm your password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && (
              <p className="text-accent-error text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-pill-accent justify-center"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-primary hover:text-accent-primary-light font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
