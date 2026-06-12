import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { useIsDark } from '@/hooks/useIsDark';

export default function LoginPage() {
  const isDark = useIsDark();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (isDark) return <LoginDark form={form} setForm={setForm} onSubmit={handleSubmit} loading={loading} />;
  return <LoginLight form={form} setForm={setForm} onSubmit={handleSubmit} loading={loading} />;
}

function LoginDark({ form, setForm, onSubmit, loading }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface diagonal-bg flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/10 flex justify-between items-center px-grid-margin py-md">
        <Link to="/" className="font-display-xl text-headline-md text-secondary uppercase tracking-tighter">PASSWALE</Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-grid-margin pt-28 pb-xl">
        <div className="w-full max-w-[448px]">
          {/* Glass Card */}
          <div className="bg-surface-container/80 backdrop-blur-xl border border-white/10 rounded-2xl p-xl shadow-2xl">
            <div className="text-center mb-xl">
              <h1 className="font-display-xl text-headline-lg text-secondary uppercase mb-xs">WELCOME BACK</h1>
              <p className="font-body-md text-on-surface-variant">Enter your credentials to access your passes</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-md">
              <div>
                <label className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-widest mb-xs block">Email</label>
                <div className="neomorphic-well rounded-xl flex items-center px-md gap-md border border-white/5">
                  <span className="material-symbols-outlined text-outline text-sm">mail</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({...p, email:e.target.value}))}
                    className="bg-transparent border-none outline-none text-on-surface w-full py-md font-body-md placeholder:text-outline-variant"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-widest mb-xs block">Password</label>
                <div className="neomorphic-well rounded-xl flex items-center px-md gap-md border border-white/5">
                  <span className="material-symbols-outlined text-outline text-sm">lock</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => setForm(p => ({...p, password:e.target.value}))}
                    className="bg-transparent border-none outline-none text-on-surface w-full py-md font-body-md placeholder:text-outline-variant"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="text-right">
                <Link to="/forgot-password" className="font-label-mono text-[10px] text-secondary uppercase underline">Forgot Password?</Link>
              </div>

              <button type="submit" disabled={loading}
                className="w-full clay-button bg-secondary text-on-secondary py-md font-cta text-cta uppercase rounded-xl disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'GET ACCESS'}
              </button>

              <p className="text-center font-body-md text-on-surface-variant text-sm">
                No account? <Link to="/signup" className="text-secondary font-bold">JOIN THE SCENE</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginLight({ form, setForm, onSubmit, loading }) {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background border-b-4 border-primary px-margin-mobile py-4 flex items-center justify-between">
        <Link to="/" className="font-display-lg text-headline-md uppercase text-primary font-black">PASSWALE</Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-margin-mobile py-12">
        <div className="w-full max-w-[448px]">
          <div className="bg-white border-2 border-primary neo-shadow p-8">
            <div className="mb-8">
              <h1 className="font-display-lg text-display-lg text-primary uppercase leading-none mb-2">SIGN IN</h1>
              <div className="w-16 h-2 bg-secondary-container border-2 border-primary neo-shadow-sm" />
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="font-label-bold text-sm uppercase tracking-widest text-on-primary-container block mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({...p, email:e.target.value}))}
                  className="w-full border-2 border-primary bg-surface-container-low px-4 py-3 font-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container placeholder:text-on-primary-container/50"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="font-label-bold text-sm uppercase tracking-widest text-on-primary-container block mb-2">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm(p => ({...p, password:e.target.value}))}
                  className="w-full border-2 border-primary bg-surface-container-low px-4 py-3 font-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container placeholder:text-on-primary-container/50"
                  placeholder="••••••••"
                  required
                />
                <div className="text-right mt-2">
                  <Link to="/forgot-password" className="font-label-bold text-sm text-secondary uppercase underline decoration-2">Forgot Password?</Link>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-primary text-white border-2 border-primary py-4 font-display-lg text-headline-md uppercase neo-shadow neo-button-press disabled:opacity-50"
              >
                {loading ? 'SIGNING IN...' : 'GET ACCESS →'}
              </button>

              <p className="text-center font-label-bold text-sm text-on-primary-container">
                No account? <Link to="/signup" className="text-primary font-black underline decoration-2">JOIN THE SCENE</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
