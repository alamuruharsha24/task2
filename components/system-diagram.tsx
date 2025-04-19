export default function SystemDiagram() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
        Firebase Authentication Flow
      </h2>

      <div className="overflow-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-4 gap-4">
            <div className="border-2 border-indigo-500/30 p-4 rounded-lg bg-slate-800/50">
              <h3 className="font-bold mb-2 text-indigo-300">User</h3>
              <div className="space-y-2">
                <div className="bg-indigo-900/50 p-2 rounded border border-indigo-500/30">Login/Signup Form</div>
                <div className="bg-indigo-900/50 p-2 rounded border border-indigo-500/30">User Credentials</div>
                <div className="bg-indigo-900/50 p-2 rounded border border-indigo-500/30">Google Auth</div>
              </div>
            </div>

            <div className="border-2 border-purple-500/30 p-4 rounded-lg bg-slate-800/50">
              <h3 className="font-bold mb-2 text-purple-300">Auth UI</h3>
              <div className="space-y-2">
                <div className="bg-purple-900/50 p-2 rounded border border-purple-500/30">Form Validation</div>
                <div className="bg-purple-900/50 p-2 rounded border border-purple-500/30">Error Handling</div>
                <div className="bg-purple-900/50 p-2 rounded border border-purple-500/30">Auth State Context</div>
              </div>
            </div>

            <div className="border-2 border-blue-500/30 p-4 rounded-lg bg-slate-800/50">
              <h3 className="font-bold mb-2 text-blue-300">Firebase API</h3>
              <div className="space-y-2">
                <div className="bg-blue-900/50 p-2 rounded border border-blue-500/30">Authentication</div>
                <div className="bg-blue-900/50 p-2 rounded border border-blue-500/30">Token Generation</div>
                <div className="bg-blue-900/50 p-2 rounded border border-blue-500/30">Session Management</div>
              </div>
            </div>

            <div className="border-2 border-pink-500/30 p-4 rounded-lg bg-slate-800/50">
              <h3 className="font-bold mb-2 text-pink-300">Protected Routes</h3>
              <div className="space-y-2">
                <div className="bg-pink-900/50 p-2 rounded border border-pink-500/30">Auth Wrapper</div>
                <div className="bg-pink-900/50 p-2 rounded border border-pink-500/30">Dashboard</div>
                <div className="bg-pink-900/50 p-2 rounded border border-pink-500/30">Redirect Logic</div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold mb-4 text-indigo-300">Authentication Flow</h3>
            <ol className="list-decimal pl-5 space-y-4">
              <li className="p-2 bg-slate-800/70 rounded border border-indigo-500/20">
                <strong className="text-indigo-300">User Authentication:</strong> User enters credentials on
                Login/Signup page or uses Google authentication
              </li>
              <li className="p-2 bg-slate-800/70 rounded border border-purple-500/20">
                <strong className="text-purple-300">Auth UI Processing:</strong> Form validation occurs, errors are
                handled, and credentials are sent to Firebase
              </li>
              <li className="p-2 bg-slate-800/70 rounded border border-blue-500/20">
                <strong className="text-blue-300">Firebase Authentication:</strong> Firebase validates credentials and
                returns auth token or error
              </li>
              <li className="p-2 bg-slate-800/70 rounded border border-blue-500/20">
                <strong className="text-blue-300">Token Storage:</strong> Auth token is stored in browser and used for
                subsequent requests
              </li>
              <li className="p-2 bg-slate-800/70 rounded border border-blue-500/20">
                <strong className="text-blue-300">Session Persistence:</strong> Auth context monitors auth state with
                onAuthStateChanged
              </li>
              <li className="p-2 bg-slate-800/70 rounded border border-pink-500/20">
                <strong className="text-pink-300">Route Protection:</strong> Protected routes check auth state before
                rendering
              </li>
              <li className="p-2 bg-slate-800/70 rounded border border-pink-500/20">
                <strong className="text-pink-300">Access Control:</strong> Unauthenticated users redirected to login
                page
              </li>
              <li className="p-2 bg-slate-800/70 rounded border border-pink-500/20">
                <strong className="text-pink-300">Logout Process:</strong> On logout, token is invalidated and user is
                redirected
              </li>
            </ol>
          </div>

          <div className="mt-8">
            <h3 className="font-bold mb-4 text-indigo-300">Token Validation Flow</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <div className="w-32 p-2 bg-indigo-900/50 rounded border border-indigo-500/30 text-indigo-300">
                  Client
                </div>
                <div className="w-8 text-center">→</div>
                <div className="flex-1 p-2 bg-slate-800/70 rounded border border-slate-600/50">
                  Sends request with Firebase ID token in Authorization header
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-32 p-2 bg-blue-900/50 rounded border border-blue-500/30 text-blue-300">
                  Firebase Auth
                </div>
                <div className="w-8 text-center">→</div>
                <div className="flex-1 p-2 bg-slate-800/70 rounded border border-slate-600/50">
                  Verifies token signature, expiration, and claims
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-32 p-2 bg-purple-900/50 rounded border border-purple-500/30 text-purple-300">
                  Server
                </div>
                <div className="w-8 text-center">→</div>
                <div className="flex-1 p-2 bg-slate-800/70 rounded border border-slate-600/50">
                  Processes request if token is valid
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-32 p-2 bg-pink-900/50 rounded border border-pink-500/30 text-pink-300">
                  Error Handler
                </div>
                <div className="w-8 text-center">→</div>
                <div className="flex-1 p-2 bg-slate-800/70 rounded border border-slate-600/50">
                  Returns 401/403 error if token is invalid or expired
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
