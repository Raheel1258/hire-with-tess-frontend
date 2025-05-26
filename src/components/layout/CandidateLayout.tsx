// import React from 'react';
// import Link from 'next/link';

// export default function CandidateLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="bg-tess-blue text-white">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link href="/">
//             <h1 className="text-xl font-semibold">HireWithTess</h1>
//           </Link>
//           <nav className="flex gap-4 items-center">
//             <Link href="/" className="hover:text-blue-200">
//               Dashboard
//             </Link>
//             <Link href="/" className="hover:text-blue-200">
//               Find Jobs
//             </Link>
//             <Link href="/" className="hover:text-blue-200">
//               My Applications
//             </Link>
//             <Link href="/" className="hover:text-blue-200">
//               Profile
//             </Link>
//             <div className="relative ml-4">
//               <button className="flex items-center gap-2">
//                 <span>Candidate Name</span>
//                 {/* You can add a profile icon here */}
//               </button>
//               {/* Dropdown menu would go here */}
//             </div>
//           </nav>
//         </div>
//       </header>
//       <main className="flex-grow">
//         <div className="container mx-auto px-4 py-6">{children}</div>
//       </main>
//       <footer className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto px-4">
//           <p className="text-center">
//             © {new Date().getFullYear()} HireWithTess. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }
