const LoginSection = () => (
  <section className="py-12 px-4 flex justify-center bg-gray-50">
    <form className="bg-white p-8 rounded shadow-md w-full max-w-sm flex flex-col gap-4">
      <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
      <input type="email" placeholder="Email" className="border rounded px-3 py-2" autoComplete="email" />
      <input type="password" placeholder="Password" className="border rounded px-3 py-2" autoComplete="current-password" />
      <button type="button" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
        Login
      </button>
      <button type="button" className="border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition-colors">
        Create Account
      </button>
    </form>
  </section>
);

export default LoginSection;
